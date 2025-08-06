import type { AuctionRow, EpisodeRow } from 'src/shared/supabase/types';

export type EpisodeWithAuction = EpisodeRow & {
  auctions: Pick<AuctionRow, 'title' | 'status'> | null;
};

export type EpisodesContainerProps = {
  episodes?: EpisodeWithAuction[];
  currentTab?: string;
};

export type MyEpisodeListItemProps = {
  episode: EpisodeWithAuction;
  currentTab?: string;
};
