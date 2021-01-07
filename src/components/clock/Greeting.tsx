import { FC, useMemo } from 'react';
import { DateTime } from 'luxon';

import { TimeOfDay } from 'typings';
import { SunIcon, MoonIcon } from 'assets';
import { getTimeOfDay } from 'utils/date';
import { Container } from 'styles/components/clock/Greeting';
import theme from 'styles/theme';

type GreetingIconFor = {
  [key in TimeOfDay]: typeof SunIcon | typeof MoonIcon;
};

const greetingIconFor: GreetingIconFor = {
  morning: SunIcon,
  afternoon: SunIcon,
  evening: MoonIcon,
  night: MoonIcon,
};

type Props =
  | { timeOfDay: TimeOfDay; dateTime?: undefined }
  | { timeOfDay?: undefined; dateTime: DateTime };

const Greeting: FC<Props> = (props) => {
  const timeOfDay = useMemo(
    () => props.timeOfDay || getTimeOfDay(props.dateTime),
    [props],
  );

  const GreetingIcon = useMemo(() => greetingIconFor[timeOfDay], [timeOfDay]);

  return (
    <Container>
      <GreetingIcon fill={theme.colors.secondaryWhite} />
      Good {timeOfDay}, it&apos;s currently
    </Container>
  );
};

export default Greeting;
