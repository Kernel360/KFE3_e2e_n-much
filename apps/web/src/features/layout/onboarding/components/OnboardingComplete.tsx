import { LuHeart } from 'react-icons/lu';
import PageContainer from 'src/shared/ui/PageContainer';

const OnboardingComplete = () => {
  return (
    <PageContainer className="min-h-screen w-full py-0">
      <section className="animate-fade-in-scale flex min-h-screen flex-col items-center justify-center text-center">
        <div className="animate-pulse-heart from-(--color-primary) via-(--color-accent) to-(--color-primary) mx-auto flex size-28 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl md:size-32">
          <LuHeart className="size-15 translate-y-1 fill-current text-white md:size-20" />
        </div>
        <h1 className="mb-4 mt-8 text-2xl font-bold">
          사연으로 만나는
          <br />
          따뜻한 경매
        </h1>
        <p className="text-(--color-warm-gray) md:text-lg">이제 사연을 나누고 마음을 전해보세요.</p>
      </section>
    </PageContainer>
  );
};

export default OnboardingComplete;
