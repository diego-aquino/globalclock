import { ServerlessRequestHandler } from 'typings';

export interface ResponseData {
  time: string;
}

const timeNowHandler: ServerlessRequestHandler = async (_, response) => {
  const currentISOTimeString = new Date().toISOString();
  const responseData: ResponseData = { time: currentISOTimeString };

  return response.status(200).json(responseData);
};

export default timeNowHandler;
