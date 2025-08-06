import {
  MAX_DESCRIPTION_LETTERS,
  MAX_TITLE_LETTERS,
  MIN_DESCRIPTION_LETTERS,
  MIN_END_TIME_LETTERS,
  MIN_MAX_POINT_NUM,
  MIN_STARTING_POINT_NUM,
  MIN_TITLE_LETTERS
} from 'src/entities/auction/constants';
import { validateDate } from 'src/entities/auction/utils/validateDate';
import { z } from 'zod';

export const auctionFormSchema = z
  .object({
    title: z
      .string()
      .min(MIN_TITLE_LETTERS, {
        message: '경매 제목은 최소 5글자가 되어야 합니다.'
      })
      .max(MAX_TITLE_LETTERS, {
        message: '경매 제목은 최대 50글자가 되어야 합니다.'
      }),
    description: z
      .string()
      .min(MIN_DESCRIPTION_LETTERS, { message: '상세 내용은 최소 5글자가 되어야 합니다.' })
      .max(MAX_DESCRIPTION_LETTERS, {
        message: '상세 내용은 최대 500자가 되어야 합니다.'
      }),
    endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
    endTime: z.string().min(MIN_END_TIME_LETTERS, { message: '경매 종료 시각을 입력해야 합니다.' }),
    startingPoint: z
      .string()
      .refine((value) => Number(value) > MIN_STARTING_POINT_NUM, { message: '최소 포인트는 0보다 커야 합니다.' }),
    maxPoint: z
      .string()
      .refine((value) => Number(value) > MIN_MAX_POINT_NUM, { message: '최대 포인트는 0보다 커야 합니다.' })
  })
  .refine((data) => validateDate(data.endDay, data.endTime, false), {
    message: '경매 종료 일/시각은 현재 이후여야 합니다.',
    path: ['endDay']
  })
  .refine((data) => validateDate(data.endDay, data.endTime, false), {
    message: '경매 종료 일/시각은 현재 이후여야 합니다.',
    path: ['endTime']
  })
  .refine((data) => Number(data.maxPoint) > Number(data.startingPoint), {
    message: '최대 포인트는 최소 포인트보다 커야 합니다.',
    path: ['maxPoint']
  })
  .refine((data) => Number(data.maxPoint) > Number(data.startingPoint), {
    message: '최소 포인트는 최대 포인트보다 작아야 합니다.',
    path: ['startingPoint']
  });

export const postAuctionSchema = z.object({
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
  end_date: z.string(),
  starting_point: z.number(),
  max_point: z.number(),
  image_urls: z.array(z.string()),
  address_id: z.string()
});

export const patchAuctionSchema = z.object({
  auction_id: z.string(),
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
  end_date: z.string(),
  starting_point: z.number(),
  current_point: z.number(),
  max_point: z.number(),
  image_urls: z.array(z.string()),
  status: z.string(),
  address_id: z.string(),
  updated_at: z.string()
});
