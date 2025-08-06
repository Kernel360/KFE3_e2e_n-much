import { LuGift } from 'react-icons/lu';
import BaseCard from 'src/widgets/BaseCard';

const colors = ['bg-(--color-red)', 'bg-(--color-yellow)', 'bg-(--color-green)'];

const FirstSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="animate-float from-(--color-primary) to-(--color-accent) my-8 flex size-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl md:size-32">
          <LuGift className="size-14 text-white md:size-16" />
        </div>
        <div className="animate-pulse-heart bg-(--color-red) absolute -right-2 top-4 flex size-8 items-center justify-center rounded-full">
          <span className="text-sm text-white">🏷️</span>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold leading-tight">마음으로 하는 경매</h1>
      <p className="text-(--color-warm-gray) mb-4 max-w-sm leading-relaxed md:mb-8 md:text-lg">
        커피 한 잔, 식사 한 끼, 그리고 따뜻한 마음.
        <br />
        이제는 사연으로 나누세요.
      </p>
      <BaseCard className="animate-fade-in-scale w-full max-w-sm">
        <ul className="mb-3 flex items-center space-x-3">
          {colors.map((color, index) => (
            <li key={index} className={`${color} size-3 rounded-full`} />
          ))}
        </ul>
        <div className="space-y-3">
          <div className="bg-(--color-light-gray)/20 h-3 w-3/4 rounded" />
          <div className="bg-(--color-secondary) rounded-lg p-3">
            <p className="text-sm font-medium">2인 식사권</p>
            <p className="text-(--color-warm-gray) mt-1 text-xs">로맨틱한 저녁 식사</p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default FirstSlide;
