import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vidding',
    short_name: 'VID',
    description: '당신의 가치를 Vidding!',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f4f7',
    theme_color: '#5B80C2',
    id: '/',
    scope: '/',
    lang: 'ko',
    orientation: 'portrait',
    categories: ['social', 'productivity'],
    dir: 'ltr',
    icons: [
      {
        src: '/icons/vid_icon_48x48.webp',
        sizes: '48x48',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_72x72.webp',
        sizes: '72x72',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_96x96.webp',
        sizes: '96x96',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_128x128.webp',
        sizes: '128x128',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_144x144.webp',
        sizes: '144x144',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_152x152.webp',
        sizes: '152x152',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_192x192.webp',
        sizes: '192x192',
        type: 'image/webp',
        purpose: 'any'
      },
      {
        src: '/icons/vid_icon_256x256.webp',
        sizes: '256x256',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_384x384.webp',
        sizes: '384x384',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_512x512.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/vid_screenshots_main.webp',
        sizes: '540x720',
        type: 'image/webp'
      }
    ],
    //아이콘을 길게 눌렀을 때 뜨는 안내문들
    shortcuts: [
      {
        name: '경매 바로가기',
        short_name: '경매',
        description: '경매 메인으로 바로 이동',
        url: '/auction',
        icons: [{ src: '/icons/vid_icon_96x96.webp', sizes: '96x96', type: 'image/webp' }]
      },
      {
        name: '내가 쓴 스토리 바로가기',
        short_name: '사연',
        description: '내가 쓴 스토리로 바로 이동',
        url: '/mypage/episodes',
        icons: [{ src: '/icons/vid_icon_96x96.webp', sizes: '96x96', type: 'image/webp' }]
      }
    ]
  };
}
