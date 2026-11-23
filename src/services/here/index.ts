import axios from 'axios';

import {
  Address,
  CitySuggestion,
  LocationDetails,
  Position,
  QueryObject,
} from 'typings';

const hereEndpoints = {
  geocode: 'https://geocode.search.hereapi.com/v1/geocode',
  reverseGeocode: 'https://revgeocode.search.hereapi.com/v1/revgeocode',
  autocomplete: 'https://autocomplete.search.hereapi.com/v1/autocomplete',
  lookup: 'https://lookup.search.hereapi.com/v1/lookup',
} as const;

type HereEndpointURL = typeof hereEndpoints[keyof typeof hereEndpoints];

const defaultQueryParams = {
  lang: 'en-US',
  apiKey: process.env.HERE_API_KEY,
};

async function requestHere<ResponseData>(
  endpointURL: HereEndpointURL,
  query: QueryObject,
): Promise<ResponseData> {
  const { data } = await axios.get<ResponseData>(endpointURL, {
    params: { ...query, ...defaultQueryParams },
  });

  return data;
}

function toAddress(hereAddress: Here.Address): Address {
  const { city, state, stateCode, countryCode, countryName } = hereAddress;

  // HERE geocodes some cities, such as Tokyo, as a state-level area without a
  // city field.
  if (!city) {
    return { cityName: state ?? countryName, countryCode, countryName };
  }

  return {
    cityName: city,
    stateCode,
    stateName: state,
    countryCode,
    countryName,
  };
}

function toLocationDetails(place: Here.Place | undefined): LocationDetails {
  if (!place) {
    return { address: null, timeZone: null };
  }

  return {
    address: toAddress(place.address),
    timeZone: { id: place.timeZone.name },
  };
}

function toQualifiedQuery(address: Partial<Address>): string {
  const qualifiedFields = [
    ['city', address.cityName],
    ['state', address.stateCode || address.stateName],
  ];

  return qualifiedFields
    .filter(([, value]) => !!value)
    .map(([field, value]) => `${field}=${value}`)
    .join(';');
}

// The `country` field of a qualified query does not match ISO country codes
// reliably, so the country is applied as a filter instead. Results are not
// limited to cities because HERE geocodes some cities as administrative areas.
export async function geocode(
  address: Partial<Address>,
): Promise<LocationDetails> {
  const { items } = await requestHere<Here.ItemList<Here.Place>>(
    hereEndpoints.geocode,
    {
      qq: toQualifiedQuery(address),
      in: address.countryCode && `countryCode:${address.countryCode}`,
      show: 'tz',
      limit: '1',
    },
  );

  return toLocationDetails(items[0]);
}

export async function lookup(locationId: string): Promise<LocationDetails> {
  const place = await requestHere<Here.Place>(hereEndpoints.lookup, {
    id: locationId,
    show: 'tz',
  });

  return toLocationDetails(place);
}

export async function reverseGeocode(
  position: Position,
): Promise<LocationDetails> {
  const { items } = await requestHere<Here.ItemList<Here.Place>>(
    hereEndpoints.reverseGeocode,
    {
      at: `${position.latitude},${position.longitude}`,
      types: 'city',
      show: 'tz',
      limit: '1',
    },
  );

  return toLocationDetails(items[0]);
}

const MAX_AUTOCOMPLETE_SUGGESTIONS = '4';

export async function autocompleteCities(
  queryString: string,
): Promise<CitySuggestion[]> {
  const { items } = await requestHere<Here.ItemList<Here.AutocompleteItem>>(
    hereEndpoints.autocomplete,
    {
      q: queryString,
      types: 'city',
      limit: MAX_AUTOCOMPLETE_SUGGESTIONS,
    },
  );

  return items.map((item) => ({
    locationId: item.id,
    address: toAddress(item.address),
  }));
}
