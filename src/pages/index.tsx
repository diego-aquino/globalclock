import { FC, useEffect, useState, useMemo } from 'react';

import { useLocation } from 'contexts/location';
import { reverseGeocode } from 'services/here';
import { Greeting, ClockThemeImage, ClockTime } from 'components/clock';
import { requestUserPosition, getAddressTimeZone } from 'utils/location';
import { StyledLayout, Container, Location } from 'styles/pages/ClockPage';

const ClockPage: FC = () => {
  const [{ position, address, timeZone }, dispatch] = useLocation();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const formattedLocation = useMemo(
    () => (address ? `${address.city}, ${address.countryName}` : ''),
    [address],
  );

  useEffect(() => {
    setCurrentDate(new Date());

    async function updateUserPositionIfAvailable() {
      const response = await requestUserPosition();

      if (response.status === 'SUCCESS') {
        dispatch({
          type: 'SET_POSITION',
          position: response.position,
        });
      }
    }

    updateUserPositionIfAvailable();
  }, [dispatch]);

  useEffect(() => {
    async function updateLocationDetailsIfAvailable() {
      if (!position) return;

      const locationResult = await reverseGeocode(position);
      const location = locationResult?.items[0];

      if (location) {
        dispatch({
          type: 'SET_LOCATION_DETAILS',
          address: location.address,
          timeZone: getAddressTimeZone(location.address),
        });
      }
    }

    updateLocationDetailsIfAvailable();
  }, [position, dispatch]);

  useEffect(() => {
    if (position && address && timeZone && currentDate) {
      setLoading(false);
    }
  }, [position, address, timeZone, currentDate]);

  return (
    <StyledLayout pageTitle={`${formattedLocation} | GlobalClock`}>
      <Container>
        {!loading && (
          <>
            <Greeting timeOfDay="morning" />
            <ClockTime initialDate={currentDate as Date} timeZone="BST" />
            <Location>In {formattedLocation}</Location>
          </>
        )}

        <ClockThemeImage timeOfDay="morning" />
      </Container>
    </StyledLayout>
  );
};

export default ClockPage;
