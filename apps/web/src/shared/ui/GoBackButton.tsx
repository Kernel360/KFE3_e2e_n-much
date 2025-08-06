'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

interface GoBackButtonProps {
  className?: string;
  mode?: 'push' | 'back' | 'smart';
  url?: string;
  fallbackUrl?: string;
  useGroupHover?: boolean;
}

const GoBackButton = ({
  className,
  mode = 'back',
  url = '',
  fallbackUrl,
  useGroupHover = false
}: GoBackButtonProps) => {
  const router = useRouter();
  const iconHoverClass = useGroupHover ? 'group-hover:text-(--color-white)' : 'hover:text-(--color-accent)';

  const handleGoBack = () => {
    // push 모드: 지정된 URL로 이동
    if (mode === 'push' && url) {
      router.push(url);
      return;
    }

    // smart 모드: fallbackUrl이 있으면 우선 사용, 없으면 뒤로가기
    if (mode === 'smart') {
      if (fallbackUrl) {
        router.push(fallbackUrl);
        return;
      }
      router.back();
      return;
    }

    // back 모드
    if (fallbackUrl) {
      router.push(fallbackUrl);
      return;
    }
    router.back();
  };

  return (
    <button onClick={handleGoBack} className={`absolute left-5 top-2/4 -translate-y-2/4 ${className}`}>
      <FaArrowLeft className={`size-4 ${iconHoverClass}`} />
    </button>
  );
};

export default GoBackButton;
