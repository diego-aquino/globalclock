import { FC, useEffect, useState, useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { DateTime } from 'luxon';

import { ArrowIcon } from 'assets';
import { useLocation } from 'contexts/location';
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

  const { query, back: historyBack }: PageRouter = useRouter();

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

  useEffect(() => {
    const requestAndUpdateBackgroundPhoto = async () => {
      const { city, state, country } = query;
      const requestId = encodeQueryObject({ city, state, country });

      const response = await requestRandomBackgroundPhoto({
        query: 'landscape',
        requestId,
      });

      if (response.photo) {
        setBackgroundPhoto(response.photo);
      }
    };

    requestAndUpdateBackgroundPhoto();
  }, [query]);

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
      cityLocationLabel ? `${cityLocationLabel} | TimeInCity` : 'TimeInCity',
    [cityLocationLabel],
  );

  return (
    <StyledLayout pageTitle={pageTitle}>
      <Container>
        <BackButton
          styleMode="primary"
          showLabel={false}
          icon={<ArrowIcon direction="left" />}
          onClick={historyBack}
        >
          Go back
        </BackButton>

        {localDateTime && (
          <>
            <Greeting dateTime={localDateTime} />
            <LocalTime dateTime={localDateTime} />
          </>
        )}
        {address && <LocationLabel>In {cityLocationLabel}</LocationLabel>}
        {backgroundPhoto && (
          <BackgroundPhotoWithAttribution
            photo={backgroundPhoto}
            host={{ name: 'Unsplash', website: 'https://unsplash.com' }}
          />
        )}
      </Container>
    </StyledLayout>
  );
};

export default TimePage;
