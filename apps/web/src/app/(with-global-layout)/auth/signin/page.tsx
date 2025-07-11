'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { getAuthInfo, socialSignin, upsertAuthInfo, getExistsUser, getAuthLogout } from 'src/entities/auth/supabase';
import { useUserStore } from 'src/entities/auth/stores/UserStore';
import { toast } from '@repo/ui/components/ui/sonner';
import type { Role, Provider } from '../../../../entities/auth/types';
import { AuthCard } from 'src/features/auth/AuthCard';
import { LoadingSpinner } from 'src/features/auth/LoadingSpinner';

export default function SigninPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUserStore();

  // 리디렉션됐을 때, storeUserInfo()의 중복호출을 막기 위해서 null로 초기화.
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (selectedRole: string) => {
    if (selectedRole === 'BUYER' || selectedRole === 'SELLER') {
      setRole(selectedRole);
      localStorage.setItem('role', selectedRole);
    }
  };

  const handleSocialSignin = async (provider: Provider) => {
    await socialSignin({ provider: provider, redirectTo: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signin` });
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      setRole('BUYER');
      return;
    }
    if (savedRole === 'BUYER' || savedRole === 'SELLER') setRole(savedRole);
  }, []);

  useEffect(() => {
    console.log('role: ', role);
  }, [role]);

  useEffect(() => {
    setIsLoading(false);
    if (!searchParams.get('code')) return;
    setIsLoading(true);
    if (!role) return;
    const storeSocialInfo = async () => {
      try {
        let userInfo;
        let userRole = role;

        // auth에서 유저 정보 가져오기
        const authInfo = await getAuthInfo();
        if (!authInfo) return;

        // 테이블에 저장된 유저 정보 가져오기
        const savedUser = await getExistsUser(authInfo.id);

        // 새로운 유저라면 DB에 저장
        if (!savedUser) {
          const newUserInfo = await upsertAuthInfo(role, authInfo);
          userInfo = newUserInfo;
        }
        if (savedUser) {
          // 저장된 유저 정보의 role이 현재 role과 다른 경우
          if (savedUser.role !== role) {
            userRole = savedUser.role;
            if (!confirm(`${savedUser.role}로 저장된 사용자입니다. 로그인 하시겠습니까?`)) {
              const res = await getAuthLogout();
              if (res.success) console.log('auth 쿠키 삭제 완료');
              router.replace('/auth/signin');
              return;
            }
          }
          userInfo = savedUser.info;
        }

        // store에 저장
        if (userInfo) setUser(userInfo, userRole);

        toast.success('소셜 로그인 성공!');
        router.replace('/main');
      } catch (error) {
        console.error(error);
        toast.error('소셜 로그인 실패!');
      }
    };

    storeSocialInfo();
  }, [searchParams, role, router, setUser]);

  return (
    <>
      {!isLoading ? (
        role !== null && (
          <AuthCard title="로그인" role={role} onTabChange={handleTabChange} onSocialSignin={handleSocialSignin} />
        )
      ) : (
        <LoadingSpinner size={48} color="#8E74F9" />
      )}
    </>
  );
}
