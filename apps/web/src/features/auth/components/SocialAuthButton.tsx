import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface SocialAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SocialAuthButton = ({ children, ...props }: SocialAuthButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default SocialAuthButton;
