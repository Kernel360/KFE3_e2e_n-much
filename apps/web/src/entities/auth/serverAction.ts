'use server';
import { getUserById } from 'src/entities/auth/supabase/server';
import { createServer } from 'src/shared/supabase/client/server';

//ANCHOR - user 정보가 필요할 경우 사용
export const getServerUser = async () => {
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};

//ANCHOR - user 정보 + DB 프로필 정보 함께 가져오기
export const getServerUserWithProfile = async () => {
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const userData = await getUserById(user.id);

  return userData ? { ...user, ...userData } : user;
};
