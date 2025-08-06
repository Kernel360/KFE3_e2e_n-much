import type { InquiryCreateType, InquiryEditType, InquiryWithAuctionWithAddress } from 'src/entities/inquiry/types';
import type { InquiryRow } from 'src/shared/supabase/types';

// 모든 문의 조회
export const getInquiryWithAuctionWithAddressList = async (user_id: InquiryRow['user_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiries/?userId=${user_id}&type=all`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: InquiryWithAuctionWithAddress[] = await res.json();
  return data;
};

// 특정 문의 정보
export const getInquiryInfo = async (inquiry_id: InquiryRow['inquiry_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiries/?inquiryId=${inquiry_id}&type=existing`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: InquiryRow = await res.json();
  return data;
};

// 문의 등록
export const postInquiryInfo = async ({ auctionId, userId, title, description }: InquiryCreateType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiries`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      auctionId,
      userId,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const status = await res.json();
  return status.message;
};

// 문의 수정
export const patchInquiryInfo = async ({ inquiryId, title, description }: InquiryEditType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiries?type=updateInquiry`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      inquiryId,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const status = await res.json();
  return status.message;
};

// 문의 삭제
export const deleteInquiryInfo = async (inquiryId: InquiryRow['inquiry_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiries`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({
      inquiryId
    })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const status = await res.json();
  return status.message;
};
