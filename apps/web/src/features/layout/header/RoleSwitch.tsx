'use client';
import { useEffect, useState } from 'react';
import { useAuthActions, useUserState } from 'src/entities/auth/stores/useAuthStore';
import RoleSwitchSkeleton from 'src/features/layout/header/skeleton/RoleSwitchSkeleton';
import type { ROLE_CONFIG } from 'src/entities/user/mypage/main/constants';

interface RoleSwitchProps {
  leftText?: string;
  rightText?: string;
  className?: string;
}

interface ButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const RoleSwitch = ({ leftText = '입찰참여자', rightText = '경매진행자', className = '' }: RoleSwitchProps) => {
  const user = useUserState();
  const { updateUserRole } = useAuthActions();
  const currentRole = user ? ((user.role || 'buyer') as keyof typeof ROLE_CONFIG) : 'buyer';
  const [value, setValue] = useState(false);
  const [isRoleLoaded, setIsRoleLoaded] = useState(false);

  // 사용자 역할에 따른 토글 상태 동기화
  useEffect(() => {
    if (!user || !user.role || !['buyer', 'seller'].includes(user.role)) {
      setIsRoleLoaded(false);
      setValue(false);
      return;
    }

    const isAuctioneer = currentRole === 'seller';
    setValue(isAuctioneer);
    setIsRoleLoaded(true);
  }, [currentRole, user]);

  if (!user || !isRoleLoaded || !user.role || !['buyer', 'seller'].includes(user.role)) {
    return <RoleSwitchSkeleton className={className} />;
  }

  const handleRoleChange = (isAuctioneer: boolean) => {
    const newRole = isAuctioneer ? 'seller' : 'buyer';
    updateUserRole(newRole);
  };

  const Button = ({ text, isSelected, onClick }: ButtonProps) => (
    <button
      type="button"
      className={`relative z-10 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 md:text-sm ${
        isSelected ? 'text-white' : 'text-(--color-warm-gray)'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );

  return (
    <div className={className}>
      <div className="bg-(--color-secondary) relative inline-flex items-center rounded-full p-1 transition-all duration-200">
        <div
          className={`${
            value ? 'bg-(--color-accent)' : 'bg-(--color-accent)'
          } absolute top-1 h-[calc(100%-8px)] w-[calc(50%-2px)] rounded-full transition-all duration-300 ease-in-out ${
            value ? 'translate-x-[calc(100%-4px)]' : 'translate-x-0'
          }`}
        />
        <Button text={leftText} isSelected={!value} onClick={() => handleRoleChange(false)} />
        <Button text={rightText} isSelected={value} onClick={() => handleRoleChange(true)} />
      </div>
    </div>
  );
};

export default RoleSwitch;
