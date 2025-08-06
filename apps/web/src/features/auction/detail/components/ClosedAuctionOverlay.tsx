import Image from 'next/image';
import ClosedImage from 'src/assets/images/mascot_closed.webp';
import BackButton from 'src/features/auction/detail/components/BackButton';
import PageTitle from 'src/shared/ui/PageTitle';

const ClosedAuctionOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 m-auto flex max-w-2xl items-center justify-center bg-black/60">
      <div className="flex aspect-square w-80 flex-col items-center justify-center gap-3 rounded-full bg-white/50 p-8">
        <Image src={ClosedImage} alt="경매 종료" className="size-24" />
        <PageTitle className="mb-3 text-center leading-tight">
          이 경매는
          <br />
          종료되었습니다.
        </PageTitle>
        <BackButton>뒤로가기</BackButton>
      </div>
    </div>
  );
};

export default ClosedAuctionOverlay;
