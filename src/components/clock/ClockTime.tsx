import { FC } from 'react';

import { DateTime } from 'luxon';

import {
  Container,
  StyledTime,
  TimeZone,
} from 'styles/components/clock/ClockTime';

interface Props {
  localDateTime: DateTime;
}

const ClockTime: FC<Props> = ({ localDateTime }) => (
  <Container>
    <StyledTime initialDateTime={localDateTime} />
    <TimeZone>{localDateTime.offsetNameShort}</TimeZone>
  </Container>
);

export default ClockTime;
