import PointHistoryList from 'src/features/user/mypage/components/points/components/PointHistoryList';
import PageTitle from 'src/shared/ui/PageTitle';

const PointHistory = () => {
  return (
    <>
      <PageTitle as="h3" className="text-md mb-3 mt-8 text-left font-semibold">
        거래 내역
      </PageTitle>
      <PointHistoryList />
    </>
  );
};

export default PointHistory;
