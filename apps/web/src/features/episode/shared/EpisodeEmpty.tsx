import { FaRegCommentDots } from 'react-icons/fa';
const EpisodeEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-b-lg bg-slate-50 px-6 py-10 text-center">
      <FaRegCommentDots className="text-4xl text-slate-400" />
      <div>
        <p className="font-semibold text-slate-700">아직 사연이 없어요</p>
        <p className="mt-1 text-sm text-slate-500">가장 먼저 사연을 작성하여 상품을 차지할 기회를 잡아보세요!</p>
      </div>
    </div>
  );
};

export default EpisodeEmpty;
