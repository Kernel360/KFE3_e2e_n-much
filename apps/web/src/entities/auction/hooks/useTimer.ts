import { useEffect, useRef, useState } from 'react';
import { differenceInSeconds, type Duration, intervalToDuration } from 'date-fns';
import { TZDate } from 'react-day-picker';
import { DEFAULT_TIMER_DELAY, MILLISECONDS, TIME_UNIT_PADDING } from 'src/entities/auction/constants';

type TimerReturnType = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type TimerProps = {
  endDate: string;
  delay?: number;
  onCompleted?: () => void;
};

export const useTimer = ({ endDate, delay = DEFAULT_TIMER_DELAY, onCompleted }: TimerProps): TimerReturnType => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!(typeof endDate === 'string') || !endDate) {
      setRemainingTime(0);
      return;
    }

    const calculateRemainingTime = (): number => {
      const now = new TZDate(new Date(), 'Asia/Seoul');
      const end = new TZDate(endDate, 'Asia/Seoul');
      const secondsDiff = differenceInSeconds(end, now);
      return secondsDiff > 0 ? secondsDiff : 0;
    };

    setRemainingTime(calculateRemainingTime());

    intervalRef.current = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();

      //ANCHOR - 타이머 종료
      if (newRemainingTime <= 0 && intervalRef.current) {
        onCompleted?.();
        clearInterval(intervalRef.current);
      }

      //ANCHOR - 타이머 작동
      setRemainingTime(newRemainingTime);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endDate, delay, onCompleted]);

  //ANCHOR - 반환하는 날짜 형식: 05일 05시 05분 05초
  const formatTime = (timeInSeconds: number) => {
    const duration: Duration = intervalToDuration({ start: 0, end: timeInSeconds * MILLISECONDS });

    return {
      days: String(duration.days || 0).padStart(TIME_UNIT_PADDING, '0'),
      hours: String(duration.hours || 0).padStart(TIME_UNIT_PADDING, '0'),
      minutes: String(duration.minutes || 0).padStart(TIME_UNIT_PADDING, '0'),
      seconds: String(duration.seconds || 0).padStart(TIME_UNIT_PADDING, '0')
    };
  };

  return { ...formatTime(remainingTime) };
};
