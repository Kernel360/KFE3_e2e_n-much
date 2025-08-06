//ANCHOR - episode list
export const episodesListKeys = {
  all: ['episodes'] as const,
  item: ({ auctionId, page }: { auctionId: string | null; page: number }) =>
    auctionId ? ([...episodesListKeys.all, auctionId, page] as const) : []
};

//ANCHOR - episode user의 보유 포인트
export const USER_BID_POINT_AMOUNT_KEY = 'userBidPointAmount';

//ANCHOR - 사연에 대한 경매 참여자(Buyer)의 총입찰 포인트
export const USER_TOTAL_BID_POINT_AMOUNT_KEY = 'userTotalBidPoint';
