import { OnlyOne, ServerlessRequestHandler } from 'typings';
import unsplash from 'services/unsplash';

export type RequestQuery = Partial<
  OnlyOne<{
    query?: string;
    collections?: string;
  }>
> & {
  featured?: string;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  requestId?: string;
};

interface SuccessResponseData {
  type: 'success';
  photo: Unsplash.PhotoWithAttribution;
  errors?: undefined;
}

export interface ErrorResponseData {
  type: 'error';
  photo: null;
  errors: Unsplash.Errors;
}

export type ResponseData = SuccessResponseData | ErrorResponseData;

const randomPhotoHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const {
    query,
    collections,
    featured: featuredAsString,
    orientation,
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
    response: { urls, user },
  } = unsplashResponse;

  const photo: Unsplash.PhotoWithAttribution = {
    urls,
    creator: {
      name: user.name,
      profileUrl: user.links.html,
    },
  };

  const responseData: ResponseData = { type, photo };

  return response.status(200).json(responseData);
};

export default randomPhotoHandler;
