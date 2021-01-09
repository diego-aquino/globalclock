import { NowRequestQuery } from '@vercel/node';

import { APIRequestHandler } from 'typings';
import { reverseGeocode } from 'services/here';

interface RequestQuery extends NowRequestQuery {
  position: string;
}

const reverseGeocodeHandler: APIRequestHandler = async (request, response) => {
  const { position } = request.query as RequestQuery;
  const [latitude, longitude] = position
    .split(',')
    .map((coordinate) => +coordinate);

  const locationResponse = await reverseGeocode({ latitude, longitude });

  return response.status(200).json(locationResponse);
};

export default reverseGeocodeHandler;
