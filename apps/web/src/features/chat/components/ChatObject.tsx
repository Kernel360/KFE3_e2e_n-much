import Image from 'next/image';

interface ChatObjectProps {
  auctionData: {
    auction_id: string;
    title: string;
    image_urls?: string[];
    seller: {
      nick_name: string;
      user_avatar?: string;
    } | null;
  } | null;
}

const ChatObject = ({ auctionData }: ChatObjectProps) => {
  if (!auctionData) {
    return (
      <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b p-4">
        <div className="size-12 overflow-hidden rounded-lg border sm:size-16">
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
            이미지 없음
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-col">
            <h3 className="line-clamp-1 font-medium">경매 정보를 불러오는 중...</h3>
            <p className="text-(--color-warm-gray) text-sm">-</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b p-4">
        <div className="relative size-12 overflow-hidden rounded-lg border sm:size-16">
          {auctionData.image_urls?.[0] ? (
            <Image src={auctionData.image_urls[0]} alt={auctionData.title} fill className="object-cover" sizes="64px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
              이미지 없음
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-col">
            <h3 className="line-clamp-1 font-medium">{auctionData.title}</h3>
            <p className="text-(--color-warm-gray) text-sm">{auctionData.seller?.nick_name || '판매자 정보 없음'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatObject;
