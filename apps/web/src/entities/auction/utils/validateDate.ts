import { getNowKorDate, setTimeToDate } from 'src/shared/utils/formatWithTimeZone';

export const validateDate = (day: Date, time: string, isDisableCondition: boolean) => {
  const formEndDay = day;
  const formEndTime = time;
  const formDate = setTimeToDate(formEndDay, formEndTime);
  const korNow = getNowKorDate();

  return isDisableCondition ? formDate < korNow : formDate > korNow;
};
