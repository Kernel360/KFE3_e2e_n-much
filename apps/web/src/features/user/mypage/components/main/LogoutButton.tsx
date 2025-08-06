'use client';

import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { signOut } from 'src/entities/user/mypage/main/supabase';
import ConfirmDialog from 'src/widgets/ConfirmDialog';
import { twMerge } from 'tailwind-merge';

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('로그아웃 되었습니다!');
      push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '로그아웃 실패');
    }
  };

  return (
    <div className={twMerge('text-(--color-warm-gray) my-4 flex items-center justify-center', className)}>
      <ConfirmDialog title="로그아웃 확인" description="정말로 로그아웃하시겠습니까?" onConfirm={handleLogout}>
        <Button variant="ghost" className="hover:bg-transparent">
          로그아웃
        </Button>
      </ConfirmDialog>
    </div>
  );
};

export default LogoutButton;
