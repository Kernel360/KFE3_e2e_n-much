'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type AuctionBidPointAmount } from 'src/entities/auction/types';
import { SELLER_MAX_POINT, SELLER_MIN_POINT } from 'src/entities/episode/constants';
import { usePatchEpisodeBidMutation } from 'src/entities/episode/queries/episode';
import { bidPointSchema, type FormValues } from 'src/entities/episode/schemas';
import { formatNumber } from 'src/shared/utils/formatNumber';
import type { EpisodeItemProps } from 'src/entities/episode/types';

type EpisodeBidModalFormProps = {
  auctionPoint: AuctionBidPointAmount;
  userPoint: number;
  userTotalBidPoint: number;
  role: string;
  episode: EpisodeItemProps;
  onClose: () => void;
};

const EpisodeBidModalForm = ({
  auctionPoint,
  userPoint,
  userTotalBidPoint,
  role,
  episode,
  onClose
}: EpisodeBidModalFormProps) => {
  const router = useRouter();
  const minBid = role === 'buyer' ? auctionPoint.starting_point : SELLER_MIN_POINT;
  const maxBid = role === 'buyer' ? auctionPoint.max_point : SELLER_MAX_POINT;

  const prevTotalBidPoint = Math.abs(userTotalBidPoint); // 음수를 양수로 변경
  const possibleTotalBidPoint = Math.max(0, maxBid - prevTotalBidPoint);

  const form = useForm<FormValues>({
    resolver: zodResolver(bidPointSchema(minBid, maxBid, userPoint, prevTotalBidPoint)),
    defaultValues: {
      bidAmount: undefined
    },
    mode: 'onChange'
  });
  const { handleSubmit, reset, formState } = form;
  const { mutateAsync, isPending } = usePatchEpisodeBidMutation(episode.auction_id, episode.user_id);

  const handleOnSubmit = async ({ bidAmount }: FormValues) => {
    const totalBid = episode.bid_point! + bidAmount;
    try {
      await mutateAsync({ episodeId: episode.episode_id, bidPoint: totalBid });
      router.refresh();
      onClose();
    } catch {
      reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="bidAmount"
            render={({ field }) => (
              <FormItem>
                <div className="text-(--color-warm-gray) text-sm">상한가: {formatNumber(maxBid)} P</div>
                <FormLabel htmlFor={field.name} className="w-fit">
                  <span className="text-(--color-warm-gray)">
                    입찰 가능한 포인트: {formatNumber(possibleTotalBidPoint)}&nbsp;P
                  </span>
                </FormLabel>
                <Input
                  id={field.name}
                  type="text"
                  inputMode="numeric"
                  placeholder={`${formatNumber(minBid)} P 이상 입찰 포인트을 입력하세요`}
                  className="text-center"
                  {...field}
                  value={field.value ?? ''}
                  maxLength={6}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const parsed = Number(raw);
                    if (!Number.isNaN(parsed) && /^\d+$/.test(raw)) {
                      field.onChange(parsed);
                      form.clearErrors('bidAmount'); // 정상 입력 시 에러 제거
                    } else if (raw === '') {
                      field.onChange(undefined);
                      form.clearErrors('bidAmount'); // 공란도 에러 제거
                    } else {
                      field.onChange(undefined);
                      form.setError('bidAmount', {
                        type: 'manual',
                        message: '입찰 포인트 또는 숫자만 입력해주세요.'
                      });
                    }
                  }}
                />
                <div className="text-(--color-warm-gray) mb-1 text-sm">하한가: {formatNumber(minBid)} P</div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            className="!rounded-button bg-(--color-secondary) text-(--color-text-base) hover:bg-(--color-secondary)/60 flex-1"
            onClick={onClose}
            type="button"
          >
            취소
          </Button>
          <Button
            className="!rounded-button bg-(--color-accent) hover:bg-(--color-primary) flex-1 text-white"
            type="submit"
            disabled={isPending || !formState.isValid || formState.isSubmitting}
          >
            입찰하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EpisodeBidModalForm;
