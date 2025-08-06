import { notFound } from 'next/navigation';
import { FaRegLightbulb } from 'react-icons/fa';
import { getAuctionSummaryInfoWithAddress } from 'src/entities/auction/api';
import { getEpisodeInfo } from 'src/entities/episode/api';
import { EPISODE_TIP } from 'src/entities/episode/constants';
import AuctionSummaryCard from 'src/features/episode/card/AuctionSummaryCard';
import EpisodesForm from 'src/features/episode/form/EpisodeForm';
import { createServer } from 'src/shared/supabase/client/server';
import { type EpisodeRow } from 'src/shared/supabase/types';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const EpisodePage = async ({
  params,
  searchParams
}: {
  params: Promise<{ id: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [auctionId, episodeId] = (await params).id;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  let initialEpisodeInfo: EpisodeRow | null = null;

  // NOTE - 경매 상품 및 업체 정보
  const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  //NOTE - episodeId true: 수정, false: 등록
  if (episodeId) {
    initialEpisodeInfo = await getEpisodeInfo(episodeId);
  }

  //NOTE - 로그인된 유저 정보
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  return (
    <>
      <DetailPageHeader>{initialEpisodeInfo ? '사연 수정하기' : '사연 등록하기'}</DetailPageHeader>
      <PageContainer>
        <AuctionSummaryCard auctionInfo={auctionInfo} />
        <EpisodesForm
          auctionId={auctionId!}
          initialEpisodeInfo={initialEpisodeInfo}
          userId={user.id}
          searchParams={resolvedSearchParams}
        >
          <div className="bg-(--color-secondary) my-10 rounded-lg p-4">
            <h3 className="text-(--color-accent) mb-4 flex items-center gap-1 text-sm font-medium">
              <FaRegLightbulb />
              좋은 사연을 위한 팁
            </h3>
            <ul className="text-(--color-warm-gray) space-y-2 text-sm">
              {EPISODE_TIP.map((text, index) => (
                <li key={index}>&bull;&nbsp;{text}&#46;</li>
              ))}
            </ul>
          </div>
        </EpisodesForm>
      </PageContainer>
    </>
  );
};

export default EpisodePage;
