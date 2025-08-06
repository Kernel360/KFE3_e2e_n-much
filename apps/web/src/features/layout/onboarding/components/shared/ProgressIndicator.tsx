import { TOTAL_SLIDES } from 'src/entities/layout/constants';

type ProgressIndicatorProps = {
  currentSlide: number;
};

const getProgressBarClass = (index: number, currentSlide: number) => {
  if (index === currentSlide) return 'bg-(--color-accent) w-8';

  if (index < currentSlide) {
    return 'bg-(--color-primary) w-2';
  }
  return 'bg-(--color-light-gray)/20 w-2';
};

const ProgressIndicator = ({ currentSlide }: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center py-4">
      <ul className="flex space-x-2" aria-label="온보딩 진행상황" role="progressbar">
        {Array.from({ length: TOTAL_SLIDES }, (_, index) => (
          <li
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarClass(index, currentSlide)}`}
            aria-current={index === currentSlide ? 'step' : undefined}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProgressIndicator;
