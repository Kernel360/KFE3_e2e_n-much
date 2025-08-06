'use client';
import { useEffect, useRef } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useAuthActions } from 'src/entities/auth/stores/useAuthStore';
import { upsertUser } from 'src/entities/auth/supabase/client';
import { createClient } from 'src/shared/supabase/client/client';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

const POINT_TRIGGER_DELAY_MS = 1000;

const AuthCallbackPage = () => {
  const router = useRouter();
  const { setUser, setLoading } = useAuthActions();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasProcessed.current) return;

      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth 에러:', error);
          router.replace('/');
          return;
        }

        const user = data.session?.user;

        if (!user?.email) {
          router.replace('/');
          return;
        }

        let completeUser = await upsertUser(user);

        // 신규 사용자이고 포인트가 0이면 트리거 대기
        if (completeUser.point === 0) {
          // 1초 후 다시 조회 (트리거 실행 시간 대기)
          await new Promise((resolve) => setTimeout(resolve, POINT_TRIGGER_DELAY_MS));

          const { data: updatedUserData } = await supabase.from('users').select('*').eq('id', user.id).single();

          if (updatedUserData) {
            completeUser = {
              ...user,
              ...updatedUserData
            };
          }
        }

        setUser(completeUser);
        setLoading(false);

        toast.success('로그인 되었습니다!');
        router.replace('/main');
      } catch (error) {
        console.error('콜백 처리 에러:', error);
        setLoading(false);
        router.replace('/');
      }
    };

    handleCallback();
  }, [router, setUser, setLoading]);

  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <LoadingSpinner size="lg" className="mb-4" />
      <p>Nice to VID You!</p>
    </section>
  );
};

export default AuthCallbackPage;
