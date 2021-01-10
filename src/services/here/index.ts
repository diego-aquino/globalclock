import axios from 'axios';

import { Address, Position, QueryObject } from 'typings';
import { encodeQueryObject } from 'utils/general';

export const hereEndpoints = {
  geocode: 'https://geocoder.ls.hereapi.com/6.2/geocode.json',
  reverseGeocode:
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json',
  autocomplete: 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json',
} as const;

const defaultQueryParams = {
  language: 'en-US',
  gen: '9',
  jsonattributes: '1',
  apiKey: process.env.HERE_API_KEY,
};

type HereEndpointName = keyof typeof hereEndpoints;
type HereEndpointURL = typeof hereEndpoints[HereEndpointName];

export function generateHereRequestURL(
  endpointURL: HereEndpointURL,
  query: QueryObject,
): string {
  const completeQuery = Object.assign(query, defaultQueryParams);
  const encodedCompleteQuery = encodeQueryObject(completeQuery);

  const requestURL = `${endpointURL}?${encodedCompleteQuery}`;

  return requestURL;
}

type GeocodeQuery = Partial<Address> & {
  searchtext?: string;
};

export async function geocode(
  query: GeocodeQuery,
): Promise<Here.GeocodeResponse> {
  const queryObject = {
    searchtext: query.searchtext,
    city: query.cityName,
    state: query.stateCode || query.stateName,
    country: query.countryCode || query.countryName,
  };

  const requestURL = generateHereRequestURL(hereEndpoints.geocode, {
    ...queryObject,
    locationattributes: 'adminInfo,timeZone',
  });

  const { data: locationResponse } = await axios.get<Here.GeocodeResponse>(
    requestURL,
  );

  return locationResponse;
}

export async function reverseGeocode(
  position: Position,
): Promise<Here.GeocodeResponse> {
  const requestURL = generateHereRequestURL(hereEndpoints.reverseGeocode, {
    prox: `${position.latitude},${position.longitude}`,
    mode: 'retrieveAddresses',
    maxresults: '1',
    locationattributes: 'adminInfo,timeZone',
  });

  const { data: locationResponse } = await axios.get<Here.GeocodeResponse>(
    requestURL,
  );

  return locationResponse;
}

interface AutocompleteOptions {
  resultType?: 'areas' | 'postalCode' | 'city';
}

export async function autocomplete(
  queryString: string,
  options?: AutocompleteOptions,
): Promise<Here.AutocompleteResponse> {
  const requestURL = generateHereRequestURL(hereEndpoints.autocomplete, {
    query: queryString,
    beginHighlight: '[',
    endHighlight: ']',
    resultType: options?.resultType,
    maxresults: '4',
  });

  const {
    data: autocompleteResponse,
  } = await axios.get<Here.AutocompleteResponse>(requestURL);

  return autocompleteResponse;
}
