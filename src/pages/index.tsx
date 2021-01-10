import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { Address } from 'typings';
import { MapMarkerIcon } from 'assets';
import { useLocation } from 'contexts/location';
import { BackgroundImage } from 'components/common';
import { encodeQueryObject } from 'utils/general';
import { requestUserPosition } from 'utils/location';
import { reverseGeocodeClient } from 'services/client/location';
import {
  StyledLayout,
  SearchContainer,
  StyledSmartLocationInput,
  StyledButton,
} from 'styles/pages/HomePage';

const placeholderThemeImageSrc =
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80';

const Home: FC = () => {
  const [_, dispatch] = useLocation();
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(false);

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

    setIsUserLocationLoading(true);

    const { position } = userPositionResponse;
    const { address, timeZone } = await reverseGeocodeClient(position);

    setIsUserLocationLoading(false);

    dispatch({
      type: 'SET_LOCATION_DETAILS',
      address,
      timeZone,
    });

    redirectToTimePageBasedOn(address);
  }, [dispatch, redirectToTimePageBasedOn]);

  return (
    <StyledLayout pageTitle="GlobalClock">
      <SearchContainer>
        <StyledSmartLocationInput onSubmit={() => {}} />
        <StyledButton
          type="button"
          styleMode="primary"
          isLoading={isUserLocationLoading}
          icon={<MapMarkerIcon />}
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
