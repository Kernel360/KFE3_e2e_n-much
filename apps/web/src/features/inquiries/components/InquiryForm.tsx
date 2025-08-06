'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/ui/components/ui/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { patchInquiryInfo, postInquiryInfo } from 'src/entities/inquiry/api';
import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from 'src/entities/inquiry/constants';
import { inquiryFormSchema } from 'src/entities/inquiry/schemas';
import FormActionButton from 'src/shared/ui/FormActionButton';
import FormDescription from 'src/shared/ui/FormDescription';
import FormTitle from 'src/shared/ui/FormTitle';
import { popToast } from 'src/shared/utils/popToast';
import type { DetailFormType } from 'src/entities/inquiry/schemas';
import type { AuctionRow, InquiryRow, UserRow } from 'src/shared/supabase/types';

const InquiryForm = ({
  initialInquiryInfo,
  auctionId,
  userId
}: {
  initialInquiryInfo: InquiryRow | null;
  auctionId: AuctionRow['auction_id'];
  userId: UserRow['id'];
}) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isEditMode = !!initialInquiryInfo?.inquiry_id;
  const inquiryId = initialInquiryInfo?.inquiry_id;

  const form = useForm<DetailFormType>({
    resolver: zodResolver(inquiryFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialInquiryInfo?.title || '',
      description: initialInquiryInfo?.description || ''
    }
  });
  const handleInquiryUpsert = async (values: DetailFormType) => {
    const { title, description } = values;

    try {
      const status = isEditMode
        ? await patchInquiryInfo({ inquiryId, title, description }) // 수정
        : await postInquiryInfo({ auctionId, userId, title, description }); // 등록

      if (status === 'success') {
        setIsRedirecting(true);
        const message = isEditMode ? '문의를 수정했습니다.' : '문의를 등록했습니다.';
        popToast('info', '문의 설정 성공', message, 'medium');
        router.push(`/mypage/inquiries`);
      }
    } catch (error) {
      const message = isEditMode ? '문의를 수정하지 못했습니다.' : '문의를 등록하지 못했습니다.';
      popToast('error', '문의 설정 실패', message, 'medium');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInquiryUpsert)} className="mt-6">
        <FormTitle
          control={form.control}
          name={'title'}
          titleLabel="문의 제목"
          placeholder="문의 제목을 입력하세요."
          maxTitleLength={MAX_TITLE_LENGTH}
        />
        <FormDescription
          control={form.control}
          name={'description'}
          descriptionLabel="문의 내용"
          placeholder="문의하고 싶은 내용을 적어주세요."
          maxDescLength={MAX_DESC_LENGTH}
        />
        <FormActionButton
          buttonLabel={isEditMode ? '수정 완료' : '문의 등록'}
          isSubmitting={form.formState.isSubmitting}
          isRedirecting={isRedirecting}
        />
      </form>
    </Form>
  );
};

export default InquiryForm;
