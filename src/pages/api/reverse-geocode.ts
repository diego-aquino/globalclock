import { NowRequestQuery } from '@vercel/node';

import { ServerlessRequestHandler } from 'typings';
import { reverseGeocode } from 'services/here';

const CACHE_TIME_IN_SECONDS = 15768000; // 6 months

interface RequestQuery extends NowRequestQuery {
  position: string;
}

type ResponseData = Here.GeocodeResponse;

const reverseGeocodeHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const { position } = request.query as RequestQuery;
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
