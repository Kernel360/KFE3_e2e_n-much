import AuctionBaseCardSkeleton from 'src/features/auction/skeleton/card/AuctionBaseCardSkeleton';
import AuctionSectionHeaderSkeleton from 'src/features/auction/skeleton/common/AuctionSectionHeaderSkeleton';

const EndingSoonListSectionSkeleton = () => {
  return (
    <>
      <div className="overflow-hidden">
        <AuctionSectionHeaderSkeleton />
        <ul className="flex w-max gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <AuctionBaseCardSkeleton key={i} className="w-[70%] flex-shrink-0 sm:w-[372px]" />
          ))}
        </ul>
      </div>
    </>
  );
};

export default EndingSoonListSectionSkeleton;
