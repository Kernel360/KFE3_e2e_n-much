import FavoriteAuctionList from 'src/features/user/mypage/components/favorites/components/FavoriteAuctionList';

interface FavoriteAuctionsContainerProps {
  currentTab?: string;
}

const FavoriteAuctionsContainer = ({ currentTab }: FavoriteAuctionsContainerProps) => {
  return <FavoriteAuctionList order="favorites" keyword={undefined} currentTab={currentTab} />;
};

export default FavoriteAuctionsContainer;
