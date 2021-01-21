import { FC } from 'react';

import { DateTime } from 'luxon';

import { TimeZone } from 'typings';
import { WithTooltip } from 'components/common';
import {
  Container,
  StyledTime,
  TimeZoneLabel,
} from 'styles/components/time/LocalTime';

interface Props {
  dateTime: DateTime;
  timeZone: TimeZone;
}

const LocalTime: FC<Props> = ({ dateTime, timeZone }) => (
  <Container>
    <StyledTime initialDateTime={dateTime} />
    <WithTooltip
      id="timeZoneLabel"
      place="right"
      overridePosition={(position) => position}
      render={(elementProps) => (
        <TimeZoneLabel {...elementProps}>{timeZone.nameShort}</TimeZoneLabel>
      )}
      tooltip={timeZone.nameLong}
    />
  </Container>
);

export default LocalTime;
