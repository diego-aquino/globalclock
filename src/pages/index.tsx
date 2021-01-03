import { FC, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Address } from 'typings';
import { useLocation } from 'contexts/location';
import { reverseGeocode } from 'services/here';
import {
  requestUserPosition,
  parseGeolocationResponseToLocation,
  generateCityId,
} from 'utils/location';

const Home: FC = () => {
  const [{ address }, dispatch] = useLocation();

  const router = useRouter();

  const handleUseUserLocation = useCallback(async () => {
    const userPositionResponse = await requestUserPosition();

    if (userPositionResponse.status === 'SUCCESS') {
      const geolocationResponse = await reverseGeocode(
        userPositionResponse.position,
      );

      if (!geolocationResponse) return;

      const location = parseGeolocationResponseToLocation(geolocationResponse);

      dispatch({ type: 'SET_LOCATION_DETAILS', ...location });
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
    <button type="button" onClick={handleUseUserLocation}>
      Use my location
    </button>
  );
};

export default Home;
