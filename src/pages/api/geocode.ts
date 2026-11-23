import { LocationDetails, ServerlessRequestHandler } from 'typings';
import { geocode, lookup } from 'services/here';

const CACHE_TIME_IN_SECONDS = 21024000; // 8 months

export interface RequestQuery {
  city?: string;
  state?: string;
  country?: string;
  locationid?: string;
}

type ResponseData = LocationDetails;

const geocodeHandler: ServerlessRequestHandler = async (request, response) => {
  const {
    city,
    state,
    country,
    locationid: locationId,
  }: RequestQuery = request.query;

  const locationResponseData: ResponseData = locationId
    ? await lookup(locationId)
    : await geocode({
        cityName: city,
        stateCode: state,
        countryCode: country,
      });

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(locationResponseData);
};

export default geocodeHandler;
