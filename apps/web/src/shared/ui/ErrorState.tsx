import { Button } from '@repo/ui/components/ui/button';
import { FaExclamationTriangle } from 'react-icons/fa';
import PageTitle from 'src/shared/ui/PageTitle';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

const ErrorState = ({
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해주세요',
  onRetry,
  retryButtonText = '다시 시도'
}: ErrorStateProps) => {
  return (
    <div className="mt-24 flex flex-col items-center gap-3 text-center">
      <FaExclamationTriangle className="text-(--color-red) text-4xl" />
      <PageTitle as="h3" className="text-lg font-medium">
        {title}
      </PageTitle>
      {description && <p className="text-(--color-warm-gray) text-sm">{description}</p>}
      {onRetry && (
        <Button variant="base" onClick={onRetry}>
          {retryButtonText}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
