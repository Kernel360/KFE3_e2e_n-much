import { createServer } from 'src/shared/supabase/client/server';
import type { UserRow } from 'src/shared/supabase/types';

export const getUserById = async (userId: string) => {
  const supabase = await createServer();
  const { data } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();

  return data;
};

export const upsertUserProfile = async (userData: UserRow) => {
  const supabase = await createServer();
  const { data } = await supabase.from('users').upsert(userData, { onConflict: 'id' }).select().single();

  return data;
};
