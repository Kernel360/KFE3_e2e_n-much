import NavigationItemSkeleton from 'src/features/user/mypage/components/main/skeleton/NavigationItemSkeleton';

const MyPageNavigationSkeleton = () => {
  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <NavigationItemSkeleton key={index} />
        ))}
      </ul>
    </nav>
  );
};

export default MyPageNavigationSkeleton;
