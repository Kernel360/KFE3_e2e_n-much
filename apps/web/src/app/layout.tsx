import Providers from 'src/app/(providers)/Providers';
import { pretendard } from 'src/assets/fonts';
import './globals.css';
import { home } from 'src/entities/layout/metaData';
import QRCodeBanner from 'src/shared/ui/QRCodeBanner';

export const metadata = home;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>
        <div className="relative m-auto flex w-full max-w-2xl flex-col shadow-2xl">
          <Providers>{children}</Providers>
        </div>
        <QRCodeBanner />
      </body>
    </html>
  );
};

export default RootLayout;
