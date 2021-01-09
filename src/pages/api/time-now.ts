import { APIRequestHandler } from 'typings';

const timeNowHandler: APIRequestHandler = async (_, response) => {
  const currentISOTimeString = new Date().toISOString();

  return response.status(200).json({ time: currentISOTimeString });
};

export default timeNowHandler;
