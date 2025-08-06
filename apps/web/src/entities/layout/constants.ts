import FirstBanner from 'src/assets/images/banner_1.webp';
import SecondBanner from 'src/assets/images/banner_2.webp';
import ThirdBanner from 'src/assets/images/banner_3.webp';

// MainBanner.tsx
export const BANNER_DATA = [
  {
    src: FirstBanner,
    alt: '잠깐! 이건 놓치면 후회해요. 마감 임박!',
    title: '잠깐!',
    subTitle: '이건 놓치면 후회해요. 마감 임박!',
    backgroundColor: 'bg-(--color-primary) md:flex-row',
    imageStyle: 'size-80 md:size-60 md:translate-y-9 translate-y-4 md:mr-5',
    textStyle: 'md:ml-5'
  },
  {
    src: SecondBanner,
    alt: '이 사연, 마음이 울컥했어요...스토리로 사연을 나누세요',
    title: '이 사연, 마음이 울컥했어요...',
    subTitle: '스토리로 사연을 입찰하세요',
    backgroundColor: 'bg-(--color-green) md:flex-row-reverse',
    imageStyle: 'size-60 md:size-50 translate-y-6 md:translate-y-7 md:ml-5 md:order-1',
    textStyle: 'md:mr-5 md:pl-10 md:order-2'
  },
  {
    src: ThirdBanner,
    alt: '이 사연의 결말이 궁금해요... 함께 보실래요?',
    title: '이 사연의 결말이 궁금해요...',
    subTitle: '함께 보실래요?',
    backgroundColor: 'bg-(--color-secondary) md:flex-row',
    imageStyle: 'size-80 md:size-60 md:translate-y-8 translate-y-3 md:mr-5',
    textStyle: 'md:ml-5'
  }
];

// OnboardingPage.tsx
export const TOTAL_SLIDES = 3;
export const FIRST_SLIDE_INDEX = 0;
export const LAST_SLIDE_INDEX = TOTAL_SLIDES - 1;

// SecondSlide.tsx
export const SAMPLE_STORIES = [
  {
    story: '엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요...',
    likes: 24,
    name: '김OO님'
  },
  {
    story: '아이들 때문에 둘만의 시간이 없었는데...',
    likes: 18,
    name: '이OO님'
  },
  {
    story: '힘든 시간을 보낸 우리의 기념일을 축하하고 싶어요...',
    likes: 31,
    name: '박OO님'
  }
];
