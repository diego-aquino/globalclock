import { DateTime } from 'luxon';
import cityTimezones from 'city-timezones';

import { Address, Position, Location, TimeZone } from 'typings';
import { GeolocationResponse } from 'services/here/types';

const isClient = typeof window !== 'undefined';

type UserPositionResponse =
  | {
      status: 'SUCCESS';
      position: Position;
    }
  | {
      status: 'NOT_SUPPORTED' | 'FAILED';
      position: null;
    };

export async function requestUserPosition(): Promise<UserPositionResponse> {
  if (!isClient || !navigator.geolocation)
    return {
      position: null,
      status: 'NOT_SUPPORTED',
    };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({
          position: { latitude, longitude },
          status: 'SUCCESS',
        });
      },
      () =>
        resolve({
          position: null,
          status: 'FAILED',
        }),
    );
  });
}

export function parseGeolocationResponseToLocation(
  geolocationResponse: GeolocationResponse,
): Location {
  const {
    MetaInfo: { Timestamp: timestamp },
    View: [{ Result }],
  } = geolocationResponse.Response;

  const {
    DisplayPosition,
    Address: LocationAddress,
    AdminInfo,
  } = Result[0].Location;

  const position: Position = {
    latitude: DisplayPosition.Latitude,
    longitude: DisplayPosition.Longitude,
  };

  const AdditionalDataObject = {
    CountryName: '',
    StateName: '',
  };
  LocationAddress.AdditionalData.forEach((item) => {
    AdditionalDataObject[item.key] = item.value;
  });

  const address: Address = {
    city: LocationAddress.City,
    countryCode: LocationAddress.Country,
    countryName: AdditionalDataObject.CountryName,
    label: LocationAddress.Label,
    stateCode: LocationAddress.State,
    stateName: AdditionalDataObject.StateName,
  };

  const timeZoneOffsetName = AdminInfo.TimeZoneOffset;

  const localDateTime = DateTime.fromISO(timestamp).setZone(timeZoneOffsetName);
  const {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  } = localDateTime;

  const timeZone = {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  };

  return {
    position,
    address,
    localDateTime,
    timeZone,
  };
}

export function getTimeZoneData(timeZoneName: string): TimeZone {
  const localDateInMatchedTimeZone = DateTime.local().setZone(timeZoneName);
  const {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  } = localDateInMatchedTimeZone;

  const timeZone: TimeZone = {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  };

  return timeZone;
}

export function generateCityId(address: Address): string {
  const { city, stateName, countryName } = address;

  const cityIdentifier = [city, stateName, countryName]
    .map((resource) => (resource ? encodeURIComponent(resource) : ''))
    .filter((resource) => resource !== '')
    .join(',');

  return `@${cityIdentifier}`;
}

export function extractCityLabel(cityId: string): string | null {
  const cityIdentifierMatchingRegex = /(?:@)(.+)/;

  const matchResult = cityId.match(cityIdentifierMatchingRegex);
  if (!matchResult) return null;

  const cityLabel = matchResult[1].replace(',', ' ');

  return cityLabel;
}
