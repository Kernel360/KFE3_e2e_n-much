'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack} className={`absolute top-2/4 left-5 -translate-y-2/4 ${className}`}>
      <FaArrowLeft className="size-4 hover:text-(--color-accent)" />
    </button>
  );
};

export default GoBackButton;
