import { FaCoins, FaGift, FaHammer, FaPen } from 'react-icons/fa6';
import PointDisplay from 'src/shared/ui/PointDisplay';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import BaseCard from 'src/widgets/BaseCard';
import type { PointHistoryListItemProps } from 'src/entities/user/mypage/points/types';

const PointHistoryListItem = ({ point }: PointHistoryListItemProps) => {
  const { amount, created_at: createdAt, balance_after: balanceAfter, description, source } = point;

  const getPointIcon = (source: string) => {
    const iconClassName = 'text-(--color-accent) size-4';
    switch (source) {
      case 'bid':
        return <FaHammer className={iconClassName} />;
      case 'episode_write':
        return <FaPen className={iconClassName} />;
      case 'auction_write':
        return <FaCoins className={iconClassName} />;
      case 'signup':
      default:
        return <FaGift className={iconClassName} />;
    }
  };

  return (
    <BaseCard as="li" className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 pb-3 md:pb-0">
        <div className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">
          {getPointIcon(source)}
        </div>
        <div className="flex flex-col">
          <p>{description}</p>
          <time className="text-(--color-warm-gray) text-xs">{formatYYYYMMDD(createdAt)}</time>
        </div>
      </div>
      <div className="border-t-(--color-warm-gray)/30 flex flex-col items-end gap-0.5 border-t pt-3 md:border-t-transparent md:pt-0">
        {amount > 0 ? (
          <p>
            <span className="text-(--color-accent) font-semibold">+ </span>
            <PointDisplay amount={amount} className="font-semibold" />
          </p>
        ) : (
          <p>
            <span className="text-(--color-red) font-semibold">- </span>
            <PointDisplay amount={Math.abs(amount)} className="text-(--color-red) font-semibold" />
          </p>
        )}
        <p className="text-(--color-warm-gray) text-xs">
          잔액 : <PointDisplay amount={balanceAfter} className="text-(--color-warm-gray) font-normal" />
        </p>
      </div>
    </BaseCard>
  );
};

export default PointHistoryListItem;
