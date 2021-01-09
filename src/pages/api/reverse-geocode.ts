import { NowRequestQuery } from '@vercel/node';

import { APIRequestHandler } from 'typings';
import { reverseGeocode } from 'services/here';

interface RequestQuery extends NowRequestQuery {
  position: string;
}

type ResponseData = Here.ReverseGeocodeResponse;

const reverseGeocodeHandler: APIRequestHandler = async (request, response) => {
  const { position } = request.query as RequestQuery;
  const [latitude, longitude] = position
    .split(',')
    .map((coordinate) => +coordinate);

  const locationResponseData: ResponseData = await reverseGeocode({
    latitude,
    longitude,
  });

  return response.status(200).json(locationResponseData);
};

export default reverseGeocodeHandler;
