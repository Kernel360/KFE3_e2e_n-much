// import Link from 'next/link';
// import ListCard from '../../../../../__components/common/ui/ListCard';
// import { Button } from '@repo/ui/components/ui/button';
// import { MdInfoOutline, MdLightbulb } from 'react-icons/md';
// import { useGetUserBiddingCount } from 'src/features/user/queries/useEpisodes';
// import type { MenuRoleProps } from 'src/features/user/mypage/types';

// const MyPageNotification = ({ role }: MenuRoleProps) => {
//   const { data: biddingCount = 0 } = useGetUserBiddingCount();

//   return (
//     <ListCard as="section" className="mt-6 w-full">
//       <div className="mb-3 flex items-center gap-3">
//         <div className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">
//           {role === 'BUYER' ? (
//             <MdInfoOutline className="text-(--color-accent) size-5" />
//           ) : (
//             <MdLightbulb className="text-(--color-accent) size-5" />
//           )}
//         </div>
//         <h3 className="font-medium">{role === 'BUYER' ? '알림' : '팁'}</h3>
//       </div>
//       {role === 'BUYER' ? (
//         <>
//           <p className="text-(--color-warm-gray) text-sm leading-relaxed">
//             현재 참여 중인 스토리가 {biddingCount}건 있습니다. 종료 시간을 확인해 주세요.
//           </p>
//           <Link href="/mypage/episodes?tab=ongoing&filter=입찰중">
//             <Button variant="base" className="mt-3 w-full">
//               스토리 확인하기
//             </Button>
//           </Link>
//         </>
//       ) : (
//         <p className="text-(--color-warm-gray) text-sm leading-relaxed">
//           경매 제목을 구체적으로 작성하면 더 많은 입찰자를 유치할 수 있어요!
//         </p>
//       )}
//     </ListCard>
//   );
// };

// export default MyPageNotification;
