import Image from 'next/image';
import { MdOutlineInfo } from 'react-icons/md';
import { RiShieldCheckLine } from 'react-icons/ri';
import Logo from 'src/assets/images/logo.svg';
import SocialAuthSignUp from 'src/features/auth/components/SocialAuthSignUp';
import BaseCard from 'src/widgets/BaseCard';

const SignUpPage = () => {
  return (
    <section className="w-full">
      <div>
        <Image src={Logo} alt="logo" className="mx-auto block size-20" />
        <h2 className="text-xl">당신의 가치를 Vidding</h2>
      </div>
      <BaseCard as="div" className="p-15 m-auto mb-8 mt-10 w-full max-w-md px-4 pb-10">
        <p className="text-2xl font-semibold">환영합니다! 👋</p>
        <p className="mb-8 mt-2 text-sm opacity-60">소셜 계정으로 빠르게 시작해 보세요</p>
        <SocialAuthSignUp />
        <div className="mt-6 flex items-start justify-center gap-3 rounded-xl p-4">
          <RiShieldCheckLine size={20} className="text-(--color-green) translate-y-0.5" />
          <div>
            <p className="mb-1 flex text-sm">안전한 로그인</p>
            <p className="text-xs opacity-60">개인정보는 암호화되어 안전하게 보호됩니다.</p>
          </div>
        </div>
      </BaseCard>
      <div>
        <p className="mb-1 flex items-center justify-center gap-2 text-sm">
          <MdOutlineInfo size={15} className="text-(--color-accent)" />
          로그인 시 자동으로 회원가입됩니다
        </p>
        <p className="text-(--color-warm-gray) text-xs">
          계속 진행하시면 개인정보 보호정책 및 서비스 약관에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
