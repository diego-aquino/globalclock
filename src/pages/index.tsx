import { FC, useEffect, useState, useMemo } from 'react';

import { useLocation } from 'contexts/location';
import { Greeting, ClockThemeImage, ClockTime } from 'components/clock';
import { requestUserPosition } from 'utils/location';
import { StyledLayout, Container, Location } from 'styles/pages/ClockPage';

const ClockPage: FC = () => {
  const [_, dispatch] = useLocation();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const formattedLocation = useMemo(() => 'London, United Kingdom', []);

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

  return (
    <StyledLayout pageTitle={`${formattedLocation} | GlobalClock`}>
      <Container>
        {currentDate && (
          <>
            <Greeting timeOfDay="morning" />
            <ClockTime initialDate={currentDate} timeZone="BST" />
            <Location>In {formattedLocation}</Location>
          </>
        )}

        <ClockThemeImage timeOfDay="morning" />
      </Container>
    </StyledLayout>
  );
};

export default ClockPage;
