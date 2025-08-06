import { type UserRow } from 'src/shared/supabase/types';
import type { User } from '@supabase/supabase-js';

export type SocialAuthProvider = 'google' | 'kakao';

export type UserSummaryInfoType = Pick<UserRow, 'nick_name' | 'user_avatar' | 'email' | 'id' | 'role'>;

export type UserRole = 'seller' | 'buyer';

export type ExtendedUser = User & UserRow;
