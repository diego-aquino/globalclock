import { ServerlessRequestHandler } from 'typings';
import unsplash from 'services/unsplash';
import { RequestQuery, ResponseData } from './_types';
import { getCacheControl } from './_cacheControl';

const randomPhotoHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const {
    query,
    collections,
    featured: featuredAsString,
    orientation,
    requestId,
  }: RequestQuery = request.query;
  const collectionIds = collections?.split(',');

  const unsplashResponse = (await unsplash.photos.getRandom({
    query,
    collectionIds,
    featured: featuredAsString === 'true',
    orientation,
  })) as Unsplash.ApiResponse<Unsplash.Photo>;

  if (unsplashResponse.type === 'error') {
    const { type, errors, status } = unsplashResponse;
    const responseData: ResponseData = { type, photo: null, errors };

    return response.status(status).json(responseData);
  }

  const {
    type,
    response: { urls, user, blur_hash: blurHash },
  } = unsplashResponse;

  const photo: Unsplash.PhotoWithAttribution = {
    urls: {
      ...urls,
      blurHash,
    },
    creator: {
      name: user.name,
      profileUrl: user.links.html,
    },
  };

  const responseData: ResponseData = { type, photo };

  response.setHeader('Cache-Control', getCacheControl(requestId));

  return response.status(200).json(responseData);
};

export default randomPhotoHandler;
