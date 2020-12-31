import axios from 'axios';

import { Position } from 'typings';
import { GeolocationResponse } from './types';

const hereAPIEndpoints = {
  geocode: 'https://geocoder.ls.hereapi.com/6.2/geocode.json',
  reverseGeocode:
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json',
} as const;

type HereAPIEndpointNames = keyof typeof hereAPIEndpoints;

function generateHereRequestURL(
  endpoint: typeof hereAPIEndpoints[HereAPIEndpointNames],
  ...queryParams: string[]
): string {
  if (queryParams.length === 0) {
    throw new Error(
      'No enough query parameters. Could not generate a valid request URL.',
    );
  }

  const requestURL = [
    `${endpoint}`,
    `?${queryParams.join('&')}`,
    `&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`,
  ].join('');

  return requestURL;
}

export async function geocode(
  geocodeSearch: string,
): Promise<GeolocationResponse | null> {
  const requestURL = generateHereRequestURL(
    hereAPIEndpoints.geocode,
    `searchtext=${geocodeSearch}`,
    `locationattributes=${[
      'address',
      'additionalData',
      'adminInfo',
      'timeZone',
    ].join(',')}`,
    `timestamp=${new Date().toISOString()}`,
  );

  const { data: locationResponse } = await axios.get<GeolocationResponse>(
    requestURL,
  );

  return locationResponse;
}

export async function reverseGeocode(
  position: Position,
): Promise<GeolocationResponse | null> {
  const requestURL = generateHereRequestURL(
    hereAPIEndpoints.reverseGeocode,
    `prox=${position.latitude},${position.longitude}`,
    'mode=retrieveAddresses',
    'maxresults=1',
    `locationattributes=${[
      'address',
      'additionalData',
      'adminInfo',
      'timeZone',
    ].join(',')}`,
    `timestamp=${new Date().toISOString()}`,
  );

  const { data: locationResponse } = await axios.get<GeolocationResponse>(
    requestURL,
  );

  return locationResponse;
}
