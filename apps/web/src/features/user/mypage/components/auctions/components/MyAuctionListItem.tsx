'use client';

import { Button } from '@repo/ui/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BaseBadge from 'src/shared/ui/BaseBadge';
import PointDisplay from 'src/shared/ui/PointDisplay';
import { formatFullDateTime } from 'src/shared/utils/formatKoreanDate';
import { getAuctionStatusText, getAuctionStatusVariant } from 'src/shared/utils/getAuctionStatusText';
import BaseCard from 'src/widgets/BaseCard';
import type { MyAuctionListItemProps } from 'src/entities/user/mypage/auctions/types';

const MyAuctionListItem = ({ auction, currentTab }: MyAuctionListItemProps) => {
  const { push } = useRouter();
  const {
    auction_id: auctionId,
    title,
    image_urls: imageUrls,
    status,
    current_point: currentPoint,
    starting_point: startingPoint,
    end_date: endDate
  } = auction;

  const firstImageUrl = imageUrls?.[0];

  const handleDetailClick = (auctionId: string) => {
    if (currentTab) {
      push(`/auctions/${auctionId}?from=mypage/auctions&tab=${currentTab}`);
    } else {
      push(`/auctions/${auctionId}`);
    }
  };

  return (
    <BaseCard as="li" className="mb-4">
      <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b pb-4">
        <div className="size-26 overflow-hidden rounded-lg border">
          {firstImageUrl ? (
            <Image src={firstImageUrl} alt={title} width={104} height={104} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
              이미지 없음
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-1 font-medium">{title}</h3>
            <BaseBadge variant={getAuctionStatusVariant(status)}>{getAuctionStatusText(status)}</BaseBadge>
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="flex justify-between text-sm">
              <span className="text-(--color-warm-gray)">최종 낙찰가</span>
              <PointDisplay amount={currentPoint || startingPoint} className="text-(--color-warm-gray) font-semibold" />
            </p>
            <p className="flex items-baseline justify-between text-sm">
              <span className="text-(--color-warm-gray)">내 최종 입찰가</span>
              <PointDisplay amount={currentPoint || 0} className="text-base" />
            </p>
            <p className="text-(--color-warm-gray) flex justify-between text-sm">
              <span>경매 종료일</span>
              <time>{formatFullDateTime(endDate)}</time>
            </p>
          </div>
        </div>
      </div>
      <Button variant="base" className="mt-3 w-full" onClick={() => handleDetailClick(auctionId)}>
        상세보기
      </Button>
    </BaseCard>
  );
};

export default MyAuctionListItem;
