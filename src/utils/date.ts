import { DateTime } from 'luxon';

import { TimeOfDay } from 'typings';

type TimeOfDayIntervals = {
  [key in TimeOfDay]: key extends 'night'
    ? {
        firstHalfStart: number;
        firstHalfEnd: number;
        secondHalfStart: number;
        secondHalfEnd: number;
      }
    : { start: number; end: number };
};

const timeOfDayIntervals: TimeOfDayIntervals = {
  morning: {
    start: 360, // 06:00
    end: 719, // 11:59
  },
  afternoon: {
    start: 720, // 12:00
    end: 1079, // 17:59
  },
  evening: {
    start: 1080, // 18:00
    end: 1259, // 20:59
  },
  night: {
    firstHalfStart: 1260, // 21:00
    firstHalfEnd: 1439, // 23:59
    secondHalfStart: 0, // 00:00
    secondHalfEnd: 719, // 05:59
  },
};

export function getTimeOfDay(date: Date | DateTime): TimeOfDay {
  const hours = date instanceof Date ? date.getHours() : date.hour;
  const minutes = date instanceof Date ? date.getMinutes() : date.minute;

  const minutesSinceStartOfDay = hours * 60 + minutes;

  const intervalNames = Object.keys(timeOfDayIntervals) as TimeOfDay[];

  const matchedIntervalIndex = intervalNames.findIndex((intervalName) => {
    if (intervalName === 'night') {
      const interval = timeOfDayIntervals[intervalName];
      const isInsideInterval =
        (minutesSinceStartOfDay >= interval.firstHalfStart &&
          minutesSinceStartOfDay <= interval.firstHalfEnd) ||
        (minutesSinceStartOfDay >= interval.secondHalfStart &&
          minutesSinceStartOfDay <= interval.secondHalfEnd);

      return isInsideInterval;
    }

    const interval = timeOfDayIntervals[intervalName];
    const isInsideInterval =
      minutesSinceStartOfDay >= interval.start &&
      minutesSinceStartOfDay <= interval.end;

    return isInsideInterval;
  });

  const timeOfDay = intervalNames[matchedIntervalIndex];

  return timeOfDay;
}
