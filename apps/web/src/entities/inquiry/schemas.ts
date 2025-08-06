import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH, MIN_DESC_LENGTH, MIN_TITLE_LENGTH } from 'src/entities/inquiry/constants';
import { z } from 'zod';

export const inquiryFormSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, { message: '제목을 두 글자 이상 입력해 주세요.' })
    .max(MAX_TITLE_LENGTH, { message: '제목을 50자 이하로 입력해 주세요.' }),
  description: z
    .string()
    .min(MIN_DESC_LENGTH, { message: '사연을 다섯 글자 이상 입력해 주세요.' })
    .max(MAX_DESC_LENGTH, { message: '사연을 1,000자 이하로 입력해 주세요.' })
});

export type DetailFormType = z.infer<typeof inquiryFormSchema>;
