import { FC } from 'react';

import { Container } from 'styles/components/clock/ClockTime';

interface Props {
  timeZone: string;
}

const ClockTime: FC<Props> = ({ timeZone }) => (
  <Container>
    <h1>11:37</h1>
    <p>{timeZone}</p>
  </Container>
);

export default ClockTime;
