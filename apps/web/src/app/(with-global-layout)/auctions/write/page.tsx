import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchAuctionById } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
import PageHeader from 'src/shared/PageHeader';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { auction_id } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auctionForm'],
    queryFn: () => fetchAuctionById(auction_id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader>{auction_id ? '경매 수정' : '경매 등록'}</PageHeader>
      <AuctionForm auctionIdParam={auction_id} />
    </HydrationBoundary>
  );
}
