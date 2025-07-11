// 'use client';
// import ConfirmDialog from 'src/components/common/ui/ConfirmDialog';
// import { toast } from '@repo/ui/components/ui/sonner';
// import { Button } from '@repo/ui/components/ui/button';
// import { fetchLogout } from 'src/lib/queries/auth';
// import { twMerge } from 'tailwind-merge';
// import { useRouter } from 'next/navigation';

// interface LogoutButtonProps {
//   className?: string;
// }

// const LogoutButton = ({ className }: LogoutButtonProps) => {
//   const { push } = useRouter();

//   const handleLogout = async () => {
//     try {
//       await fetchLogout();

//       toast.success('로그아웃 되었습니다!');
//       push('/');
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : '로그아웃 실패');
//     }
//   };

//   return (
//     <div className={twMerge('text-(--color-warm-gray) my-4 flex items-center justify-center', className)}>
//       <ConfirmDialog title="로그아웃 확인" description="정말로 로그아웃하시겠습니까?" onConfirm={handleLogout}>
//         <Button variant="ghost" className="hover:bg-transparent">
//           로그아웃
//         </Button>
//       </ConfirmDialog>
//     </div>
//   );
// };

// export default LogoutButton;
