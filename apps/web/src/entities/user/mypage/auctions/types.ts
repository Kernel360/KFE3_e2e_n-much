import type { AuctionRow } from 'src/shared/supabase/types';

export type AuctionsContainerProps = {
  auctions?: AuctionRow[];
  currentTab?: string;
};

export type MyAuctionListItemProps = {
  auction: AuctionRow;
  currentTab?: string;
};
