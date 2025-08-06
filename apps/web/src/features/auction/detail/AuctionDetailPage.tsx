import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import AuctionDetailInfo from 'src/features/auction/AuctionDetailInfo';
import AuctionDetailNavbar from 'src/features/auction/AuctionDetailNavbar';
import BidderRankingInfoSection from 'src/features/auction/BidderRankingInfoSection';
import AuctionDetailCarousel from 'src/features/auction/carousel/AuctionDetailCarousel';
import ClosedAuctionOverlay from 'src/features/auction/detail/components/ClosedAuctionOverlay';
import SellerInfoSection from 'src/features/auction/SellerInfoSection';
import EpisodeDetailSection from 'src/features/episode/EpisodeDetailSection';
import PageContainer from 'src/shared/ui/PageContainer';
import GoTopButton from 'src/shared/utils/goTopButton';

interface AuctionDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AuctionDetailPage = async ({ params, searchParams }: AuctionDetailPageProps) => {
  const { id: auctionId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  //경매 상품 및 경매 업체 정보
  const auctionInfo = await getAuctionInfoWithAddress(auctionId);
  const isClosed = auctionInfo.status === 'CLOSED';

  return (
    <>
      <div className="relative">
        {/* 상단 네비게이션 */}
        <AuctionDetailNavbar auctionId={auctionId} searchParams={resolvedSearchParams} />
        {/* 이미지 슬라이더 */}
        <AuctionDetailCarousel imageUrls={auctionInfo.image_urls} />
      </div>
      <PageContainer>
        <div className="-translate-y-3">
          {/* 경매 상품 정보 */}
          <AuctionDetailInfo auctionId={auctionId} />
          {/* 판매자 정보 */}
          <SellerInfoSection auctionId={auctionId} />
          {/* 입찰자 랭킹 정보 */}
          <BidderRankingInfoSection auctionId={auctionId} />
          {/* 사연 섹션 */}
          <EpisodeDetailSection auctionId={auctionId} />
        </div>
        <GoTopButton />
        {isClosed && <ClosedAuctionOverlay />}
      </PageContainer>
    </>
  );
};

export default AuctionDetailPage;
