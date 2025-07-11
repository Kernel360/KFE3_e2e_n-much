// import { IconType } from 'react-icons';
// import { FaGavel, FaCoins, FaCartShopping, FaGift, FaUserPlus } from 'react-icons/fa6';
// import { HiDocumentText } from 'react-icons/hi';
// import type { BadgeVariant, MyPageMenuItem } from 'src/features/user/mypage/types';

// // =====================================================
// // 🏷️ 기본 라벨들
// // =====================================================

// export const ROLE_LABEL = {
//   BUYER: '입찰 참여자',
//   SELLER: '경매 진행자'
// } as const;

// // =====================================================
// // 📋 메뉴 설정
// // =====================================================

// export const BUYER_MENU: MyPageMenuItem[] = [
//   {
//     label: '내가 쓴 스토리',
//     icon: <HiDocumentText className="text-(--color-accent) size-5" />,
//     href: '/mypage/episodes'
//   },
//   {
//     label: '포인트 사용 내역',
//     icon: <FaCoins className="text-(--color-accent)" />,
//     href: '/mypage/points'
//   }
// ];

// export const SELLER_MENU: MyPageMenuItem[] = [
//   {
//     label: '내 경매 보기',
//     icon: <FaGavel className="text-(--color-accent)" />,
//     href: '/mypage/auctions'
//   },
//   {
//     label: '포인트 사용 내역',
//     icon: <FaCoins className="text-(--color-accent)" />,
//     href: '/mypage/points'
//   }
//   // {
//   //   label: '주소 확인',
//   //   icon: <HiDocumentText className="size-5 text-(--color-accent)" />,
//   //   href: '/mypage/'
//   // }
// ];

// // =====================================================
// // 🎯 상태 관리 (통합)
// // =====================================================

// // 상태 라벨 (경매 & 스토리 공통 사용)
// export const STATUS_LABELS = {
//   OPEN: '진행중',
//   CLOSED: '종료됨'
// };

// // Badge variant (상태별 색상)
// export const STATUS_VARIANTS: Record<string, BadgeVariant> = {
//   OPEN: 'info',
//   CLOSED: 'muted'
// } as const;

// // =====================================================
// // 📑 탭 설정 (통합)
// // =====================================================

// // 탭 라벨 (경매 & 스토리 공통 사용)
// export const TAB_LABELS = {
//   ongoing: '진행중',
//   closed: '종료됨'
// } as const;

// export const TAB_STATUS_VALUES = ['bidding', 'closed'] as const;
// export type TabStatus = (typeof TAB_STATUS_VALUES)[number];

// // =====================================================
// // 📝 스토리 설정
// // =====================================================

// export const STORY_CONFIG = {
//   statusMap: STATUS_LABELS,
//   tabFilters: {
//     ongoing: ['전체', '입찰중', '낙찰예정'],
//     closed: ['전체', '낙찰완료']
//   }
// };

// // =====================================================
// // 💰 포인트/충전 설정
// // =====================================================

// export const CHARGE_FILTER_CONFIG = {
//   // 기간 필터
//   periodFilters: ['전체', '1개월', '3개월', '6개월'],

//   // 유형 필터
//   typeFilters: ['전체', '충전', '사용'],

//   // 초기값
//   defaultValues: {
//     period: '전체',
//     type: '전체'
//   },

//   // 유형 매핑
//   typeMap: {
//     charge: '충전',
//     use: '사용'
//   }
// };

// // =====================================================
// // 🎨 활동 아이콘 & 사이즈 (ActivityItem용)
// // =====================================================

// // 활동별 아이콘 매핑
// export const ACTIVITY_ICONS: Record<string, IconType> = {
//   charge: FaCoins,
//   auction: FaGavel,
//   purchase: FaCartShopping,
//   event: FaGift,
//   signup: FaUserPlus
// };

// // 사이즈별 스타일
// export const SIZE_MAP = {
//   sm: {
//     icon: 'size-3',
//     container: 'size-8',
//     gap: 'gap-2'
//   },
//   md: {
//     icon: 'size-4',
//     container: 'size-10',
//     gap: 'gap-3'
//   }
// } as const;
