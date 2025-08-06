'use client';

import React, { useEffect, useState } from 'react';
import { IoTime } from 'react-icons/io5';
import { type AuctionTimerStatus } from 'src/entities/auction/types';
import { twMerge } from 'tailwind-merge';

type AuctionTimerProps = {
  remainTime: string;
  status: AuctionTimerStatus;
  className?: string;
  children: React.ReactNode;
};

const AuctionTimer = ({ remainTime, status, className, children }: AuctionTimerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  let timerTextColor = '';

  switch (status) {
    case 'ongoing':
      timerTextColor = 'text-(--color-accent)';
      break;
    case 'urgent':
      timerTextColor = 'text-(--color-red)';
      break;
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-(--color-warm-gray) flex items-center gap-1 text-sm font-semibold">
        <IoTime />
        <span>남은 시간 계산 중...</span>
      </div>
    );
  }

  return (
    <div className={twMerge(`flex items-center gap-1 text-sm font-semibold ${timerTextColor}`, className)}>
      {children}
      <span>{remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
