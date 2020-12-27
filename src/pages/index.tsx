import { FC, useEffect, useState, useMemo } from 'react';

import { Greeting, ClockThemeImage, ClockTime } from 'components/clock';
import { StyledLayout, Container, Location } from 'styles/pages/ClockPage';

const ClockPage: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const formattedLocation = useMemo(() => 'London, United Kingdom', []);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

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
