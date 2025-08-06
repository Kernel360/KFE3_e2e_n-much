import Image from 'next/image';
import MascotImage from 'src/assets/images/mascot.webp';
import PageTitle from 'src/shared/ui/PageTitle';
import { twMerge } from 'tailwind-merge';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  imageSize?: number;
}

// 컴포넌트 위치 변경됐을 경우, 처리
const DEFAULT_IMAGE_SIZE = 60;

const EmptyState = ({ title, description, icon, imageSize = DEFAULT_IMAGE_SIZE, className }: EmptyStateProps) => {
  return (
    <div className={twMerge('flex flex-col items-center gap-3 text-center', className)}>
      {icon || <Image src={MascotImage} alt="에러가 발생했습니다." width={imageSize} className="h-auto" />}
      <PageTitle as="h3" className="text-lg font-medium">
        {title}
      </PageTitle>
      {description && <p className="text-(--color-warm-gray) text-sm">{description}</p>}
    </div>
  );
};

export default EmptyState;
