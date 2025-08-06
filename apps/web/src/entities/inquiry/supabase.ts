import { createClient } from 'src/shared/supabase/client/client';
import type { InquiryCreateType, InquiryEditType } from 'src/entities/inquiry/types';
import type { InquiryRow } from 'src/shared/supabase/types';

const supabase = createClient();

// 사용자가 등록한 문의 리스트 조회
export const selectAllInquiryInfo = async (user_id: InquiryRow['user_id']) => {
  const { data, error } = await supabase
    .from('inquiries')
    .select(
      '*,auctions(auction_id,title,end_date,image_urls,addresses(address_id,business_name,road_address,detail_address))'
    )
    .eq('user_id', user_id);

  if (error) {
    console.error('🚀 ~ selectInquiryInfo ~ error:', error);
    throw new Error();
  }

  return data;
};

// 특정 문의 정보
export const selectInquiryInfo = async (inquiry_id: InquiryRow['inquiry_id']) => {
  const { data, error } = await supabase.from('inquiries').select(`*`).eq('inquiry_id', inquiry_id).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectInquiryInfo ~ error:', error);
    throw new Error();
  }

  return data;
};

// 문의 등록
export const insertInquiry = async ({ auctionId, userId, title, description }: InquiryCreateType) => {
  const { error } = await supabase.from('inquiries').insert([
    {
      auction_id: auctionId,
      user_id: userId,
      title,
      description
    }
  ]);

  if (error) {
    console.error('🚀 ~ insertInquiry ~ error:', error);
    throw new Error();
  }
};

// 문의 수정
export const updateInquiry = async ({ inquiryId, title, description }: InquiryEditType) => {
  const { error } = await supabase.from('inquiries').update({ title, description }).eq('inquiry_id', inquiryId!);

  if (error) {
    console.error('🚀 ~ updateInquiry ~ error:', error);
    throw new Error();
  }
};

// 문의 삭제
export const deleteInquiry = async (inquiryId: InquiryRow['inquiry_id']) => {
  const { data, error } = await supabase.from('inquiries').delete().eq('inquiry_id', inquiryId).select();

  if (error) {
    console.error('🚀 ~ deleteInquiry ~ error:', error);
    throw new Error();
  }

  return data;
};
