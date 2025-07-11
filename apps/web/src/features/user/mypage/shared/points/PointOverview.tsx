// import { formatNumber } from 'src/shared/utils/formatNumber';
// import { useGetUserInfo } from 'src/features/user/queries/useUsers';

// const PointOverview = () => {
//   const { data: userInfo } = useGetUserInfo();
//   const currentPoint = userInfo?.userInfo?.point ?? 0;
//   const lastUpdated = userInfo?.userInfo?.updated_at;

//   // 날짜 포맷팅 변수로 분리 (리팩토링 예정)
//   const formattedDate = lastUpdated ? new Date(lastUpdated).toLocaleDateString('ko-KR') : '정보 없음';

//   return (
//     <>
//       <p className="text-(--color-accent) mb-2 flex items-center gap-1">
//         <span className="text-3xl font-bold">{formatNumber(currentPoint)}</span>
//         <span className="text-xl font-medium">P</span>
//       </p>
//       <p className="text-(--color-warm-gray) text-xs">마지막 업데이트: {formattedDate}</p>
//     </>
//   );
// };

// export default PointOverview;
