import AuctionDetailPage from 'src/features/auction/detail/AuctionDetailPage';

interface AuctionDetailProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AuctionDetail = async ({ params, searchParams }: AuctionDetailProps) => {
  return (
    <>
      <AuctionDetailPage params={params} searchParams={searchParams} />
    </>
  );
};

export default AuctionDetail;
