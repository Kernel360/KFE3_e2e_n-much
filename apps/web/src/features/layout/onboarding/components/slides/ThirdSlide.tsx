import { LuTrophy, LuHeart, LuSparkles, LuUsers } from 'react-icons/lu';
import BaseCard from 'src/widgets/BaseCard';

const ThirdSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative md:mb-4">
        <div className="animate-float from-(--color-green) to-(--color-primary) mb-4 flex size-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl md:size-32">
          <LuTrophy className="md:size-15 size-13 text-white" />
        </div>
        <div className="animate-pulse-heart bg-(--color-green) absolute -right-2 -top-4 flex size-8 items-center justify-center rounded-full">
          <span className="text-sm text-white">🎉</span>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold leading-tight">좋아요로 낙찰 결정</h1>
      <p className="text-(--color-warm-gray) mb-4 max-w-sm leading-relaxed md:mb-8 md:text-lg">
        가장 많은 공감을 받은 사연이 낙찰됩니다.
        <br />
        <span className="text-(--color-accent) font-medium">좋아요는 포인트로 눌러요.</span>
      </p>
      <div className="w-full max-w-sm">
        <BaseCard className="animate-fade-in-scale border-(--color-green) relative border-2">
          <div className="bg-(--color-green) absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full">
            <LuSparkles className="size-5 text-white" />
          </div>
          <div className="mb-2 flex items-center">
            <LuTrophy className="text-(--color-green) mr-2 size-5" />
            <span className="text-(--color-green) text-sm font-bold">낙찰!</span>
          </div>
          <p className="mb-2 text-sm leading-relaxed">
            &quot;엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요. 아버지가 돌아가신 후 마음이... &quot;
          </p>
          <div className="flex items-center justify-between text-xs">
            <p className="text-(--color-warm-gray)">김OO님</p>
            <div className="flex items-center">
              <LuHeart className="text-(--color-red) mr-1 size-4 fill-current" />
              <span className="font-bold">47개</span>
            </div>
          </div>
        </BaseCard>
        <div className="bg-(--color-accent)/10 mt-4 rounded-lg p-3">
          <div className="text-(--color-accent) flex items-center justify-center text-sm">
            <LuUsers className="mr-2 size-4" />
            <span>일반 유저 &#43; 판매자 좋아요 &#61; 총점</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThirdSlide;
