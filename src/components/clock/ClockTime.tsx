import { FC } from 'react';

import { Container, StyledTime } from 'styles/components/clock/ClockTime';

interface Props {
  initialDate: Date;
  timeZone: string;
}

const ClockTime: FC<Props> = ({ initialDate, timeZone }) => (
  <Container>
    <StyledTime initialDate={initialDate} />
    {false && <p>{timeZone}</p>}
  </Container>
);

export default ClockTime;
