import AuctionFormPage from 'src/features/auction/form/page/AuctionFormPage';
import type { AuctionMutationPageProps } from 'src/entities/auction/types';

const AuctionMutationPage = async ({ searchParams }: AuctionMutationPageProps) => {
  const { auction_id: auctionIdParam } = await searchParams;

  return <AuctionFormPage auctionId={auctionIdParam} />;
};

export default AuctionMutationPage;
