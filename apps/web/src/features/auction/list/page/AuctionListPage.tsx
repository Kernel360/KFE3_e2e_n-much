import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchAuctionList } from 'src/entities/auction/queries/auction';
import { getAuctionCount } from 'src/entities/auction/serverActions';
import WriteAuctionButton from 'src/features/auction/button/WriteAuctionButton';
import AuctionList from 'src/features/auction/list/components/AuctionList';
import SelectOrder from 'src/features/auction/list/components/SelectOrder';
import EmptyState from 'src/shared/ui/EmptyState';
import PageContainer from 'src/shared/ui/PageContainer';
import PageTitle from 'src/shared/ui/PageTitle';
import GoTopButton from 'src/shared/utils/goTopButton';
import type { AuctionListPageProps } from 'src/entities/auction/types';

const AuctionListPage = async ({ order, keyword }: AuctionListPageProps) => {
  const queryClient = new QueryClient();
  const auctionCount = await getAuctionCount(keyword);

  await prefetchAuctionList(order, keyword, queryClient);

  return (
    <PageContainer>
      {auctionCount ? (
        <>
          <div className="mb-4 flex w-full flex-col md:flex-row md:items-center">
            <PageTitle className="mb-4 md:mb-0">경매 리스트</PageTitle>
            <SelectOrder order={order} keyword={keyword} />
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuctionList order={order} keyword={keyword} auctionCount={auctionCount} from="auctions" />
          </HydrationBoundary>
        </>
      ) : (
        <EmptyState
          title={keyword ? '검색 결과가 없습니다' : '아직 등록된 상품 정보가 없어요.'}
          description={
            keyword ? `'${keyword}'에 대한 검색 결과를 찾을 수 없습니다.` : '새로운 경매가 등록되면 알려드릴게요!'
          }
          className="mt-24"
        />
      )}
      <WriteAuctionButton />
      <GoTopButton />
    </PageContainer>
  );
};

export default AuctionListPage;
