import { createClient } from 'src/shared/supabase/client/client';

const supabase = createClient();

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`로그아웃에 실패했습니다: ${error.message}`);
  }
};
