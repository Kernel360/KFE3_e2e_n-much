import { useQuery } from '@tanstack/react-query';
import { getUserEpisodes } from 'src/entities/user/mypage/episodes/api';
import { episodeQueryKeys } from 'src/entities/user/mypage/episodes/queries/keys';
import type { UserRow } from 'src/shared/supabase/types';

export const useGetUserEpisodes = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: episodeQueryKeys.user(userId || ''),
    queryFn: () => getUserEpisodes(userId!),
    enabled: !!userId,
    staleTime: 0
  });
};
