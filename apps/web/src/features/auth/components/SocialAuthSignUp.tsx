'use client';
import { toast } from '@repo/ui/components/ui/sonner';
import { FcGoogle } from 'react-icons/fc';
import { IoChatbubble } from 'react-icons/io5';
import { LuArrowRight } from 'react-icons/lu';
import { selectSignUp } from 'src/entities/auth/supabase/client';
import SocialAuthButton from 'src/features/auth/components/SocialAuthButton';
import type { SocialAuthProvider } from 'src/entities/auth/types';

const SocialAuthSignUp = () => {
  const handleSocialSignUp = async (provider: SocialAuthProvider) => {
    try {
      await selectSignUp(provider);
    } catch (error) {
      console.error('소셜 로그인 오류:', error);
      toast.error(
        `로그인 처리 오류: ${error instanceof Error ? error.message : '로그인 처리 과정에서 오류가 발생했습니다.'}`
      );
    }
  };

  const buttonStyle = 'flex w-full items-center justify-center gap-3 rounded-md py-3';

  return (
    <ul className="flex flex-col gap-3">
      <li className="relative">
        <SocialAuthButton
          className={`${buttonStyle} hover:bg-(--color-light-gray)/30 border`}
          onClick={() => handleSocialSignUp('google')}
          aria-label="google로 로그인 하기 버튼"
        >
          <FcGoogle size={25} />
          <span>Google 계정으로 시작</span>
          <LuArrowRight size={18} className="absolute right-4" />
        </SocialAuthButton>
      </li>
      <li className="relative">
        <SocialAuthButton
          className={`${buttonStyle} bg-[#FEE500] hover:bg-[#F6DC00]`}
          onClick={() => handleSocialSignUp('kakao')}
          aria-label="kakao로 로그인 하기 버튼"
        >
          <IoChatbubble size={20} className="-translate-y-0.5" />
          <span>카카오톡으로 시작</span>
          <LuArrowRight size={18} className="absolute right-4" />
        </SocialAuthButton>
      </li>
    </ul>
  );
};

export default SocialAuthSignUp;
