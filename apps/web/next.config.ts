import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pukmjrqqelymnkzflppa.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'img1.kakaocdn.net' }
    ]
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true
  //   }
  // },
  // 보안 설정
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    },
    {
      source: '/sw.js',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/javascript; charset=utf-8'
        },
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self'"
        }
      ]
    }
  ]
};

export default nextConfig;
