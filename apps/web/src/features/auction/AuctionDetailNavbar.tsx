import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import { selectUser } from 'src/entities/auth/supabase/client';
import AuctionFavoriteMarkToggle from 'src/features/auction/AuctionFavoriteMarkToggle';
import AuctionActionButtons from 'src/features/auction/button/AuctionActionButtons';
import { type AuctionRow } from 'src/shared/supabase/types';
import ClientContainer from 'src/shared/ui/ClientContainer';
import GoBackButton from 'src/shared/ui/GoBackButton';

interface AuctionDetailNavbarProps {
  auctionId: AuctionRow['auction_id'];
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AuctionDetailNavbar = async ({ auctionId, searchParams }: AuctionDetailNavbarProps) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId);
  const user = await getServerUser();

  // 쿼리스트링에서 from과 tab 정보 추출
  const from = searchParams?.from as string;
  const tab = searchParams?.tab as string;

  // fallback URL 생성
  const getFallbackUrl = () => {
    if (from) {
      // 마이페이지
      if (from === 'mypage/favorites' && tab) {
        const url = `/mypage/favorites?tab=${tab}`;
        return url;
      }

      if (from === 'mypage/episodes' && tab) {
        const url = `/mypage/episodes`;
        return url;
      }

      if (from === 'mypage/auctions' && tab) {
        const url = `/mypage/auctions?tab=${tab}`;
        return url;
      }

      // 경매 디테일 페이지
      if (from === 'auctions') {
        const url = `/auctions`;
        return url;
      }

      if (from === 'main') {
        const url = '/main';
        return url;
      }
    }
    return '/main';
  };

  const fallbackUrl = getFallbackUrl();

  return (
    <ClientContainer>
      <nav className="absolute left-0 top-5 z-10 w-full px-5">
        <div className="flex items-center justify-between">
          <div>
            <GoBackButton
              className="hover:bg-(--color-accent) group rounded-md border bg-white/70 p-3 transition"
              mode="smart"
              fallbackUrl={fallbackUrl}
              useGroupHover={true}
            />
          </div>
          <div>
            <AuctionActionButtons auctionInfo={auctionInfo} auctionId={auctionId} />
            <AuctionFavoriteMarkToggle auctionInfo={auctionInfo} auctionId={auctionId} userId={user!.id} />
          </div>
        </div>
      </nav>
    </ClientContainer>
  );
};

export default AuctionDetailNavbar;
