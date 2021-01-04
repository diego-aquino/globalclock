import { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { DateTime } from 'luxon';

import { Address, Position, TimeOfDay } from 'typings';
import { useLocation } from 'contexts/location';
import { Greeting, ClockTime, ClockThemeImage } from 'components/clock';
import {
  extractCityLabel,
  parseGeolocationResponseToLocation,
} from 'utils/location';
import { getTimeOfDay } from 'utils/date';
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

  const {
    query: { cityId },
  }: PageRouter = useRouter();

  const getUpToDateLocalDateTime = useCallback(async () => {
    if (location.localDateTime && location.baseDeviceDateTime) {
      const timeSinceLocationRequest = location.baseDeviceDateTime.diffNow();

      const upToDateLocalDateTime = location.localDateTime.plus({
        milliseconds: Math.abs(timeSinceLocationRequest.valueOf()),
      });

      return Promise.resolve(upToDateLocalDateTime);
    }

    if (!cityId) return Promise.resolve(null);

    const cityLabel = extractCityLabel(cityId);
    if (!cityLabel) return Promise.resolve(null);

    const geolocationResponse = await geocode(cityLabel);

    const {
      localDateTime: upToDateLocalDateTime,
    } = parseGeolocationResponseToLocation(geolocationResponse);

    return upToDateLocalDateTime;
  }, [cityId, location.baseDeviceDateTime, location.localDateTime]);

  useEffect(() => {
    async function updateToLatestLocalDateTime() {
      const upToDateLocalDateTime = await getUpToDateLocalDateTime();

      if (cityId) {
        setLocalDateTime(upToDateLocalDateTime);
      }
    }

    updateToLatestLocalDateTime();
  }, [cityId, getUpToDateLocalDateTime]);

  const address = useMemo(() => location.address || props.address || null, [
    location,
    props,
  ]);

  const formattedCityLocation = useMemo(
    () => (address ? `${address.city}, ${address?.countryName}` : ''),
    [address],
  );
  const timeOfDay = useMemo<TimeOfDay | null>(
    () => (localDateTime ? getTimeOfDay(localDateTime) : null),
    [localDateTime],
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
        {localDateTime && address && timeOfDay ? (
          <>
            <Greeting timeOfDay={timeOfDay} />
            <ClockTime dateTime={localDateTime} />
            <LocationLabel>In {formattedCityLocation}</LocationLabel>
            <ClockThemeImage address={address} timeOfDay={timeOfDay} />
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
  async function generateStaticPropsFromCityId(
    cityId: string | undefined,
  ): Promise<PageProps> {
    if (!cityId) return {};

    const cityLabel = extractCityLabel(cityId);
    if (!cityLabel) return {};

    const geolocationResponse = await geocode(cityLabel);

    const location = parseGeolocationResponseToLocation(geolocationResponse);
    const { position, address } = location;

    const serializableStaticProps = JSON.parse(
      JSON.stringify({ position, address }, (_, value) => value ?? null),
    );

    return serializableStaticProps;
  }

  return {
    props: await generateStaticPropsFromCityId(params?.cityId),
  };
};

export default TimePage;
