import { FC, useMemo } from 'react';

import { TimeOfDay } from 'typings';
import { SunIcon, MoonIcon } from 'assets';
import { Container } from 'styles/components/clock/Greeting';
import theme from 'styles/theme';

const { clockPage: pageColors } = theme.colors;

type GreetingIconFor = {
  [key in TimeOfDay]: typeof SunIcon | typeof MoonIcon;
};

const greetingIconFor: GreetingIconFor = {
  morning: SunIcon,
  afternoon: SunIcon,
  evening: MoonIcon,
  night: MoonIcon,
};

interface Props {
  timeOfDay: TimeOfDay;
}

const Greeting: FC<Props> = ({ timeOfDay }) => {
  const GreetingIcon = useMemo(() => greetingIconFor[timeOfDay], [timeOfDay]);

  return (
    <Container>
      <GreetingIcon fill={pageColors.primaryText} />
      Good {timeOfDay}, it&apos;s currently
    </Container>
  );
};

export default Greeting;
