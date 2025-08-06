'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteEpisodeMutation } from 'src/entities/episode/queries/episode';
import { usePageState } from 'src/entities/episode/stores/usePaginationStore';
import type { EpisodeRow } from 'src/shared/supabase/types';

const EpisodeActionButtons = ({
  auctionId,
  episodeId
}: {
  auctionId: EpisodeRow['auction_id'];
  episodeId: EpisodeRow['episode_id'];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = usePageState();

  const { mutateAsync, isPending } = useDeleteEpisodeMutation({ auctionId, currentPage });

  const handleEdit = () => {
    const queryString = searchParams.toString();
    router.push(`/episode/${auctionId}/${episodeId}${queryString ? `?${queryString}` : ''}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 이 사연을 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    await mutateAsync(episodeId);
    router.refresh();
  };
  return (
    <div className="flex">
      <Button onClick={handleEdit} variant="text" size="sm" className="px-0">
        수정
      </Button>
      <Button onClick={handleDelete} variant="text" size="sm" className="text-(--color-red)" disabled={isPending}>
        삭제
      </Button>
    </div>
  );
};

export default EpisodeActionButtons;
