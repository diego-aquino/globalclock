import { FC } from 'react';

import { DateTime } from 'luxon';

import { WithTooltip } from 'components/common';
import {
  Container,
  StyledTime,
  TimeZoneLabel,
} from 'styles/components/time/LocalTime';

interface Props {
  dateTime: DateTime;
}

const LocalTime: FC<Props> = ({ dateTime }) => (
  <Container>
    <StyledTime initialDateTime={dateTime} />
    <WithTooltip
      id="timeZoneLabel"
      place="right"
      overridePosition={(position) => position}
      render={(elementProps) => (
        <TimeZoneLabel {...elementProps}>
          {dateTime.offsetNameShort}
        </TimeZoneLabel>
      )}
      tooltip={dateTime.offsetNameLong}
    />
  </Container>
);

export default LocalTime;
