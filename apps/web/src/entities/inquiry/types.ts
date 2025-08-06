//TODO - DB 테이블 생성 후 작업 예정
import type { AddressSummaryInfoType, AuctionSummaryInfoType } from 'src/entities/auction/types';
import type { InquiryInsert, InquiryRow, InquiryUpdate } from 'src/shared/supabase/types/index';

// 문의 등록
export type InquiryCreateType = {
  auctionId: InquiryInsert['auction_id'];
  userId: InquiryInsert['user_id'];
  title: InquiryInsert['title'];
  description: InquiryInsert['description'];
};

// 문의 수정
export type InquiryEditType = {
  inquiryId: InquiryUpdate['inquiry_id'];
  title: InquiryUpdate['title'];
  description: InquiryUpdate['description'];
};

// 모든 문의 조회
export type InquiryWithAuctionWithAddress = InquiryRow & {
  auctions: AuctionSummaryInfoType & {
    addresses: AddressSummaryInfoType;
  };
};

export type InquiryInfo = {
  inquiryId: InquiryRow['inquiry_id'];
  title: InquiryRow['title'];
  description: InquiryRow['description'];
};
