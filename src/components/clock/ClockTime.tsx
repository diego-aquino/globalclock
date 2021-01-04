import { FC } from 'react';

import { DateTime } from 'luxon';

import {
  Container,
  StyledTime,
  TimeZone,
} from 'styles/components/clock/ClockTime';

interface Props {
  dateTime: DateTime;
}

const ClockTime: FC<Props> = ({ dateTime }) => (
  <Container>
    <StyledTime initialDateTime={dateTime} />
    <TimeZone>{dateTime.offsetNameShort}</TimeZone>
  </Container>
);

export default ClockTime;
