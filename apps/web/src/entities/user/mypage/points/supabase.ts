import { createClient } from 'src/shared/supabase/client/client';
import type { UserRow } from 'src/shared/supabase/types';

const supabase = createClient();

export const selectPointsByUserId = async (userId: UserRow['id']) => {
  const { data: points, error } = await supabase
    .from('points')
    .select(
      `
      point_id,
      created_at,
      user_id,
      type,
      source,
      amount,
      balance_after,
      description
      `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectPointsByUserId ~ error:', error);
    throw new Error('DB: 사용자 포인트 히스토리 조회 에러');
  }

  return points ?? [];
};
