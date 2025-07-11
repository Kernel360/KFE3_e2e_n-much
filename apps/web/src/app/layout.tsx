import { pretendard } from 'assets/fonts';

import './globals.css';
import { home } from 'src/entities/layout/metaData';
import Providers from './(providers)/Providers';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>
        <div className="relative m-auto flex w-full max-w-2xl flex-col shadow-2xl">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
