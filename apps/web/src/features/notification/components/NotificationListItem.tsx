import { FaStar } from 'react-icons/fa';
import { FaChevronRight, FaHeart, FaArrowUp } from 'react-icons/fa6';
import { RiThumbUpFill } from 'react-icons/ri';
import type { NotificationListType } from 'src/entities/notification/type';

//FIXME - 타입 합쳐주세요 상위부모 List와 겹침
interface NotificationListItemProps {
  type?: NotificationListType;
}

const NotificationListItem = ({ type }: NotificationListItemProps) => {
  const baseStyle = 'flex cursor-pointer items-start gap-3 relative';
  const popoverStyle =
    'px-4 border-b-(--color-warm-gray)/30 hover:bg-(--color-secondary) border-b py-4 last:border-b-0';
  const fullStyle = 'group rounded-xl border-l-4 bg-white p-4 mb-4 shadow-sm transition-all hover:shadow-md';

  const itemStyle = type === 'popover' ? popoverStyle : fullStyle;

  return (
    <>
      <li className={`${baseStyle} ${itemStyle} border-l-(--color-green)`}>
        <div className="bg-(--color-green) flex size-8 shrink-0 items-center justify-center rounded-full">
          <FaStar className="text-white" />
        </div>
        <div>
          <h3>낙찰</h3>
          <p className="text-(--color-warm-gray) text-sm">프리미엄 브런치 세트가 성공적으로 낙찰 되었습니다.</p>
          <time className="text-(--color-warm-gray) mt-4 block text-sm">5시간 전</time>
        </div>
        {type === 'full' && (
          <FaChevronRight className="text-(--color-warm-gray) group-hover:text-(--text-base) absolute right-4 top-2/4 -translate-y-2/4" />
        )}
      </li>
      <li className={`${baseStyle} ${itemStyle} border-l-(--color-red)`}>
        <div className="bg-(--color-red) flex size-8 shrink-0 items-center justify-center rounded-full">
          <FaArrowUp className="text-white" />
        </div>
        <div>
          <h3>상위 입찰</h3>
          <p className="text-(--color-warm-gray) text-sm">내 사연보다 높은 입찰가가 등록되었습니다.</p>
          <time className="text-(--color-warm-gray) mt-4 block text-sm">5시간 전</time>
        </div>
        {type === 'full' && (
          <FaChevronRight className="text-(--color-warm-gray) group-hover:text-(--text-base) absolute right-4 top-2/4 -translate-y-2/4" />
        )}
      </li>
      <li className={`${baseStyle} ${itemStyle} border-l-(--color-accent)`}>
        <div className="bg-(--color-accent) flex size-8 shrink-0 items-center justify-center rounded-full">
          <RiThumbUpFill className="text-white" />
        </div>
        <div>
          <h3>스토리 좋아요 알림</h3>
          <p className="text-(--color-warm-gray) text-sm">
            회원님이 작성한 스토리에 새로운 좋아요가 15개 추가되었습니다.
          </p>
          <time className="text-(--color-warm-gray) mt-4 block text-sm">5시간 전</time>
        </div>
        {type === 'full' && (
          <FaChevronRight className="text-(--color-warm-gray) group-hover:text-(--text-base) absolute right-4 top-2/4 -translate-y-2/4" />
        )}
      </li>
      <li className={`${baseStyle} ${itemStyle} border-l-(--color-red)`}>
        <div className="bg-(--color-red) flex size-8 shrink-0 items-center justify-center rounded-full">
          <FaHeart className="text-white" />
        </div>
        <div>
          <h3>게시글 찜</h3>
          <p className="text-(--color-warm-gray) text-sm">회원님이 작성한 게시글에 찜이 20개 추가되었습니다.</p>
          <time className="text-(--color-warm-gray) mt-4 block text-sm">5시간 전</time>
        </div>
        {type === 'full' && (
          <FaChevronRight className="text-(--color-warm-gray) group-hover:text-(--text-base) absolute right-4 top-2/4 -translate-y-2/4" />
        )}
      </li>
    </>
  );
};

export default NotificationListItem;
