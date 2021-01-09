import axios from 'axios';

import { Address, Position, TimeZone } from 'typings';

interface ParsedGeocodeResponse {
  address: Address;
  timeZone: TimeZone;
}

type ReverseGeocodeClientResponse = ParsedGeocodeResponse;

function parseReverseGeocodeResponse(
  response: Here.ReverseGeocodeResponse,
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
): Promise<ReverseGeocodeClientResponse> {
  const { latitude, longitude } = position;

  const { data } = await axios.get<Here.ReverseGeocodeResponse>(
    `/api/reverse-geocode?position=${latitude},${longitude}`,
  );

  const { address, timeZone } = parseReverseGeocodeResponse(data);

  return {
    address,
    timeZone,
  };
}
