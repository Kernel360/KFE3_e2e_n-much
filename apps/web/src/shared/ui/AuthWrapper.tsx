'use client';
import { notFound } from 'next/navigation';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/useAuthStore';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useUserState();
  const loading = useUserLoadingState();

  if (loading) return <div>로딩 중...</div>;
  if (!user) notFound();

  return <>{children}</>;
};

export default AuthWrapper;
