import { Button } from '@repo/ui/components/ui/button';
import { LuChevronRight } from 'react-icons/lu';
import { FIRST_SLIDE_INDEX, LAST_SLIDE_INDEX } from 'src/entities/layout/constants';

type SlideButtonsProps = {
  prev: () => void;
  current: number;
  next: () => void;
};

const SlideButtons = ({ prev, current, next }: SlideButtonsProps) => {
  return (
    <div className="flex items-center justify-between py-6">
      <Button
        variant="ghost"
        size="lg"
        onClick={prev}
        disabled={current === FIRST_SLIDE_INDEX}
        className="text-(--color-warm-gray) hover:text-(--color-accent) disabled:opacity-30"
      >
        이전
      </Button>
      <Button
        onClick={next}
        size="lg"
        className="bg-(--color-accent) hover:bg-(--color-accent)/90 rounded-xl text-white shadow-lg"
      >
        {current === LAST_SLIDE_INDEX ? '시작하기' : '다음'} <LuChevronRight className="ml-2 size-5" />
      </Button>
    </div>
  );
};

export default SlideButtons;
