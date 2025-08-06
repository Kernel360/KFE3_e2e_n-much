'use client';

import { useState } from 'react';
import { CarouselItem } from '@repo/ui/components/ui/carousel';
import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/noAuctionImage.png';

const AuctionDetailCarouselCard = ({ url, index }: { url: string; index: number }) => {
  const [imgSrc, setImgSrc] = useState(url);

  return (
    <CarouselItem className="h-64 w-full">
      <div className="relative h-full w-full">
        <Image
          src={imgSrc}
          alt={`경매 이미지 ${index + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 700px, 50vw"
          priority
          onError={() => setImgSrc(NotAuctionImage.src)}
        />
      </div>
    </CarouselItem>
  );
};

export default AuctionDetailCarouselCard;
