import { ServerlessRequestHandler } from 'typings';
import { geocode } from 'services/here';

const CACHE_TIME_IN_SECONDS = 15768000; // 6 months

export interface RequestQuery {
  city?: string;
  state?: string;
  country?: string;
  locationid?: string;
}

type ResponseData = Here.GeocodeResponse;

const geocodeHandler: ServerlessRequestHandler = async (request, response) => {
  const {
    city,
    state,
    country,
    locationid: locationId,
  }: RequestQuery = request.query;

  const locationResponseData: ResponseData = await geocode({
    cityName: city,
    stateCode: state,
    countryCode: country,
    locationId,
  });

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(locationResponseData);
};

export default geocodeHandler;
