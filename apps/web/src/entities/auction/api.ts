import type {
  AuctionInfoWithAddressType,
  AuctionSummaryInfoWithAddressType,
  BidderRankingInfoType,
  SellerAuctionCountType
} from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

//ANCHOR - 경매 상세 페이지: 경매 상풍 및 업체 정보
export const getAuctionInfoWithAddress = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: AuctionInfoWithAddressType = await res.json();
  return data;
};

//ANCHOR - 에피소드 등록 페이지: 경매 상품 및 업체 정보
export const getAuctionSummaryInfoWithAddress = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=episode_form`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data: AuctionSummaryInfoWithAddressType = await res.json();
  return data;
};

//ANCHOR - 경매자의 총 경매 수 및 현재 진행중인 경매 수
export const getSellerAuctionCount = async (seller_id: AuctionRow['user_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/seller?id=${seller_id}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: SellerAuctionCountType = await res.json();

  return data;
};

//ANCHOR - 입찰 랭킹의 입찰자의 정보
export const getBidderRanking = async (auction_id: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auction_id}?type=ranking`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: BidderRankingInfoType[] | null = await res.json();
  return data;
};

//ANCHOR - 경매 데이터 삭제
export const deleteAuctionInfo = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data: boolean = await res.json();
  return data;
};

//NOTE - 셀러가 등록한 경매 목록 조회
export const fetchSellerAuctions = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions?type=sellerAuctions`);
  if (!res.ok) {
    throw new Error('셀러 경매 목록을 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

// 모든 경매와 해당 경매의 사연 갯수 가져오기
export const getAuctionCardList = async ({
  order,
  keyword,
  pageParam
}: {
  order: string | undefined;
  keyword: string | undefined;
  pageParam: number | undefined;
}) => {
  //NOTE - pageParam이 0인 경우, false로 나옴
  if (!order && pageParam === undefined) {
    throw new Error('getAllAuctionsWithEpisodeCount: order와 pageParam이 없습니다.');
  }

  if (!order) {
    throw new Error('getAllAuctionsWithEpisodeCount: order가 없습니다.');
  }

  if (pageParam === undefined) {
    throw new Error('getAllAuctionsWithEpisodeCount: pageParam이 없습니다.');
  }

  let url: string | null = null;

  if (keyword?.trim()) {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auction_card_list?order=${order}&page=${pageParam}&keyword=${keyword}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auction_card_list?order=${order}&page=${pageParam}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('모든 경매와 해당 경매의 사연 갯수 fetch 실패');
  }

  const data = await res.json();
  return data;
};

export const getAuction = async (auctionId: string | undefined) => {
  if (!auctionId) {
    throw new Error('selectAuction: auctionId가 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction_form`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();

  if (!data) {
    throw new Error('getAuction: 가져올 경매가 없습니다.');
  }

  return data;
};

export const getAddressId = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error('getAddressId: userId가 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses/?user_id=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();

  if (!data) {
    throw new Error('getAddressId: 가져올 addressId가 없습니다.');
  }

  return data;
};

export const postAuction = async (auction: AuctionInsert | undefined): Promise<AuctionRow> => {
  if (!auction) {
    throw new Error('postAuction: auction이 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(auction)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

export const patchAuction = async (
  auctionId: string | undefined,
  auction: AuctionUpdate | undefined
): Promise<AuctionRow> => {
  if (!auctionId && !auction) {
    throw new Error('patchAuction: auctionId와 auction이 없습니다.');
  }

  if (!auctionId) {
    throw new Error('patchAuction: auctionId이 없습니다.');
  }

  if (!auction) {
    throw new Error('patchAuction: auction이 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(auction)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
