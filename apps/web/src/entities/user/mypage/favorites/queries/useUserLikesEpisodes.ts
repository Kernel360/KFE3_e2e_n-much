import { useQuery } from '@tanstack/react-query';
import { getUserLikesEpisodes } from 'src/entities/user/mypage/episodes/api';
import { episodeQueryKeys } from 'src/entities/user/mypage/episodes/queries/keys';
import type { UserRow } from 'src/shared/supabase/types';

export const useGetUserLikesEpisodes = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: episodeQueryKeys.userLikes(userId || ''),
    queryFn: () => getUserLikesEpisodes(userId!),
    enabled: !!userId,
    staleTime: 0
  });
};
