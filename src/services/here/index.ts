import axios from 'axios';

import { Position } from 'typings';
import { GeolocationResponse } from './types';

const hereAPIEndpoints = {
  geocode: 'https://geocoder.ls.hereapi.com/6.2/geocode.json',
  reverseGeocode:
    'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json',
} as const;

type HereAPIEndpointNames = keyof typeof hereAPIEndpoints;
type HereAPIEndpointURL = typeof hereAPIEndpoints[HereAPIEndpointNames];

function generateHereRequestURL(
  endpointURL: HereAPIEndpointURL,
  ...queryParams: string[]
): string {
  if (queryParams.length === 0) {
    throw new Error(
      'No enough query parameters. Could not generate a valid request URL.',
    );
  }

  const requestURL = [
    `${endpointURL}`,
    `?${queryParams.join('&')}`,
    '&language=en-US',
    `&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`,
  ].join('');

  return requestURL;
}

export async function geocode(
  geocodeSearch: string,
): Promise<GeolocationResponse> {
  const requestURL = generateHereRequestURL(
    hereAPIEndpoints.geocode,
    `searchtext=${encodeURIComponent(geocodeSearch)}`,
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
): Promise<GeolocationResponse> {
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
