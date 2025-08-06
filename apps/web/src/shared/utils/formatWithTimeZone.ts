import { addHours, format, set } from 'date-fns';
import { TZDate } from 'react-day-picker';
import { HOURS_OF_DAY, KOR_TIME_ZONE, UTC_TIME_ZONE } from 'src/entities/auction/constants';

export const getNowKorDate = () => {
  const now = new Date();
  const korNow = new TZDate(now, KOR_TIME_ZONE);

  return korNow;
};

export const getTomorrowDate = (date: Date) => {
  const tomorrowDate = addHours(date, HOURS_OF_DAY);
  return tomorrowDate;
};

export const getTime = (date: Date) => {
  const time = format(date, 'HH:mm:ss');
  return time;
};

export const convertFromUtcToKorDate = (date: string) => {
  const korDate = new TZDate(date, KOR_TIME_ZONE);
  return korDate;
};

export const convertFromKorToUtcDate = (date: Date) => {
  const korDate = new TZDate(date, UTC_TIME_ZONE);
  return korDate;
};

export const setTimeToDate = (date: Date, time: string) => {
  const splittedTime = time.split(':');
  const resultDate = set(date, {
    hours: Number(splittedTime[0]),
    minutes: Number(splittedTime[1]),
    seconds: Number(splittedTime[2])
  });

  return resultDate;
};
