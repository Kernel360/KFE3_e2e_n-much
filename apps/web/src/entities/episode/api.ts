import { type AuctionBidPointAmount } from 'src/entities/auction/types';
import type {
  EpisodeCreateType,
  EpisodeEditType,
  EpisodeInfo,
  EpisodeListType,
  EpisodesCountType
} from 'src/entities/episode/types';
import type { AuctionRow, EpisodeRow, PointRow, UserBidPointRow, UserRow } from 'src/shared/supabase/types';

//ANCHOR - 경매 물품에 대한 에피소드 정보
export const getEpisodeInfo = async (episode_id: EpisodeRow['episode_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/?episodeId=${episode_id}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: EpisodeRow = await res.json();
  return data;
};

//ANCHOR - 경매 물품에 대한 에피소드 등록
export const postEpisodeInfo = async ({ auctionId, userId, title, description }: EpisodeCreateType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      auctionId,
      userId,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const status = await res.json();
  return status.message;
};

//ANCHOR - 경매 물품에 대한 에피소드 수정
export const patchEpisodeInfo = async ({ episodeId, title, description }: EpisodeEditType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=updateEpisode`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      episodeId,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const status = await res.json();
  return status.message;
};

//ANCHOR - 경매 물품에 대한 전체 에피소드 개수
export const getEpisodesCount = async (auction_id: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auction_id}?type=episode_list_count`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: EpisodesCountType = await res.json();

  return data;
};

//ANCHOR - 경매 물품에 대한 페이지별 에피소드 리스트 및 사연자 정보
export const getEpisodesWithPagination = async (auction_id: AuctionRow['auction_id'], page: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auction_id}?type=page&page=${page}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: EpisodeListType = await res.json();

  return data;
};

//ANCHOR - 경매 물품에 대한 에피소드 삭제
export const deleteEpisodeInfo = async (episodeId: EpisodeRow['episode_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({ episodeId })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data: boolean = await res.json();
  return data;
};

//ANCHOR - 사연 작성 유효성 검사
export const getHasUserWrittenEpisode = async (auctionId: AuctionRow['auction_id'], userId: AuctionRow['user_id']) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/buyer?auction_id=${auctionId}&user_id=${userId}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: boolean = await res.json();
  return data;
};

//ANCHOR - 사연에 대한 경매 참여자(Buyer)의 총입찰 포인트
export const getEpisodeTotalBidPointByUser = async (
  auctionId: AuctionRow['auction_id'],
  userId: EpisodeRow['user_id']
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/bid?auction_id=${auctionId}&user_id=${userId}`
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: UserBidPointRow['total_bid_points'] = await res.json();
  return data;
};

//ANCHOR - 사용자의 보유 포인트
export const getUserPointAmount = async (userId: UserRow['id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/bid?user_id=${userId}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: PointRow['balance_after'] = await res.json();
  return data;
};

//ANCHOR - 현재 경매 물품의 입찰가, 하한가, 상한가
export const getAuctionBidPointAmount = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/bid?auction_id=${auctionId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: AuctionBidPointAmount = await res.json();
  return data;
};

//ANCHOR - 사연 입찰
export const patchEpisodeBid = async (episodeId: EpisodeRow['episode_id'], bidPoint: EpisodeRow['bid_point']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/bid`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      episodeId,
      bidPoint
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: boolean = await res.json();
  return data;
};

//NOTE - 특정 에피소드 낙찰
export const fetchUpdateEpisodeWinning = async (episode_id: string, winning_bid: boolean) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=winningEpisode`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      episode_id,
      winning_bid
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: EpisodeInfo = await res.json();

  return data.status;
};

//NOTE - 사용자 참여 중인 경매 개수 조회
export const fetchUserBiddingCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=biddingCount`);
  if (!res.ok) {
    throw new Error('참여 중인 경매 개수를 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

//NOTE - 사용자가 작성한 스토리 목록 조회
export const fetchUserStories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=userStories`);
  if (!res.ok) {
    throw new Error('사용자 스토리 목록을 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};
