import AuctionPopularCardSkeleton from 'src/features/auction/skeleton/card/AuctionPopularCardSkeleton';
import AuctionSectionHeaderSkeleton from 'src/features/auction/skeleton/common/AuctionSectionHeaderSkeleton';

const PopularListSectionSkeleton = () => {
  return (
    <>
      <AuctionSectionHeaderSkeleton className="mt-8" />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <AuctionPopularCardSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};

export default PopularListSectionSkeleton;
