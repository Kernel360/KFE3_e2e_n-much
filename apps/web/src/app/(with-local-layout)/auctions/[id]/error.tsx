'use client';

import { startTransition, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const handleErrorOnClick = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <>
      <>
        <div className="flex h-[70vh] min-h-screen flex-col items-center justify-center px-4 text-center">
          <h2 className="text-(--color-red) mb-4 text-2xl font-bold">문제가 발생했어요 😢</h2>
          <p className="text-(--color-warm-gray) mb-6 text-sm">
            알 수 없는 오류가 발생했습니다. 새로고침하거나 이전 페이지로 돌아가보세요.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" type="button" onClick={() => router.back()} className="w-30 h-10">
              이전 페이지
            </Button>
            <Button variant="inActive" type="submit" className="w-30 h-10 flex-1" onClick={handleErrorOnClick}>
              다시 시도
            </Button>
          </div>
        </div>
      </>
    </>
  );
};

export default Error;
