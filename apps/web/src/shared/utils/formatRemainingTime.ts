import {
  type Duration,
  formatDuration,
  intervalToDuration,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isBefore
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';
import { type AuctionTimerStatus } from 'src/entities/auction/types';

type RemainingTimeType = {
  status: AuctionTimerStatus;
  duration: Duration;
  remainTime: string;
  formattedTime: string;
};

export const formatRemainingTime = (endDate: string): RemainingTimeType => {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const end = new TZDate(endDate, 'Asia/Seoul');
  let status: AuctionTimerStatus = 'ongoing';
  let remainTime = '';

  // 전체 남은 시간 (UI에 표시)
  const duration = intervalToDuration({ start: now, end });

  const formattedTime = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    locale: ko
  });

  // 보다 정확한 단위 판단 (반올림 없이 계산)
  const diffInMinutes = differenceInMinutes(end, now);
  const diffInHours = differenceInHours(end, now);
  const diffInDays = differenceInDays(end, now);
  const diffInMonths = differenceInMonths(end, now);
  const diffInYears = differenceInYears(end, now);

  // 종료 여부 판단
  if (isBefore(end, now)) {
    status = 'urgent';
    remainTime = '종료';
  } else if (diffInYears > 0) {
    remainTime = `${diffInYears}년 남음`;
  } else if (diffInMonths > 0) {
    remainTime = `${diffInMonths}개월 남음`;
  } else if (diffInDays > 0) {
    remainTime = `${diffInDays}일 남음`;
  } else if (diffInHours > 1) {
    remainTime = `${diffInHours}시간 남음`;
  } else if (diffInHours === 1) {
    status = 'urgent';
    remainTime = '1시간 남음';
  } else if (diffInMinutes > 0) {
    status = 'urgent';
    remainTime = `${diffInMinutes}분 남음`;
  } else {
    // 초 단위라도 아직 끝나지 않았다면 1분 미만
    status = 'urgent';
    remainTime = '1분 미만';
  }

  return {
    status,
    duration,
    remainTime,
    formattedTime
  };
};
