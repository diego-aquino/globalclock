import { NowRequest } from '@vercel/node';

import { Address, ServerlessRequestHandler, Merge } from 'typings';
import { geocode } from 'services/here';

const CACHE_TIME_IN_SECONDS = 15768000; // 6 months

type Request = Merge<
  NowRequest,
  {
    query: Partial<Address>;
  }
>;

type ResponseData = Here.GeocodeResponse;

const geocodeHandler: ServerlessRequestHandler = async (request, response) => {
  const {
    city,
    state,
    stateName,
    country,
    countryName,
  } = (request as Request).query;

  const locationResponseData: ResponseData = await geocode({
    city,
    state: state || stateName,
    country: country || countryName,
  });

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(locationResponseData);
};

export default geocodeHandler;
