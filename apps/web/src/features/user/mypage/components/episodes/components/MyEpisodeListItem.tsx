import Link from 'next/link';
import { FaChevronRight, FaGavel } from 'react-icons/fa6';
import BaseBadge from 'src/shared/ui/BaseBadge';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { getAuctionStatusText, getAuctionStatusVariant } from 'src/shared/utils/getAuctionStatusText';
import BaseCard from 'src/widgets/BaseCard';
import type { MyEpisodeListItemProps } from 'src/entities/user/mypage/episodes/types';

const MyEpisodeListItem = ({ episode, currentTab }: MyEpisodeListItemProps) => {
  const { title, auctions, created_at: createdAt, auction_id: auctionId } = episode;
  const auctionStatus = auctions?.status || '';
  const auctionTitle = auctions?.title || '경매 정보 없음';

  const getHref = () => {
    const baseUrl = `/auctions/${auctionId}`;

    if (!currentTab) return `${baseUrl}#episode-section-header`;

    if (currentTab === 'favorite' || currentTab === 'like') {
      return `${baseUrl}?from=mypage/favorites&tab=${currentTab}#episode-section-header`;
    }
    return `${baseUrl}?from=mypage/episodes&tab=${currentTab}`;
  };

  return (
    <li>
      <BaseCard
        as={Link}
        href={getHref()}
        className="hover:bg-(--color-accent)/10 group mb-4 flex cursor-pointer transition-colors duration-200"
      >
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">{title}</h3>
            <BaseBadge variant={getAuctionStatusVariant(auctionStatus)}>
              {getAuctionStatusText(auctionStatus)}
            </BaseBadge>
          </div>
          <p className="text-(--color-warm-gray) text-sm">작성일: {formatYYYYMMDD(createdAt)}</p>
          <div className="bg-(--color-secondary) group-hover:bg-(--color-accent)/30 mt-2 rounded-lg p-3 transition-colors duration-200">
            <p className="text-(--color-accent) flex items-center gap-2 text-sm transition-all duration-200 group-hover:text-white">
              <FaGavel />
              <span>{auctionTitle}</span>
            </p>
          </div>
        </div>
        <FaChevronRight className="text-(--color-warm-gray) ml-3 mt-1" />
      </BaseCard>
    </li>
  );
};

export default MyEpisodeListItem;
