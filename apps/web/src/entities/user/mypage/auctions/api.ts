export const getUserAuctions = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/auctions?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

// 사용자의 관심 경매 목록과 해당 경매의 사연 갯수 조회 (getAuctionCardList 참고) - KSH
export const getUserFavoriteAuctions = async ({
  order,
  pageParam,
  userId
}: {
  order: string | undefined;
  pageParam: number | undefined;
  userId: string | undefined;
}) => {
  if (!order && pageParam === undefined && !userId) {
    throw new Error('getUserFavoriteAuctions: order와 pageParamr과 userId가 없습니다.');
  }

  if (!order) {
    throw new Error('getUserFavoriteAuctions: order가 없습니다.');
  }

  if (pageParam === undefined) {
    throw new Error('getUserFavoriteAuctions: pageParam이 없습니다.');
  }

  if (!userId) {
    throw new Error('getUserFavoriteAuctions: userId가 없습니다.');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/auctions/favorites?order=${order}&page=${pageParam}&userId=${userId}`
  );

  if (!res.ok) {
    throw new Error('관심 경매 목록과 해당 경매의 사연 갯수 조회 실패');
  }

  const data = await res.json();
  return data;
};

// 사용자의 관심 경매 갱신(추가/삭제) - KSH
export const postUserFavoriteAuction = async ({
  auctionId,
  updatedFavorites
}: {
  auctionId: string;
  updatedFavorites: string[];
}) => {
  if (!auctionId) {
    throw new Error('postFavorite: auctionId가 없습니다.');
  }

  if (!updatedFavorites) {
    throw new Error('postFavorite: updatedFavorites가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/favorites`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ auctionId, updatedFavorites })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
