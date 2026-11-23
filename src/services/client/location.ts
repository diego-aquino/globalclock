import axios from 'axios';

import {
  Address,
  CitySuggestion,
  LocationDetails,
  Position,
  QueryObject,
  TimeZone,
} from 'typings';
import { RequestQuery as GeocodeRequestQuery } from 'pages/api/geocode';
import { RequestQuery as ReverseGeocodeRequestQuery } from 'pages/api/reverse-geocode';
import {
  RequestQuery as AutocompleteRequestQuery,
  ResponseData as AutocompleteResponseData,
} from 'pages/api/autocomplete';
import { encodeQueryObject } from 'utils/general';

export async function reverseGeocodeClient(
  position: Position,
): Promise<LocationDetails> {
  const requestQuery: ReverseGeocodeRequestQuery = {
    position: `${position.latitude},${position.longitude}`,
  };
  const encodedQuery = encodeQueryObject(requestQuery as QueryObject);

  const { data } = await axios.get<LocationDetails>(
    `/api/reverse-geocode?${encodedQuery}`,
  );

  return data;
}

export async function geocodeClient(
  query: GeocodeRequestQuery,
): Promise<LocationDetails> {
  const { city, state, country, locationid } = query;
  const encodedQualifiedQuery = encodeQueryObject({
    city,
    state,
    country,
    locationid,
  });

  const { data } = await axios.get<LocationDetails>(
    `/api/geocode?${encodedQualifiedQuery}`,
  );

  return data;
}

export async function requestAddressDetails(
  query: Partial<Address>,
): Promise<Address | null> {
  const { address } = await geocodeClient({
    city: query.cityName,
    state: query.stateCode || query.stateName,
    country: query.countryCode || query.countryName,
  });

  return address;
}

export async function requestLocalTimeZone(
  query: Partial<Address>,
): Promise<TimeZone | null> {
  const { timeZone } = await geocodeClient({
    city: query.cityName,
    state: query.stateCode || query.stateName,
    country: query.countryCode || query.countryName,
  });

  return timeZone;
}

export async function requestAutocompleteSuggestions(
  queryString: string,
): Promise<CitySuggestion[]> {
  const requestQuery: AutocompleteRequestQuery = { query: queryString };
  const encodedQuery = encodeQueryObject(requestQuery as QueryObject);

  const autocompleteResponse = await axios.get<AutocompleteResponseData>(
    `/api/autocomplete?${encodedQuery}`,
  );

  const { suggestions } = autocompleteResponse.data;

  return suggestions;
}
