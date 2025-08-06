export const getUserEpisodes = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/episodes?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

// 사용자가 좋아요 한 에피소드 리스트 조회 - KSH
export const getUserLikesEpisodes = async (userId: string) => {
  if (!userId) {
    throw new Error('getUserLikeEpisodes: userId가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/episodes/likes?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

// 사용자가 좋아요 한 에피소드 갱신(추가/삭제), 해당 사연의 입찰가 갱신(추가/삭제) - KSH
export const postUserLikesEpisode = async ({
  episodeId,
  updatedLikes,
  updatedBidPoint
}: {
  episodeId: string;
  updatedLikes: string[];
  updatedBidPoint: number;
}) => {
  if (!episodeId) {
    throw new Error('postUserLikesEpisode: episodeId가 없습니다.');
  }

  if (!updatedLikes) {
    throw new Error('postUserLikesEpisode: updatedLikes가 없습니다.');
  }

  if (!updatedBidPoint && updatedBidPoint !== 0) {
    throw new Error('postUserLikesEpisode: updatedBidPoint가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/likes`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ episodeId, updatedLikes, updatedBidPoint })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
