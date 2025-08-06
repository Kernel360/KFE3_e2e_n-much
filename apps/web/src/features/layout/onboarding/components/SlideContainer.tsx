import FirstSlide from 'src/features/layout/onboarding/components/slides/FirstSlide';
import SecondSlide from 'src/features/layout/onboarding/components/slides/SecondSlide';
import ThirdSlide from 'src/features/layout/onboarding/components/slides/ThirdSlide';

type SlideContainerProps = {
  current: number;
};

const slides = [FirstSlide, SecondSlide, ThirdSlide];

const SlideContainer = ({ current }: SlideContainerProps) => {
  const CurrentSlide = slides[current]!;
  return (
    <div className="flex flex-1 flex-col">
      <CurrentSlide />
    </div>
  );
};

export default SlideContainer;
