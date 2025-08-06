const TWO_DIGITS = 2;
const NOON_HOUR = 12;
const MIDNIGHT_HOUR = 0;

type DateFormatType = 'YYYY-MM-DD' | 'MM-DD' | 'YYYY년 MM월 DD일' | 'M월 D일';
type TimeFormatType = 'HH:MM' | 'HH:MM:SS' | 'h:MM A' | 'h:MM:SS A';
type DateTimeFormatType = 'YYYY-MM-DD HH:MM' | 'YYYY-MM-DD h:MM A' | 'MM-DD h:MM A' | 'M월 D일 h:MM A' | 'h:MM A';

export const formatKoreanDate = (isoString: string | null, dateFormat: DateFormatType): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);
  // 한국 시간대로 변환
  const koreanDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const year = koreanDate.getFullYear();
  const month = koreanDate.getMonth() + 1;
  const day = koreanDate.getDate();
  const MM = String(month).padStart(TWO_DIGITS, '0');
  const DD = String(day).padStart(TWO_DIGITS, '0');

  // 날짜 포맷팅
  switch (dateFormat) {
    case 'YYYY-MM-DD':
      return `${year}-${MM}-${DD}`;
    case 'MM-DD':
      return `${MM}-${DD}`;
    case 'YYYY년 MM월 DD일':
      return `${year}년 ${MM}월 ${DD}일`;
    case 'M월 D일':
      return `${month}월 ${day}일`;
    default:
      return `${year}-${MM}-${DD}`;
  }
};

export const formatKoreanTime = (isoString: string | null, timeFormat: TimeFormatType): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);
  // 한국 시간대로 변환
  const koreanDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const hours24 = koreanDate.getHours();
  const minutes = koreanDate.getMinutes();
  const seconds = koreanDate.getSeconds();

  const HH = String(hours24).padStart(TWO_DIGITS, '0');
  const MM = String(minutes).padStart(TWO_DIGITS, '0');
  const SS = String(seconds).padStart(TWO_DIGITS, '0');

  // 12시간 형식 계산
  const hours12 = hours24 === MIDNIGHT_HOUR ? NOON_HOUR : hours24 > NOON_HOUR ? hours24 - NOON_HOUR : hours24;
  const h = String(hours12);
  const period = hours24 < NOON_HOUR ? 'AM' : 'PM';

  switch (timeFormat) {
    case 'HH:MM':
      return `${HH}:${MM}`;
    case 'HH:MM:SS':
      return `${HH}:${MM}:${SS}`;
    case 'h:MM A':
      return `${h}:${MM} ${period}`;
    case 'h:MM:SS A':
      return `${h}:${MM}:${SS} ${period}`;
    default:
      return `${HH}:${MM}`;
  }
};

export const formatKoreanDateTime = (isoString: string | null, dateTimeFormat: DateTimeFormatType): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);
  // 한국 시간대로 변환
  const koreanDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const year = koreanDate.getFullYear();
  const month = koreanDate.getMonth() + 1;
  const day = koreanDate.getDate();
  const hours24 = koreanDate.getHours();
  const minutes = koreanDate.getMinutes();

  const MM = String(month).padStart(TWO_DIGITS, '0');
  const DD = String(day).padStart(TWO_DIGITS, '0');
  const HH = String(hours24).padStart(TWO_DIGITS, '0');
  const mm = String(minutes).padStart(TWO_DIGITS, '0');

  // 12시간 형식 계산
  const hours12 = hours24 === MIDNIGHT_HOUR ? NOON_HOUR : hours24 > NOON_HOUR ? hours24 - NOON_HOUR : hours24;
  const h = String(hours12);
  const period = hours24 < NOON_HOUR ? 'AM' : 'PM';

  switch (dateTimeFormat) {
    case 'YYYY-MM-DD HH:MM':
      return `${year}-${MM}-${DD} ${HH}:${mm}`;
    case 'YYYY-MM-DD h:MM A':
      return `${year}-${MM}-${DD} ${h}:${mm} ${period}`;
    case 'MM-DD h:MM A':
      return `${MM}-${DD} ${h}:${mm} ${period}`;
    case 'M월 D일 h:MM A':
      return `${month}월 ${day}일 ${h}:${mm} ${period}`;
    case 'h:MM A':
      return `${h}:${mm} ${period}`;
    default:
      return `${year}-${MM}-${DD} ${HH}:${mm}`;
  }
};

// 날짜 함수
export const formatYYYYMMDD = (isoString: string | null) => formatKoreanDate(isoString, 'YYYY-MM-DD');
export const formatMMDD = (isoString: string | null) => formatKoreanDate(isoString, 'MM-DD');
export const formatKoreanFullDate = (isoString: string | null) => formatKoreanDate(isoString, 'YYYY년 MM월 DD일');
export const formatKoreanShortDate = (isoString: string | null) => formatKoreanDate(isoString, 'M월 D일');

// 시간 함수
export const formatTime12 = (isoString: string | null) => formatKoreanTime(isoString, 'h:MM A');
export const formatTime24 = (isoString: string | null) => formatKoreanTime(isoString, 'HH:MM');

// 날짜 + 시간 함수
export const formatFullDateTime = (isoString: string | null) => formatKoreanDateTime(isoString, 'YYYY-MM-DD h:MM A');
export const formatTimeOnly = (isoString: string | null) => formatKoreanDateTime(isoString, 'h:MM A');
export const formatShortDateTime = (isoString: string | null) => formatKoreanDateTime(isoString, 'MM-DD h:MM A');

// NOTE - 사용 예시
/*
const exampleDate = '2025-05-05T14:30:00.000Z';

console.log(formatYYYYMMDD(exampleDate)); // "2025-05-05"
console.log(formatKoreanShortDate(exampleDate)); // "5월 5일"

console.log(formatTime12(exampleDate)); // "11:30 PM"
console.log(formatTime24(exampleDate)); // "23:30"

console.log(formatFullDateTime(exampleDate)); // "2025-05-05 11:30 PM"
console.log(formatTimeOnly(exampleDate)); // "11:30 PM"
console.log(formatShortDateTime(exampleDate)); // "05-05 11:30 PM"

console.log('=== 직접 포맷 지정 ===');
console.log(formatKoreanDateTime(exampleDate, 'M월 D일 h:MM A')); // "5월 5일 11:30 PM"
*/
