'use client';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { type AuctionRow } from 'src/shared/supabase/types';
import { twMerge } from 'tailwind-merge';

const EpisodeWriteButton = ({
  auctionInfo,
  isWritten,
  className
}: {
  auctionInfo: AuctionRow;
  isWritten: boolean;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const auctionId = auctionInfo.auction_id;
  const sellerId = auctionInfo.user_id;

  const user = useUserState();

  const buttonProps = {
    variant: 'active' as const,
    size: 'lg' as const,
    className: twMerge('w-full hover:bg-(--color-primary)', className)
  };

  const getHref = () => {
    const queryString = searchParams.toString();
    return `/episode/${auctionId}${queryString ? `?${queryString}` : ''}`;
  };

  if (!user) return;
  const isUserRole = user.role === 'buyer';

  if (!isUserRole || sellerId === user.id) return;

  return isWritten ? (
    <Button {...buttonProps} disabled>
      사연 작성 완료
    </Button>
  ) : (
    <Button {...buttonProps} asChild>
      <Link href={getHref()}>사연 작성하기</Link>
    </Button>
  );
};

export default EpisodeWriteButton;
