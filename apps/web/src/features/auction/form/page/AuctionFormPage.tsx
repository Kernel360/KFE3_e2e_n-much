//TODO - memo 훅으로 최적화 시도 해보기
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchAuction } from 'src/entities/auction/queries/auction';
import { getServerUserWithProfile } from 'src/entities/auth/serverAction';
import AuctionForm from 'src/features/auction/form/components/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { AuctionFormPageProps } from 'src/entities/auction/types';

const AuctionFormPage = async ({ auctionId }: AuctionFormPageProps) => {
  const isEditing = !!auctionId;
  const pageTitle = isEditing ? '경매 수정하기' : '경매 등록하기';
  // const userInfo = await getServerUser();
  const userInfo = await getServerUserWithProfile();
  const loggedInUserId = userInfo!.id; //NOTE - 미들웨어에서 비로그인시 메인 페이지로 리다이렉트 함
  const loggedInAddressId = userInfo!.address_id; //NOTE - 미들웨어에서 주소가 없을 경우 주소 등록 페이지로 리다이렉트 함
  const queryClient = new QueryClient();

  //TODO - 마이 페이지에서 주소를 변경할 때, 아래 쿼리 키의 캐시를 지워야 함 (KMH)
  //TODO - 시간나면 tanstack query로 가져오는 기능으로 수정하기 (KMH)
  //TODO - 주원님의 주소 가져오는 라우트 핸들러와 겹침 논의하기 (kmh)
  // await prefetchAddressId(loggedInUserId, queryClient);
  if (isEditing) {
    await prefetchAuction(auctionId, queryClient);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm
        auctionIdParam={isEditing ? auctionId : undefined}
        loggedInUserId={loggedInUserId}
        loggedInAddressId={loggedInAddressId}
      />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
