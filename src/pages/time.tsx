import { FC, useEffect, useState, useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { DateTime } from 'luxon';

import { useLocation } from 'contexts/location';
import { Greeting, ClockTime, CityThemeImage } from 'components/clock';
import {
  requestAddressDetails,
  requestLocalTimeZone,
} from 'services/client/location';
import { requestCurrentUTCTime } from 'services/client/time';
import { StyledLayout, Container, LocationLabel } from 'styles/pages/TimePage';

interface PageQuery extends ParsedUrlQuery {
  city?: string;
  state?: string;
  country?: string;
}

interface PageRouter extends NextRouter {
  query: PageQuery;
}

const TimePage: FC = () => {
  const [{ address, timeZone }, dispatch] = useLocation();
  const [localDateTime, setLocalDateTime] = useState<DateTime | null>(null);

  const { query }: PageRouter = useRouter();

  useEffect(() => {
    const { city: cityName, state: stateCode, country: countryCode } = query;

    if (!cityName || !countryCode) return;

    const updateLocalTimeDetails = async () => {
      const [localTimeZone, currentUTCTime] = await Promise.all([
        timeZone || requestLocalTimeZone({ cityName, stateCode, countryCode }),
        requestCurrentUTCTime(),
      ]);

      const currentLocalDateTime = DateTime.fromISO(currentUTCTime).setZone(
        localTimeZone.id,
      );

      dispatch({ type: 'SET_TIME_ZONE', timeZone });
      setLocalDateTime(currentLocalDateTime);
    };

    const updateAddressIfNecessary = async () => {
      if (address) return;

      const localAddress = await requestAddressDetails({
        cityName,
        stateCode,
        countryCode,
      });

      dispatch({ type: 'SET_ADDRESS', address: localAddress });
    };

    updateLocalTimeDetails();
    updateAddressIfNecessary();
  }, [timeZone, address, dispatch, query]);

  const cityLocationLabel = useMemo(
    () =>
      address
        ? `${address.cityName}, ${address.countryName || address.countryCode}`
        : '',
    [address],
  );

  const pageTitle = useMemo(
    () =>
      cityLocationLabel ? `${cityLocationLabel} | GlobalClock` : 'GlobalClock',
    [cityLocationLabel],
  );

  return (
    <StyledLayout pageTitle={pageTitle}>
      <Container>
        {address && localDateTime && (
          <>
            <Greeting dateTime={localDateTime} />
            <ClockTime dateTime={localDateTime} />
            <LocationLabel>In {cityLocationLabel}</LocationLabel>
            <CityThemeImage address={address} dateTime={localDateTime} />
          </>
        )}
      </Container>
    </StyledLayout>
  );
};

export default TimePage;
