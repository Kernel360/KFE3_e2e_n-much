/* eslint-disable unicorn/filename-case */
import Image from 'next/image';
import QRImage from 'src/assets/images/web_qr.svg';

const QRCodeBanner = () => {
  return (
    <div className="fixed bottom-1/4 left-[calc(50%+380px)]">
      <div className="flex w-[380px] gap-3">
        <Image src={QRImage} alt="QR image" className="size-25" priority />
        <div className="flex flex-col justify-between">
          <div className="text-[18px] font-semibold">
            <p>놓치지 마세요!</p>
            <p>모바일도 구경오실래요?</p>
          </div>
          <p className="text-(--color-warm-gray) text-sm">QR코드를 스캔해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeBanner;
