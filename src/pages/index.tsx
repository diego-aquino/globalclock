import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Address } from 'typings';
import { MyLocationIcon } from 'assets';
import { useLocation } from 'contexts/location';
import { BackgroundImage } from 'components/common';
import { encodeQueryObject } from 'utils/general';
import { requestUserPosition } from 'utils/location';
import { geocodeClient, reverseGeocodeClient } from 'services/client/location';
import {
  StyledLayout,
  SearchContainer,
  StyledSmartLocationInput,
  StyledButton,
} from 'styles/pages/HomePage';
import { useWindowSize } from 'hooks';

const placeholderThemeImageSrc =
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80';

const Home: FC = () => {
  const [_, dispatch] = useLocation();
  const [userLocationIsLoading, setUserLocationIsLoading] = useState(false);

  const windowSize = useWindowSize();
  const [showUseMyLocationLabel, setShowUseMyLocationLabel] = useState(false);

  const router = useRouter();

  const redirectToTimePageBasedOn = useCallback(
    (cityAddress: Address) => {
      const {
        cityName,
        stateName,
        stateCode,
        countryName,
        countryCode,
      } = cityAddress;

      const query = encodeQueryObject({
        city: cityName,
        state: stateCode || stateName,
        country: countryCode || countryName,
      });

      router.push({ pathname: `/time`, query });
    },
    [router],
  );

  const handleUseUserLocation = useCallback(async () => {
    const userPositionResponse = await requestUserPosition();

    if (userPositionResponse.status !== 'SUCCESS') return;

    setUserLocationIsLoading(true);

    const { position } = userPositionResponse;
    const { address, timeZone } = await reverseGeocodeClient(position);

    setUserLocationIsLoading(false);

    dispatch({
      type: 'SET_LOCATION_DETAILS',
      address,
      timeZone,
    });

    redirectToTimePageBasedOn(address);
  }, [dispatch, redirectToTimePageBasedOn]);

  const handleSmartLocationInputSubmit = useCallback(
    async (suggestion: Here.Suggestion) => {
      const { address, timeZone } = await geocodeClient({
        locationid: suggestion.locationId,
      });

      dispatch({
        type: 'SET_LOCATION_DETAILS',
        address,
        timeZone,
      });

      redirectToTimePageBasedOn(address);
    },
    [dispatch, redirectToTimePageBasedOn],
  );

  useEffect(() => {
    setShowUseMyLocationLabel(windowSize.width > 580);
  }, [windowSize]);

  return (
    <StyledLayout pageTitle="TimeInCity">
      <SearchContainer>
        <StyledSmartLocationInput onSubmit={handleSmartLocationInputSubmit} />
        <StyledButton
          type="button"
          styleMode="primary"
          showLabel={showUseMyLocationLabel}
          loading={userLocationIsLoading}
          icon={<MyLocationIcon />}
          onClick={handleUseUserLocation}
        >
          Use my location
        </StyledButton>
      </SearchContainer>
      <BackgroundImage src={placeholderThemeImageSrc} />
    </StyledLayout>
  );
};

export default Home;
