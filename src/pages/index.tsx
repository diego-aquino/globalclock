import { FC, useCallback, useEffect } from 'react';
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
  const [{ address }, dispatch] = useLocation();

  const router = useRouter();

  const handleUseUserLocation = useCallback(async () => {
    const userPositionResponse = await requestUserPosition();

    if (userPositionResponse.status === 'SUCCESS') {
      const geolocationResponse = await reverseGeocode(
        userPositionResponse.position,
      );

      const baseDeviceDateTime = DateTime.local();
      const location = parseGeolocationResponseToLocation(geolocationResponse);

      dispatch({
        type: 'SET_LOCATION_DETAILS',
        baseDeviceDateTime,
        ...location,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const isReadyToGoToTimePage = !!address;

    if (isReadyToGoToTimePage) {
      const cityId = generateCityId(address as Address);

      router.push({ pathname: `/time/${cityId}` });
    }
  }, [router, address]);

  return (
    <StyledLayout pageTitle="GlobalClock">
      <SearchContainer>
        <StyledSmartLocationInput onSubmit={() => {}} />
        <StyledButton
          type="button"
          styleMode="primary"
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
