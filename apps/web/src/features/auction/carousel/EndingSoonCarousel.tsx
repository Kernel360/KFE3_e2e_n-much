'use client';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import type { SortedAuctionItemType } from 'src/entities/auction/types';

const EndingSoonCarousel = ({
  endingSoonAuctions,
  from
}: {
  endingSoonAuctions: SortedAuctionItemType[];
  from?: string;
}) => {
  return (
    <ul>
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {endingSoonAuctions!.map((auction) => (
            <CarouselItem key={auction.auction_id} className="basis-4/5 pl-4 sm:basis-3/5">
              <AuctionCard
                auctionId={auction.auction_id}
                imageSrc={auction.image_urls[0]}
                title={auction.title}
                endDate={auction.end_date}
                episodeCount={auction.episodes?.length ?? 0}
                favoriteCount={auction.favorites?.length ?? 0}
                from={from}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ul>
  );
};

export default EndingSoonCarousel;
