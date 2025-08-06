'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useAuthActions, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { selectUser } from 'src/entities/auth/supabase/client';
import { createClient } from 'src/shared/supabase/client/client';
import type { AuthChangeEvent, User, Session } from '@supabase/supabase-js';

const FETCH_COOLDOWN_MS = 3000; // 3초 쿨다운
const RETRY_DELAY_MS = 500; // 재시도 지연 시간

const AuthProvider = ({ user: initialUser, children }: { user: User | null; children: ReactNode }) => {
  const currentUser = useUserState();
  const { setUser, setLoading } = useAuthActions();
  const supabase = createClient();
  const initialAuthRef = useRef(false);

  const lastFetchTimeRef = useRef(0);
  const retryUserProfileRef = useRef<NodeJS.Timeout | null>(null);

  // 초기 유저 설정
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setLoading(false);
    } else if (!initialUser && !currentUser) {
      setUser(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser, setUser, setLoading]);

  // 초기 렌더링 시 즉시 light 모드 보장
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'seller') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 다크모드 상태 관리 (유저 role 기반)
  useEffect(() => {
    if (currentUser?.role === 'seller') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentUser?.role]);

  // authenticated 상태 감지 시 재시도 로직
  useEffect(() => {
    // role이 없거나 기본값인 경우 프로필 재조회 시도
    if (currentUser && (!currentUser.role || currentUser.role === 'authenticated')) {
      // 기존 타이머 클리어
      if (retryUserProfileRef.current) {
        clearTimeout(retryUserProfileRef.current);
      }

      // 재시도 (users 테이블 upsert 완료 대기)
      retryUserProfileRef.current = setTimeout(async () => {
        try {
          const userData = await selectUser(currentUser.id);
          if (userData?.role) {
            const completeUser = { ...currentUser, ...userData };
            setUser(completeUser);
          }
        } catch (error) {
          console.error('프로필 재시도 실패:', error);
        }
      }, RETRY_DELAY_MS);
    }

    return () => {
      if (retryUserProfileRef.current) {
        clearTimeout(retryUserProfileRef.current);
      }
    };
  }, [currentUser, setUser]);

  // 페이지 포커스 시 세션 재확인 (디바운싱 적용)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        const now = Date.now();

        // 디바운싱: 일정 시간 이내 요청은 무시
        if (now - lastFetchTimeRef.current < FETCH_COOLDOWN_MS) {
          return;
        }

        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (session?.user && (!currentUser || currentUser.id !== session.user.id)) {
          try {
            const userData = await selectUser(session.user.id);
            const completeUser = userData ? { ...session.user, ...userData } : session.user;
            setUser(completeUser);
            lastFetchTimeRef.current = now;
          } catch (error) {
            console.error('유저 프로필 조회 실패:', error);
            setUser(session.user);
            lastFetchTimeRef.current = now;
          }
        } else if (!session?.user && currentUser) {
          setUser(null);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [currentUser, setUser, supabase]);

  // Auth state change 리스너
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!initialAuthRef.current && event === 'SIGNED_IN') {
        initialAuthRef.current = true;
        return;
      }

      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, supabase]);

  return <>{children}</>;
};

export default AuthProvider;
