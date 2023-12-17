import { FC, useEffect, useState, useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { DateTime } from 'luxon';

import { ArrowIcon } from 'assets';
import { useLocation } from 'contexts/location';
import { useMount } from 'hooks';
import {
  Greeting,
  LocalTime,
  BackgroundPhotoWithAttribution,
} from 'components/time';
import {
  requestAddressDetails,
  requestLocalTimeZone,
} from 'services/client/location';
import { requestCurrentUTCTime } from 'services/client/time';
import { requestRandomBackgroundPhoto } from 'services/client/unsplash';
import { unsplashHostDetails } from 'services/unsplash';
import { encodeQueryObject } from 'utils/general';
import {
  BackButton,
  StyledLayout,
  Container,
  LocationLabel,
} from 'styles/pages/TimePage';

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
  const [
    backgroundPhoto,
    setBackgroundPhoto,
  ] = useState<Unsplash.PhotoWithAttribution | null>(null);
  const isMounted = useMount();

  const router: PageRouter = useRouter();

  useEffect(() => {
    const {
      city: cityName,
      state: stateCode,
      country: countryCode,
    } = router.query;

    if (!cityName || !countryCode) return;

    const updateLocalTimeDetails = async () => {
      const [localTimeZone, currentUTCTime] = await Promise.all([
        timeZone || requestLocalTimeZone({ cityName, stateCode, countryCode }),
        requestCurrentUTCTime(),
      ]);

      if (!isMounted()) return;
      if (!localTimeZone) {
        router.push('/');
        return;
      }

      const currentLocalDateTime = DateTime.fromISO(currentUTCTime).setZone(
        localTimeZone.id,
      );

      dispatch({ type: 'SET_TIME_ZONE', timeZone: localTimeZone });
      setLocalDateTime(currentLocalDateTime);
    };

    const updateAddressIfNecessary = async () => {
      if (address) return;

      const localAddress = await requestAddressDetails({
        cityName,
        stateCode,
        countryCode,
      });

      if (!isMounted()) return;
      if (!localAddress) {
        router.push('/');
        return;
      }

      dispatch({ type: 'SET_ADDRESS', address: localAddress });
    };

    updateLocalTimeDetails();
    updateAddressIfNecessary();
  }, [timeZone, address, dispatch, router, isMounted]);

  useEffect(() => {
    const requestAndUpdateBackgroundPhoto = async () => {
      const { city, state, country } = router.query;
      const requestId = encodeQueryObject({ city, state, country });

      const response = await requestRandomBackgroundPhoto({
        query: 'landscape',
        requestId,
      });

      if (response.photo && isMounted()) {
        setBackgroundPhoto(response.photo);
      }
    };

    requestAndUpdateBackgroundPhoto();
  }, [isMounted, router.query]);

  const cityLocationLabel = useMemo(
    () =>
      address
        ? [
            address.cityName,
            address.stateName || address.stateCode,
            address.countryName || address.countryCode,
          ]
            .filter((resource) => !!resource)
            .join(', ')
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
        <BackButton
          styleMode="primary"
          showLabel={false}
          icon={<ArrowIcon direction="left" />}
          onClick={() => router.push('/')}
        >
          Go back
        </BackButton>

        {localDateTime && timeZone && (
          <>
            <Greeting dateTime={localDateTime} />
            <LocalTime dateTime={localDateTime} timeZone={timeZone} />
          </>
        )}
        {address && <LocationLabel>In {cityLocationLabel}</LocationLabel>}
        {backgroundPhoto && (
          <BackgroundPhotoWithAttribution
            photo={backgroundPhoto}
            host={unsplashHostDetails}
          />
        )}
      </Container>
    </StyledLayout>
  );
};

export default TimePage;
