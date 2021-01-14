import { FC } from 'react';

import { DateTime } from 'luxon';

import {
  Container,
  StyledTime,
  TimeZone,
} from 'styles/components/time/LocalTime';

interface Props {
  dateTime: DateTime;
}

const LocalTime: FC<Props> = ({ dateTime }) => (
  <Container>
    <StyledTime initialDateTime={dateTime} />
    <TimeZone>{dateTime.offsetNameShort}</TimeZone>
  </Container>
);

export default LocalTime;
