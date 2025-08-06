'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa6';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { postUserFavoriteAuction } from 'src/entities/user/mypage/auctions/api';
import { auctionQueryKeys } from 'src/entities/user/mypage/auctions/queries/keys';
import { popToast } from 'src/shared/utils/popToast';

const AuctionFavoriteMarkToggle = ({
  auctionInfo,
  auctionId,
  userId
}: {
  auctionInfo: AuctionInfoWithAddressType;
  auctionId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  const prevFavorites = auctionInfo.favorites;
  const isIncluded = prevFavorites.includes(userId);
  const [isFavorite, setIsFavorite] = useState(isIncluded);
  const user = useUserState();

  const mutate = useMutation<string, Error, { auctionId: string; updatedFavorites: string[] }, void>({
    mutationFn: async ({ auctionId, updatedFavorites }) => {
      const result = await postUserFavoriteAuction({ auctionId, updatedFavorites });
      return result;
    },
    onMutate: () => {
      setIsFavorite((state) => !state);
    },
    onError: () => {
      setIsFavorite((state) => !state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionQueryKeys.favorite(userId) });
    }
  });

  if (!user) return;

  const isNotSellerUser = auctionInfo.user_id !== userId && user.role === 'buyer';

  const handleFavoriteMarkClick = async () => {
    try {
      // 판매자 제외 및 역할이 buyer일 경우에만
      if (isNotSellerUser) {
        // 버튼 클릭 시점에 최신 값 가져오기
        const auctionInfo = await getAuctionInfoWithAddress(auctionId);
        const currentFavorites = auctionInfo.favorites;
        const updatedFavorites = isFavorite
          ? currentFavorites.filter((item) => item !== userId)
          : [...currentFavorites, userId];

        const result = await mutate.mutateAsync({ auctionId, updatedFavorites });
        if (result) {
          const alertTitle = isFavorite ? '관심 경매 해제 ' : '관심 경매 등록 ';
          const alertMessage = isFavorite ? '관심 경매를 해제했습니다.' : '관심 경매를 등록했습니다.';
          popToast('info', alertTitle, alertMessage, 'medium');
        }
        return;
      }
      toast.info('입찰 참여자로 변경해주세요.');
    } catch (error) {
      if (error instanceof Error) {
        const alertTitle = isFavorite ? '관심 경매 해제 실패' : '관심 경매 등록 실패';
        const alertMessage = isFavorite ? '관심 경매를 해제하지 못했습니다.' : '관심 경매를 등록하지 못했습니다.';
        popToast('error', alertTitle, alertMessage, 'medium');
        console.error(error.message);
      }
    }
  };

  return (
    <>
      {isNotSellerUser && (
        <Button
          variant="text"
          onClick={handleFavoriteMarkClick}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border bg-white/70 !px-3 !py-3 transition-colors duration-200"
        >
          <FaHeart
            className={`${
              isFavorite ? 'text-(--color-accent)' : 'text-(--color-warm-gray)'
            } h-6 w-6 transition-colors duration-200`}
          />
        </Button>
      )}
    </>
  );
};

export default AuctionFavoriteMarkToggle;
