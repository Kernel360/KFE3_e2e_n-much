'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from 'src/entities/layout/hooks/useOnboarding';
import OnboardingComplete from 'src/features/layout/onboarding/components/OnboardingComplete';
import ProgressIndicator from 'src/features/layout/onboarding/components/shared/ProgressIndicator';
import SkipButton from 'src/features/layout/onboarding/components/shared/SkipButton';
import SlideButtons from 'src/features/layout/onboarding/components/shared/SlideButtons';
import SlideContainer from 'src/features/layout/onboarding/components/SlideContainer';
import PageContainer from 'src/shared/ui/PageContainer';

const REDIRECT_DELAY_MS = 2000;

const OnboardingPage = () => {
  const router = useRouter();
  const { currentSlide, prevSlide, nextSlide, skipIntro, isSkipped } = useOnboarding();

  useEffect(() => {
    if (!isSkipped) return;

    const timer = setTimeout(() => {
      router.push('/auth/signup');
    }, REDIRECT_DELAY_MS);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [isSkipped, router]);

  if (isSkipped) return <OnboardingComplete />;

  return (
    <PageContainer className="min-h-screen w-full py-0">
      <section className="flex min-h-screen flex-col">
        <SkipButton onSkip={skipIntro} />
        <ProgressIndicator currentSlide={currentSlide} />
        <SlideContainer current={currentSlide} />
        <SlideButtons prev={prevSlide} current={currentSlide} next={nextSlide} />
      </section>
    </PageContainer>
  );
};

export default OnboardingPage;
