// MyPageNavigation.tsx
export const ICON_NAMES = {
  DOCUMENT: 'HiDocumentText',
  GAVEL: 'FaGavel',
  COINS: 'FaCoins',
  HEART: 'FaHeart',
  CHAT: 'HiChatBubbleLeftRight',
  HANDSHAKE: 'LuHeartHandshake'
};

export const MYPAGE_MENU_LIST = [
  {
    role: 'buyer',
    label: '내가 쓴 스토리',
    href: '/mypage/episodes',
    icon: ICON_NAMES.DOCUMENT
  },
  { role: 'seller', label: '내 경매 보기', href: '/mypage/auctions', icon: ICON_NAMES.GAVEL },
  { role: 'common', label: '포인트 사용 내역', href: '/mypage/points', icon: ICON_NAMES.COINS },
  { role: 'common', label: '찜 목록', href: '/mypage/favorites', icon: ICON_NAMES.HEART },
  // { role: 'buyer', label: '1:1 문의 내역', href: '/mypage/inquiries', icon: ICON_NAMES.CHAT },
  {
    role: 'common',
    label: 'Vidding 팀에게 문의하기',
    href: 'https://forms.gle/t8WppAkisnc8WJXLA',
    icon: ICON_NAMES.HANDSHAKE
  }
];

// header.tsx
export const ROLE_CONFIG = {
  buyer: {
    roleNext: 'seller' as const,
    display: '입찰 참여자',
    roleNextToast: '경매 진행자',
    variant: 'accent' as const
  },
  seller: {
    roleNext: 'buyer' as const,
    display: '경매 진행자',
    roleNextToast: '입찰 참여자',
    variant: 'red' as const
  }
} as const;
