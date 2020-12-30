import { FC, useCallback } from 'react';

import { useLocation } from 'contexts/location';
import { reverseGeocode } from 'services/here';
import { requestUserPosition, getAddressTimeZone } from 'utils/location';

const Home: FC = () => {
  const [_, dispatch] = useLocation();

  const handleUseUserLocation = useCallback(async () => {
    const response = await requestUserPosition();

    if (response.status === 'SUCCESS') {
      const locationResult = await reverseGeocode(response.position);
      const location = locationResult?.items[0];

      if (location) {
        dispatch({
          type: 'SET_LOCATION_DETAILS',
          address: location.address,
          timeZone: getAddressTimeZone(location.address),
        });
      }
    }
  }, [dispatch]);

  return (
    <button type="button" onClick={handleUseUserLocation}>
      Use my location
    </button>
  );
};

export default Home;
