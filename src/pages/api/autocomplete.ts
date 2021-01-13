import { ServerlessRequestHandler } from 'typings';
import { autocomplete } from 'services/here';

const CACHE_TIME_IN_SECONDS = 7884000; // 3 months

export interface RequestQuery {
  query?: string;
}

type ResponseData = Here.AutocompleteResponse;

const autoCompleteHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const { query: queryString }: RequestQuery = request.query;

  if (!queryString) {
    response.statusMessage = 'Bad request: No query string specified.';
    return response.status(500).json({ suggestions: null });
  }

  const autocompleteResponseData: ResponseData = await autocomplete(
    queryString,
    { resultType: 'city' },
  );

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(autocompleteResponseData);
};

export default autoCompleteHandler;
