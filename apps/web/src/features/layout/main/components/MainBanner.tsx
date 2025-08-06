'use client';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { BANNER_DATA } from 'src/entities/layout/constants';
import type { CarouselApi } from '@repo/ui/components/ui/carousel';

const MainBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateState = (api: CarouselApi) => {
      setCount(api!.scrollSnapList().length);
      setCurrent(api!.selectedScrollSnap());
    };

    // 첫 로드 시 상태를 한 번 설정
    updateState(api);
    api.on('select', updateState);

    // eslint-disable-next-line consistent-return
    return () => {
      api.off('select', updateState);
    };
  }, [api]);

  return (
    <section className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
      >
        <CarouselContent className="-ml-0">
          {BANNER_DATA.map((item) => (
            <CarouselItem key={item.alt} className="pl-0">
              <div
                className={`flex h-80 w-full flex-col items-center justify-center md:h-64 md:flex-row ${item.backgroundColor}`}
              >
                <div className={`my-5 font-semibold md:w-2/4 ${item.textStyle}`}>
                  <h2 className="text-2xl">{item.title}</h2>
                  <h3 className="text-xl">{item.subTitle}</h3>
                </div>
                <div className={`relative md:w-2/4 ${item.imageStyle}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 space-x-2 transition-transform">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api!.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-4 bg-white' : 'bg-(--color-light-gray) w-2'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
};

export default MainBanner;
