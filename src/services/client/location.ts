import axios from 'axios';

import { Address, Position, TimeZone } from 'typings';
import { encodeQueryObject } from 'utils/general';

interface ParsedGeocodeResponse {
  address: Address;
  timeZone: TimeZone;
}

type GeocodeClientResponse = ParsedGeocodeResponse;

type GeocodeQualifiedQuery = Partial<Address>;

function parseHereGeocodeResponse(
  response: Here.GeocodeResponse,
): ParsedGeocodeResponse {
  const [{ result }] = response.response.view;
  const { location } = result[0];

  const { city, state, country, additionalData } = location.address;
  const { timeZone } = location.adminInfo;

  const address: Address = {
    city,
    state,
    country,
  };

  additionalData.forEach((item) => {
    if (item.key === 'StateName') {
      address.stateName = item.value;
    }
    if (item.key === 'CountryName') {
      address.countryName = item.value;
    }
  });

  return {
    address,
    timeZone,
  };
}

export async function reverseGeocodeClient(
  position: Position,
): Promise<GeocodeClientResponse> {
  const { latitude, longitude } = position;

  const { data } = await axios.get<Here.GeocodeResponse>(
    `/api/reverse-geocode?position=${latitude},${longitude}`,
  );

  const { address, timeZone } = parseHereGeocodeResponse(data);

  return {
    address,
    timeZone,
  };
}

export async function geocodeClient(
  query: GeocodeQualifiedQuery,
): Promise<GeocodeClientResponse> {
  const { city, state, country } = query;
  const encodedQualifiedQuery = encodeQueryObject({ city, state, country });

  const { data } = await axios.get<Here.GeocodeResponse>(
    `/api/geocode?${encodedQualifiedQuery}`,
  );

  const { address, timeZone } = parseHereGeocodeResponse(data);

  return {
    address,
    timeZone,
  };
}

export async function requestAddressDetails(
  qualifiedQuery: Partial<Address>,
): Promise<Address> {
  const { address } = await geocodeClient(qualifiedQuery);

  return address;
}

export async function requestLocalTimeZone(
  address: Partial<Address>,
): Promise<TimeZone> {
  const { timeZone } = await geocodeClient(address);

  return timeZone;
}
