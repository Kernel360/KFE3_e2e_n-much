import { ADDRESS_ID_QUERY_KEY, AUCTION_FORM_QUERY_KEY, AUCTION_LIST_QUERY_KEY } from 'src/entities/auction/constants';

//NOTE - auctionForm에 들어갈 데이터를 가져오는데 사용
export const auctionFormKeys = {
  all: [AUCTION_FORM_QUERY_KEY] as const,
  item: (auctionId: string) => [...auctionFormKeys.all, auctionId] as const
};

//NOTE - addressId를 가져올 때 사용
export const addressIdKeys = {
  all: [ADDRESS_ID_QUERY_KEY] as const,
  item: (userId: string) => [...addressIdKeys.all, userId] as const
};

//NOTE - auctionList를 가져올 때 사용
export const auctionListKeys = {
  all: [AUCTION_LIST_QUERY_KEY] as const,
  order: (order: string) => [...auctionListKeys.all, order] as const,
  keyword: (order: string, keyword: string | undefined) =>
    keyword ? ([...auctionListKeys.order(order), keyword] as const) : ([...auctionListKeys.order(order)] as const)
};
