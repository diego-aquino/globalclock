import { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { DateTime } from 'luxon';

import { Address, Location, Position } from 'typings';
import { useLocation } from 'contexts/location';
import { Greeting, ClockTime, CityThemeImage } from 'components/clock';
import {
  extractCityLabel,
  parseGeolocationResponseToLocation,
} from 'utils/location';
import { serializeObject } from 'utils/general';
import { geocode } from 'services/here';
import { StyledLayout, Container, LocationLabel } from 'styles/pages/TimePage';

interface PageProps {
  position?: Position;
  address?: Address;
}

interface PageParams extends ParsedUrlQuery {
  cityId?: string;
}

interface PageRouter extends NextRouter {
  query: PageParams;
}

const TimePage: FC<PageProps> = (props) => {
  const [location] = useLocation();
  const [localDateTime, setLocalDateTime] = useState<DateTime | null>(null);

  const { query }: PageRouter = useRouter();

  const getAvailableLocalTime = useCallback(() => {
    if (!location.localDateTime || !location.baseDeviceDateTime) return null;

    const millisecondsSinceLocationRequest = Math.abs(
      location.baseDeviceDateTime.diffNow().valueOf(),
    );

    const currentLocalTime = location.localDateTime.plus({
      milliseconds: millisecondsSinceLocationRequest,
    });

    return currentLocalTime;
  }, [location]);

  const requestCurrentLocalTime = useCallback(async () => {
    if (!query.cityId) return null;

    const cityLabel = extractCityLabel(query.cityId);
    if (!cityLabel) return null;

    const geolocationResponse = await geocode(cityLabel);

    const {
      localDateTime: currentLocalTime,
    } = parseGeolocationResponseToLocation(geolocationResponse);

    return currentLocalTime;
  }, [query.cityId]);

  const getCurrentLocalTime = useCallback(
    () => getAvailableLocalTime() || requestCurrentLocalTime(),
    [getAvailableLocalTime, requestCurrentLocalTime],
  );

  useEffect(() => {
    async function updateToLatestLocalTime() {
      const currentLocalTime = await getCurrentLocalTime();

      if (query.cityId) {
        setLocalDateTime(currentLocalTime);
      }
    }

    updateToLatestLocalTime();
  }, [query.cityId, getCurrentLocalTime]);

  const address = useMemo(() => location.address || props.address || null, [
    location,
    props,
  ]);

  const formattedCityLocation = useMemo(
    () => (address ? `${address.city}, ${address?.countryName}` : ''),
    [address],
  );

  return (
    <StyledLayout
      pageTitle={
        formattedCityLocation
          ? `${formattedCityLocation} | GlobalClock`
          : 'GlobalClock'
      }
    >
      <Container>
        {localDateTime && address ? (
          <>
            <Greeting dateTime={localDateTime} />
            <ClockTime dateTime={localDateTime} />
            <LocationLabel>In {formattedCityLocation}</LocationLabel>
            <CityThemeImage address={address} dateTime={localDateTime} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </StyledLayout>
  );
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  async function getLocationBasedOnCityId(
    cityId: string,
  ): Promise<Location | null> {
    const cityLabel = extractCityLabel(cityId);
    if (!cityLabel) return null;

    const geolocationResponse = await geocode(cityLabel);
    const location = parseGeolocationResponseToLocation(geolocationResponse);

    return location;
  }

  async function generateStaticPropsFromCityId(
    cityId: string | undefined,
  ): Promise<PageProps> {
    if (!cityId) return {};

    const location = await getLocationBasedOnCityId(cityId);
    if (!location) return {};

    const serializedStaticProps = serializeObject({
      address: location.address,
    });

    return serializedStaticProps;
  }

  return {
    props: await generateStaticPropsFromCityId(params?.cityId),
  };
};

export default TimePage;
