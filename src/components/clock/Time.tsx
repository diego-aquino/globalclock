import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
} from 'react';

interface IntervalReference {
  current: NodeJS.Timeout | null;
}

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  initialDate: Date;
}

const Time: FC<Props> = ({ initialDate, ...rest }) => {
  const getFormattedDisplayTime = useCallback((date: Date) => {
    const [hours, minutes] = [date.getHours(), date.getMinutes()];

    const formattedHours = `${hours < 10 ? '0' : ''}${hours}`;
    const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  }, []);

  const [displayTime, setDisplayTime] = useState(
    getFormattedDisplayTime(initialDate),
  );
  const baseDate = useRef<Date>(new Date());

  const getUpToDateDisplayTime = useCallback(() => {
    const currentDate = new Date();
    const deltaTime = currentDate.getTime() - baseDate.current.getTime();

    const finalDate = new Date(initialDate.getTime() + deltaTime);

    return getFormattedDisplayTime(finalDate);
  }, [initialDate, getFormattedDisplayTime]);

  useEffect(() => {
    baseDate.current = new Date();

    setDisplayTime(getUpToDateDisplayTime());

    const interval: IntervalReference = { current: null };
    const secondsToNextMinute = 60 - initialDate.getSeconds();

    setTimeout(() => {
      setDisplayTime(getUpToDateDisplayTime());

      interval.current = setInterval(() => {
        setDisplayTime(getUpToDateDisplayTime());
      }, 60000);
    }, secondsToNextMinute * 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [initialDate, getUpToDateDisplayTime]);

  return <p {...rest}>{displayTime}</p>;
};

export default Time;
