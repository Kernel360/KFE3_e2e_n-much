import { INIT_MAX_POINT_NUM, INIT_STARTING_POINT_NUM } from 'src/entities/auction/constants';
import { getNowKorDate, getTime, getTomorrowDate } from 'src/shared/utils/formatWithTimeZone';

export const getFormDefaultValues = () => {
  const korToday = getNowKorDate();
  const endDay = getTomorrowDate(korToday);
  const endTime = getTime(endDay);

  return {
    title: '',
    description: '',
    endDay,
    endTime,
    startingPoint: String(INIT_STARTING_POINT_NUM),
    maxPoint: String(INIT_MAX_POINT_NUM)
  };
};
