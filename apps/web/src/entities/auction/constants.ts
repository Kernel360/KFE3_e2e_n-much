//ANCHOR - 경매 상품의 카테고리별 리스트 개수
export const ENDING_SOON_AUCTIONS_COUNT = 5;
export const POPULAR_AUCTIONS_COUNT = 4;
export const LATEST_AUCTIONS_COUNT = 10;

//NOTE - auctionForm에서 사용하는 tansTack query 키
export const AUCTION_FORM_QUERY_KEY = 'auctionForm';
export const ADDRESS_ID_QUERY_KEY = 'addressId';
export const AUCTION_LIST_QUERY_KEY = 'auctionList';

//NOTE - auctionForm의 zod 유효성 검사에 사용하는 상수 목록
export const MIN_TITLE_LETTERS = 5; //NOTE - 제목의 최소 글자 수
export const MAX_TITLE_LETTERS = 50; //NOTE - 제목의 최대 글자 수
export const MIN_DESCRIPTION_LETTERS = 5; //NOTE - 상세 내용의 최소 글자 수
export const MAX_DESCRIPTION_LETTERS = 500; //NOTE - 상세 내용의 최대 글자 수
export const MIN_END_TIME_LETTERS = 1; //NOTE - 경매 종료 시각 입력 여부
export const MIN_STARTING_POINT_NUM = 0; //NOTE - 최소 경매 시작가
export const MIN_MAX_POINT_NUM = 0; //NOTE - 최대 경매 시작가
export const BUCKET_FOLDER_NAME = 'images/'; //NOTE - 버켓 폴더 이름

//NOTE - auctionForm의 초기 포인트 상수
export const INIT_STARTING_POINT_NUM = 1000;
export const INIT_MAX_POINT_NUM = 10000;

//ANCHOR - 초를 밀리초로 변환하기 위한 상수
export const MILLISECONDS = 1000;

//ANCHOR - 시간 단위를 두 자리 숫자로 채우기 위한 상수
export const TIME_UNIT_PADDING = 2;

//ANCHOR - delay: 지연시간 상수
export const DEFAULT_TIMER_DELAY = 1000;

//NOTE - 경매 리스트에서 한 페이지당 가져오는 경매 수
export const ITEM_PER_PAGE = 4;

//NOTE - 날짜 및 시간에 관련된 상수 목록
export const HOURS_OF_DAY = 24; //NOTE - 24시간
export const KOR_TIME_ZONE = 'Asia/Seoul'; //NOTE - 한국 time zone
export const UTC_TIME_ZONE = 'utc'; //NOTE - utc time zone

//ANCHOR - 현재 경매 물품의 입찰가, 하한가, 상한가
export const AUCTION_BID_POINT_AMOUNT = 'auctionBidPointAmount';
export const AUCTION_LIST_SKELETON_LENGTH = 10; //NOTE - 경매 리스트의 스켈레톤 갯수

export const MAX_UPLOADED_IMAGES = 5; //NOTE - 업로드할 수 있는 최대 이미지 갯수

//NOTE - toast 알림 시간(ms 단위)
export const SHORT_TOAST_DURATION = 2000;
export const MEDIUM_TOAST_DURATION = 3000;
export const LONG_TOAST_DURATION = 4000;

//NOTE - auctionList를 저장하는 캐싱 기간
export const SECONDS_TO_MS = 1000;
export const STALE_TIME_SECONDS = 5;
