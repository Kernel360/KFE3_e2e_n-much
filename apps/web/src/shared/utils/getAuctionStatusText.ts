export const AUCTION_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
} as const;

export const getAuctionStatusText = (status: string) => {
  switch (status) {
    case AUCTION_STATUS.OPEN:
      return '진행중';
    case AUCTION_STATUS.CLOSED:
      return '종료됨';
    default:
      return '알 수 없음';
  }
};

export const getAuctionStatusVariant = (status: string) => {
  switch (status) {
    case AUCTION_STATUS.OPEN:
      return 'accent';
    case AUCTION_STATUS.CLOSED:
      return 'lightGray';
    default:
      return 'lightGray';
  }
};
