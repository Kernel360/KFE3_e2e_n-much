import { formatNumber } from 'src/shared/utils/formatNumber';
import { twMerge } from 'tailwind-merge';

type PointDisplayProps = {
  amount: number;
  className?: string;
};

const PointDisplay = ({ amount, className = '' }: PointDisplayProps) => {
  const baseStyle = 'text-(--color-accent) inline-flex items-center gap-0.5 font-bold';

  return (
    <span className={twMerge(baseStyle, className)}>
      {formatNumber(amount)}
      <em className="not-italic">P</em>
    </span>
  );
};

export default PointDisplay;
