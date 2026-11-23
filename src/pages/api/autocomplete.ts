import { CitySuggestion, ServerlessRequestHandler } from 'typings';
import { autocompleteCities } from 'services/here';

const CACHE_TIME_IN_SECONDS = 7884000; // 3 months

export interface RequestQuery {
  query?: string;
}

export interface ResponseData {
  suggestions: CitySuggestion[];
}

const autoCompleteHandler: ServerlessRequestHandler = async (
  request,
  response,
) => {
  const { query: queryString }: RequestQuery = request.query;

  if (!queryString) {
    response.statusMessage = 'Bad request: No query string specified.';
    return response.status(500).json({ suggestions: null });
  }

  const suggestions = await autocompleteCities(queryString);
  const responseData: ResponseData = { suggestions };

  response.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${CACHE_TIME_IN_SECONDS}, stale-while-revalidate`,
  );

  return response.status(200).json(responseData);
};

export default autoCompleteHandler;
