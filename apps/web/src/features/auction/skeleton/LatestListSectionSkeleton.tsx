import AuctionLatestCardSkeleton from 'src/features/auction/skeleton/card/AuctionLatestCardSkeleton';
import AuctionSectionHeaderSkeleton from 'src/features/auction/skeleton/common/AuctionSectionHeaderSkeleton';

const LatestListSectionSkeleton = () => {
  return (
    <>
      <AuctionSectionHeaderSkeleton className="mt-8" />
      <ul className="flex flex-col divide-y">
        {Array.from({ length: 3 }).map((_, i) => (
          <AuctionLatestCardSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};

export default LatestListSectionSkeleton;
