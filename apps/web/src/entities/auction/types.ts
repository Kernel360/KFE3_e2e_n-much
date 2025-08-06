import type { Dispatch, SetStateAction } from 'react';
import { type UserSummaryInfoType } from 'src/entities/auth/types';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { auctionFormSchema } from 'src/entities/auction/schema/auctionForm';
import type { AddressRow, AuctionRow, RankingRow } from 'src/shared/supabase/types';
import type { z } from 'zod';

export type AuctionSummaryInfoType = Pick<AuctionRow, 'auction_id' | 'title' | 'end_date' | 'image_urls'>;
export type AddressSummaryInfoType = Pick<
  AddressRow,
  'address_id' | 'business_name' | 'road_address' | 'detail_address'
>;

export type AuctionSummaryInfoWithAddressType = AuctionSummaryInfoType & AddressSummaryInfoType;

type AddressInfoType = Omit<AddressRow, 'created_at' | 'is_default' | 'user_id'>;

export type AuctionInfoWithAddressType = AuctionRow & AddressInfoType;

export type SellerAuctionCountType = {
  totalAuctions: number;
  activeAuctions: number;
};

type RankingSummaryInfoType = Pick<RankingRow, 'rank_position' | 'bid_amount' | 'created_at'>;
export type BidderRankingInfoType = RankingSummaryInfoType & { users: UserSummaryInfoType };

export type AuctionBidPointAmount = Pick<AuctionRow, 'starting_point' | 'current_point' | 'max_point'>;

export type SortedAuctionItemType = AuctionRow & {
  episodes: {
    count: number;
  }[];
};

export type SortedAuctionsListProps = SortedAuctionItemType[];

export type AddressType = {
  business_name: AddressRow['business_name'];
  road_address: AddressRow['road_address'];
  detail_address: AddressRow['detail_address'];
  is_default: AddressRow['is_default'];
};

export type AuctionTimerStatus = 'ongoing' | 'urgent';

//NOTE - auctionForm에서 사용하는 목록
export type AddressId = Pick<AddressRow, 'address_id'>;

export type FetchedAuction = Pick<
  AuctionRow,
  'title' | 'description' | 'end_date' | 'starting_point' | 'current_point' | 'max_point' | 'image_urls' | 'status'
>;

export interface PreviewImage {
  id: string;
  data: string;
  isUrl: boolean;
  ext: string;
}

//NOTE - auctionForm 관련 페이지 props 목록
export interface AuctionMutationPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export interface AuctionFormPageProps {
  auctionId: string | undefined;
}

//NOTE - auctionForm 컴포넌트 props
export interface AuctionFormProps {
  auctionIdParam: string | undefined;
  loggedInUserId: string;
  loggedInAddressId: string;
}

//NOTE - auctionForm의 form 타입
export type AuctionFormType = z.infer<typeof auctionFormSchema>;

// export type SortedAuctionItemType = AuctionRow & {
//   episodes: {
//     count: number;
//   }[];
// };

// export type SortedAuctionsType = {
//   data: SortedAuctionItemType[];
//   status: string;
// };

//NOTE - auctionList 관련 페이지 props 목록
export interface CurrentAuctionsPageProps {
  searchParams: Promise<{ order: string; keyword: string | undefined }>;
}

export interface AuctionListPageProps {
  order: string;
  keyword: string | undefined;
}

//NOTE - auctionCard의 좋아유 갯수
export interface EpisodeCount {
  episodes: [{ count: number }];
}

//NOTE - 경매 리스트 props
export interface AuctionListProps {
  order: string;
  keyword: string | undefined;
  auctionCount?: number;
  currentTab?: string;
  from?: string;
}

//NOTE - auctionCard의 props
export interface AuctionCardProps {
  auctionId: string;
  imageSrc: string | undefined;
  title: string;
  episodeCount: number;
  endDate: string;
  favoriteCount: number;
  currentTab?: string;
  from?: string;
}

//NOTE - 정렬 카테고리 선택
export interface SelectOrderProps {
  keyword: string | undefined;
  order: string;
}

//NOTE - 이미지를 업로드하는 컴포넌트 props
export interface ImageUploaderProps {
  previewImages: PreviewImage[];
  setPreviewImages: Dispatch<SetStateAction<PreviewImage[]>>;
  setImageUrlsToDelete: Dispatch<SetStateAction<string[]>>;
}

//NOTE - auctionForm에서 경매 종료 일을 입력하는 항목
export interface FormEndDayProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  endDayLabel: string;
  placeholder: string;
  endTime: string;
  validateDisableDate: (day: Date, time: string, isDisableCondition: boolean) => boolean;
}

//NOTE - auctionForm에서 경매 종료 시각을 입력하는 항목
export interface FormEndTimeProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  endTimeLabel: string;
}

//NOTE - auctionForm에서 포인트 상한가를 입력하는 항목
export interface FormMaxPointProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  maxPointLabel: string;
  placeholder: string;
}

//NOTE - auctionForm에서 포인트 시작가를 입력하는 항목
export interface FormStartingPointProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  startingPointLabel: string;
  placeholder: string;
}

//NOTE - 각 폼의 항목을 서로 트리가 하는 기능의 매개 변수
export interface UseTriggerCrossFieldsParams<T extends FieldValues> {
  control: Control<T>;
  fieldA: FieldPath<T>;
  fieldB: FieldPath<T>;
  trigger: (name?: FieldPath<T> | FieldPath<T>[]) => Promise<boolean>;
}
