import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  children: React.ReactNode;
  variant?: 'base' | 'ghost' | 'accent' | 'primary';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  order?: 'left' | 'center' | 'right';
}

const PageTitle = ({
  children,
  className = '',
  as = 'h2',
  variant = 'base',
  size = 'xl',
  order = 'center'
}: PageTitleProps) => {
  const Component = as;

  const variantClasses = {
    base: 'text-(--color-text-base)',
    ghost: 'text-(--color-warm-gray)',
    accent: 'text-(--color-accent)',
    primary: 'text-(--color-primary)'
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl'
  };

  const textOrder = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <Component
      className={twMerge(`font-bold ${textOrder[order]} ${textSize[size]} ${variantClasses[variant]}`, className)}
    >
      {children}
    </Component>
  );
};

export default PageTitle;
