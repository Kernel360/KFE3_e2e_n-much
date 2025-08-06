import { LuPenTool, LuHeart } from 'react-icons/lu';
import { SAMPLE_STORIES } from 'src/entities/layout/constants';
import BaseCard from 'src/widgets/BaseCard';

const ANIMATION_DELAY_MULTIPLIER = 0.1;
const MOBILE_VISIBLE_ITEMS = 2;

const getMobileHiddenClass = (index: number) => (index >= MOBILE_VISIBLE_ITEMS ? 'max-md:hidden' : '');

const SecondSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <div className="animate-float from-(--color-accent) to-(--color-primary) flex size-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl md:mb-4 md:size-32">
          <LuPenTool className="size-14 text-white md:size-16" />
        </div>
        <div className="animate-pulse-heart bg-(--color-primary) absolute -right-2 -top-4 flex size-8 items-center justify-center rounded-full">
          <span className="text-sm text-white">📝</span>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold leading-tight">사연으로 입찰하세요</h1>
      <p className="text-(--color-warm-gray) mb-4 max-w-sm leading-relaxed md:mb-8 md:text-lg">
        왜 필요한지 이야기해 주세요.
        <br />
        <em className="text-(--color-accent)">&quot;엄마 생신이라...&quot;</em>
      </p>
      <ul className="w-full max-w-sm space-y-3 text-sm">
        {SAMPLE_STORIES.map((item, index) => (
          <BaseCard
            key={index}
            className={`animate-fade-in-scale p-4 ${getMobileHiddenClass(index)}`}
            style={{ animationDelay: `${index * ANIMATION_DELAY_MULTIPLIER}s` }}
          >
            <p className="mb-2 leading-relaxed">{item.story}</p>
            <div className="flex items-center justify-between text-xs">
              <p className="text-(--color-warm-gray)">{item.name}</p>
              <div className="bg-(--color-red)/10 text-(--color-red) flex items-center gap-1 rounded-full px-3 py-1">
                <div className="flex items-center gap-1">
                  <LuHeart className="size-3 fill-current" />
                  <span>좋아요</span>
                </div>
                <span>{item.likes}</span>
              </div>
            </div>
          </BaseCard>
        ))}
      </ul>
    </div>
  );
};

export default SecondSlide;
