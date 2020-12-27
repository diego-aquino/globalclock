import { FC, useMemo } from 'react';

import { Greeting, ClockThemeImage, ClockTime } from 'components/clock';
import { StyledLayout, Container, Location } from 'styles/pages/ClockPage';

const ClockPage: FC = () => {
  const formattedLocation = useMemo(() => 'London, United Kingdom', []);

  return (
    <StyledLayout pageTitle={`${formattedLocation} | GlobalClock`}>
      <Container>
        <Greeting timeOfDay="morning" />
        <ClockTime timeZone="BST" />
        <Location>In {formattedLocation}</Location>

        <ClockThemeImage timeOfDay="morning" />
      </Container>
    </StyledLayout>
  );
};

export default ClockPage;
