import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
} from 'react';

import { DateTime } from 'luxon';

interface IntervalReference {
  current: NodeJS.Timeout | null;
}

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  initialDateTime: DateTime;
}

const Time: FC<Props> = ({ initialDateTime, ...rest }) => {
  const getFormattedDisplayTime = useCallback((dateTime: DateTime) => {
    const { hour, minute } = dateTime.toObject();

    if (hour === undefined || minute === undefined) {
      throw new Error(
        'Could not determine hours and/or minutes of DateTime ' +
          dateTime.toString(),
      );
    }

    const [formattedHours, formattedMinutes] = [hour, minute].map(
      (value) => `${value < 10 ? '0' : ''}${value}`,
    );

    return `${formattedHours}:${formattedMinutes}`;
  }, []);

  const [displayTime, setDisplayTime] = useState(
    getFormattedDisplayTime(initialDateTime),
  );
  const baseDateTime = useRef<DateTime>(DateTime.local());

  const getUpToDateDisplayTime = useCallback(() => {
    const deltaTime = baseDateTime.current.diffNow();
    const finalDateTime = initialDateTime.plus({
      milliseconds: Math.abs(deltaTime.valueOf()),
    });

    return getFormattedDisplayTime(finalDateTime);
  }, [initialDateTime, getFormattedDisplayTime]);

  useEffect(() => {
    baseDateTime.current = DateTime.local();

    setDisplayTime(getUpToDateDisplayTime());

    const interval: IntervalReference = { current: null };
    const secondsToNextMinute = 60 - initialDateTime.second;

    const intervalSetupTimeout = setTimeout(() => {
      setDisplayTime(getUpToDateDisplayTime());

      interval.current = setInterval(() => {
        setDisplayTime(getUpToDateDisplayTime());
      }, 60000);
    }, secondsToNextMinute * 1000);

    return () => {
      clearTimeout(intervalSetupTimeout);
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [initialDateTime, getUpToDateDisplayTime]);

  return <p {...rest}>{displayTime}</p>;
};

export default Time;
