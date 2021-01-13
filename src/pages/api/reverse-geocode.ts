import { ServerlessRequestHandler } from 'typings';
import { reverseGeocode } from 'services/here';

const CACHE_TIME_IN_SECONDS = 21024000; // 8 months

export interface RequestQuery {
  position?: string;
}

type ResponseData = Here.GeocodeResponse;

const reverseGeocodeHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const { position }: RequestQuery = request.query;

  if (!position) {
    response.statusMessage = 'Bad request: No position specified.';
    return response.status(500).json({ response: null });
  }

  const [latitude, longitude] = position
    .split(',')
    .map((coordinate) => +coordinate);

  const locationResponseData: ResponseData = await reverseGeocode({
    latitude,
    longitude,
  });

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(locationResponseData);
};

export default reverseGeocodeHandler;
