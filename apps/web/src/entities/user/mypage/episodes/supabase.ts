import { createClient } from 'src/shared/supabase/client/client';
import type { UserRow } from 'src/shared/supabase/types';

const supabase = createClient();

export const selectEpisodesByUserId = async (userId: UserRow['id']) => {
  const { data: episodes, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      auctions:auction_id (
        title,
        status
      )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectEpisodesByUserId ~ error:', error);
    throw new Error('DB: 사용자 에피소드 목록 조회 에러');
  }

  return episodes ?? [];
};

// 사용자가 좋아요 한 에피소드 목록 조회 - KSH
export const selectLikeEpisodesByUserId = async (userId: UserRow['id']) => {
  const { data, error } = await supabase
    .from('episodes')
    .select('*, auctions(title,status)')
    .contains('likes', [userId]);

  if (error) {
    throw new Error('DB: 사용자가 좋아요 한 에피소드 목록 조회 에러');
  }
  return data ?? [];
};

// 좋아요 한 에피소드 갱신(추가/삭제) 및 입찰가 갱신 - KSH
export const updateLikeEpisode = async ({
  episodeId,
  updatedLikes,
  updatedBidPoint
}: {
  episodeId: string;
  updatedLikes: string[];
  updatedBidPoint: number;
}) => {
  if (!episodeId && !updatedLikes && !updatedBidPoint) {
    throw new Error('DB: 사용자가 좋아요 한 에피소드 갱신 에러(episodeId와 updatedLikes와 bidPoint가 없습니다.)');
  }

  const { data, error } = await supabase
    .from('episodes')
    .update({ likes: updatedLikes, bid_point: updatedBidPoint })
    .eq('episode_id', episodeId)
    .select('episode_id, likes, bid_point')
    .single();

  if (error) {
    console.error('updateAuction', error);
    throw new Error('DB: 사용자가 좋아요 한 에피소드 갱신 에러');
  }

  return data;
};
