import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import Image from 'next/image';
import DefaultAvatar from 'src/assets/images/avatarDefault.svg';
import { twMerge } from 'tailwind-merge';

type BaseAvatarProps = {
  src: string;
  alt: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizes = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14'
};

const BaseAvatar = ({ src, alt, size, className }: BaseAvatarProps) => {
  return (
    <Avatar className={twMerge(sizes[size], className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        <Image src={DefaultAvatar} alt={alt || '유저 이미지'} />
      </AvatarFallback>
    </Avatar>
  );
};

export default BaseAvatar;
