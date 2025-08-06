import { createClient } from 'src/shared/supabase/client/client';
import type { Provider, User } from '@supabase/supabase-js';
import type { RoleType } from 'src/entities/user/mypage/main/types';

const supabase = createClient();

export const selectSignUp = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) return error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`회원가입에 실패했습니다 : ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};

//ANCHOR - 유저 역할
export const selectUser = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectUsers ~ error:', error);
    throw new Error('DB: 사용자 프로필 조회 에러');
  }

  return data;
};

export const updateUserRole = async (userId: string, newRole: RoleType) => {
  const { data, error } = await supabase.from('users').update({ role: newRole }).eq('id', userId).single();

  if (error) {
    console.error('🚀 ~ updateUserRole ~ error:', error);
    throw new Error(`DB: 역할 변경에 실패했습니다: ${error.message}`);
  }

  return data;
};

export const upsertUser = async (authUser: User) => {
  if (!authUser.email) {
    throw new Error('사용자 이메일이 없습니다.');
  }

  const existingUser = await selectUser(authUser.id);

  const userData = {
    id: authUser.id,
    nick_name: authUser.user_metadata?.name || authUser.email.split('@')[0],
    email: authUser.email,
    role: existingUser?.role || ('buyer' as const),
    user_avatar: authUser.user_metadata?.avatar_url || ''
  };

  const { data } = await supabase
    .from('users')
    .upsert(userData, {
      onConflict: 'id',
      ignoreDuplicates: false
    })
    .select()
    .single();

  return {
    ...authUser,
    ...data
  };
};
