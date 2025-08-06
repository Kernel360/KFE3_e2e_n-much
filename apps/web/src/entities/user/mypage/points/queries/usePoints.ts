import { useQuery } from '@tanstack/react-query';
import { getUserBidPoint, getUserPoints } from 'src/entities/user/mypage/points/api';
import { pointQueryKeys } from 'src/entities/user/mypage/points/queries/keys';
import type { UserRow } from 'src/shared/supabase/types';

// 유저의 포인트 히스토리
export const useGetUserPoints = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: pointQueryKeys.user(userId || ''),
    queryFn: () => getUserPoints(userId!),
    enabled: !!userId,
    staleTime: 0
  });
};

// 유저의 총 포인트
export const useUserBidPoint = (userId?: string | null) => {
  return useQuery({
    queryKey: ['userBidPoint', userId || ''],
    queryFn: () => getUserBidPoint(userId!),
    enabled: !!userId,
    staleTime: 0
  });
};
