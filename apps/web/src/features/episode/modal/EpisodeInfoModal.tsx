'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import MoreButton from 'src/shared/ui/MoreButton';
import PageDescription from 'src/shared/ui/PageDescription';
import PageTitle from 'src/shared/ui/PageTitle';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeInfoModal = ({ episode }: { episode: EpisodeItemProps }) => {
  const [open, setOpen] = useState(false);
  const episodeTime = formatYYYYMMDD(episode.created_at);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MoreButton variant="text" onClick={() => setOpen(true)} className="p-0" />
      </DialogTrigger>

      <DialogContent className="max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center text-lg font-bold">사연 상세</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 flex items-center gap-2">
            <BaseAvatar src={episode.users.user_avatar!} alt="아바타 이미지입니다." size="sm" />
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm">{episode.users.nick_name}</p>
                <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.users.email)}&#41;</p>
              </div>
              <p className="text-(--color-warm-gray) text-xs">{episodeTime}</p>
            </div>
          </div>
          <PageTitle className="mb-1 font-medium" order="left" size="lg">
            {episode.title}
          </PageTitle>
          <PageDescription variant="ghost" className="mb-6">
            {episode.description}
          </PageDescription>
        </div>

        <Button
          className="!rounded-button w-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-primary)]"
          onClick={() => setOpen(false)}
        >
          닫기
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EpisodeInfoModal;
