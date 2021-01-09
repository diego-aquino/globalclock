import axios from 'axios';

import { Position, QueryObject } from 'typings';
import { encodeQueryObject } from 'utils/general';

export const hereEndpoints = {
  geocode: 'https://geocoder.ls.hereapi.com/6.2/geocode.json',
  reverseGeocode:
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json',
} as const;

const defaultQueryParams = {
  language: 'en-US',
  gen: '9',
  jsonattributes: '1',
  apiKey: process.env.NEXT_PUBLIC_HERE_API_KEY,
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

export async function geocode(
  geocodeSearch: string,
): Promise<Here.GeocodeResponse> {
  const requestURL = generateHereRequestURL(hereEndpoints.geocode, {
    searchtext: geocodeSearch,
    locationattributes: 'adminInfo,timeZone',
    timestamp: new Date().toISOString(),
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
    maxresults: 1,
    locationattributes: 'adminInfo,timeZone',
    timestamp: new Date().toISOString(),
  });

  const { data: locationResponse } = await axios.get<Here.GeocodeResponse>(
    requestURL,
  );

  return locationResponse;
}
