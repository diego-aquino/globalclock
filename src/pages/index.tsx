import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';

import { Address } from 'typings';
import { useLocation } from 'contexts/location';
import { reverseGeocode } from 'services/here';
import {
  requestUserPosition,
  parseGeolocationResponseToLocation,
  generateCityId,
} from 'utils/location';
import { MapMarkerIcon } from 'assets';
import {
  StyledLayout,
  SearchContainer,
  StyledSmartLocationInput,
  StyledButton,
} from 'styles/pages/HomePage';
import { BackgroundImage } from 'components/common';

const placeholderThemeImageSrc =
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80';

const Home: FC = () => {
  const [_, dispatch] = useLocation();
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(false);

  const router = useRouter();

  const redirectToTimePageBasedOn = useCallback(
    (cityAddress: Address) => {
      const cityId = generateCityId(cityAddress);

      router.push({ pathname: `/time/${cityId}` });
    },
    [router],
  );

  const handleUseUserLocation = useCallback(async () => {
    const userPositionResponse = await requestUserPosition();

    if (userPositionResponse.status !== 'SUCCESS') return;

    setIsUserLocationLoading(true);

    const geolocationResponse = await reverseGeocode(
      userPositionResponse.position,
    );

    const baseDeviceDateTime = DateTime.local();
    const location = parseGeolocationResponseToLocation(geolocationResponse);

    setIsUserLocationLoading(false);

    dispatch({
      type: 'SET_LOCATION_DETAILS',
      baseDeviceDateTime,
      ...location,
    });

    redirectToTimePageBasedOn(location.address);
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
