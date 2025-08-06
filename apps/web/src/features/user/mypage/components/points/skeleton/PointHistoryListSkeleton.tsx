import PointHistoryListItemSkeleton from 'src/features/user/mypage/components/points/skeleton/PointHistoryListItemSkeleton';

const PointHistoryListSkeleton = () => {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <PointHistoryListItemSkeleton key={index} />
      ))}
    </ul>
  );
};

export default PointHistoryListSkeleton;
