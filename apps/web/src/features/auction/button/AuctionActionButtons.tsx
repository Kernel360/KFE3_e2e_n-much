'use client';

import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { deleteAuctionInfo } from 'src/entities/auction/api';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionActionButtons = ({
  auctionInfo,
  auctionId
}: {
  auctionInfo: AuctionRow;
  auctionId: AuctionRow['auction_id'];
}) => {
  const router = useRouter();
  const user = useUserState();

  if (!user) {
    return;
  }
  // 경매 물품의 판매자
  const isSellerUser = auctionInfo.user_id === user.id;
  // 로그인된 유저가 seller 역할일 경우
  const isRoleUser = user.role === 'seller';

  const handleAuctionDelete = async () => {
    const confirmed = window.confirm('정말 이 사연을 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteAuctionInfo(auctionId);
      if (result) {
        toast.success('정상적으로 삭제 되었습니다.');
        router.push('/main');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('경매 물품을 삭제하지 못했습니다. 다시 시도해주세요.');
        console.error(error.message);
        router.refresh();
      }
    }
  };

  return (
    <>
      {isSellerUser && isRoleUser && (
        <div className="space-x-2">
          <Button variant="inActive" onClick={() => router.push(`/auctions/write?auction_id=${auctionId}`)}>
            수정
          </Button>
          <Button variant="outline" onClick={handleAuctionDelete}>
            삭제
          </Button>
        </div>
      )}
    </>
  );
};

export default AuctionActionButtons;
