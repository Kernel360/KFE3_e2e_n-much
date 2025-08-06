'use server';
import { selectAuctionsByMainPageCategory, selectAuctionsCount } from 'src/entities/auction/supabase';
import { createServer } from 'src/shared/supabase/client/server';

//ANCHOR - 마감 임박, 인기순, 최신순
export const getAuctionsCategory = async (order: string, isAscending: boolean, count: number) => {
  const data = await selectAuctionsByMainPageCategory(order, isAscending, count);
  return data;
};

export const selectUserIdByAuctionId = async (auctionId: string | null): Promise<string> => {
  if (!auctionId) {
    throw new Error('DB: 유저 아이디 불러오기 에러(auctionId가 없습니다.)');
  }

  const supabase = await createServer();
  const { data, error } = await supabase.from('auctions').select('user_id').eq('auction_id', auctionId).single();

  if (error) {
    console.error('selectUserIdByAuctionId', error, data);
    throw new Error('DB: 유저 아이디 불러오기 에러');
  }

  return data.user_id;
};

export const getAuctionCount = async (keyword: string | undefined) => {
  let count = null;
  try {
    count = await selectAuctionsCount(keyword);

    return count;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return null;
    }
  }
};
