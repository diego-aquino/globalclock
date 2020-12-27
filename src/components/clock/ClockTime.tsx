import { FC } from 'react';

import {
  Container,
  StyledTime,
  TimeZone,
} from 'styles/components/clock/ClockTime';

interface Props {
  initialDate: Date;
  timeZone: string;
}

const ClockTime: FC<Props> = ({ initialDate, timeZone }) => (
  <Container>
    <StyledTime initialDate={initialDate} />
    {false && <TimeZone>{timeZone}</TimeZone>}
  </Container>
);

export default ClockTime;
