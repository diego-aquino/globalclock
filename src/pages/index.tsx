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
import { LocationModeSelect } from 'components/home';
import { LocationMode } from 'components/home/LocationModeSelect';
import {
  StyledLayout,
  SearchContainer,
  StyledSmartLocationInput,
} from 'styles/pages/HomePage';

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

  const handleLocationModeChange = useCallback(
    (newLocationMode: LocationMode) => {
      if (newLocationMode === 'userLocation') {
        handleUseUserLocation();
      }
    },
    [handleUseUserLocation],
  );

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
        <LocationModeSelect onChange={handleLocationModeChange} />
      </SearchContainer>
    </StyledLayout>
  );
};

export default Home;
