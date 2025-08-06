import { createClient } from 'src/shared/supabase/client/client';
import type { PushSubscriptionProps } from 'src/entities/notification/type';
import type { Json } from 'src/shared/supabase/types/supabase';

const supabase = createClient();

//ANCHOR - 전체 사용자들의 구독 불러오기
export const selectUserSubscriptionList = async (allUserIds: string[]) => {
  const { data: subscriptions, error } = await supabase.from('users').select('subscription, id').in('id', allUserIds);

  if (error) {
    console.error('🚀 ~ selectUserSubscriptionList ~ error:', error);
    throw new Error();
  }

  return subscriptions;
};

//ANCHOR - 특정 사용자의 구독 불러오기
export const selectUserSubscription = async (userId: string) => {
  const { data: subscription, error } = await supabase
    .from('users')
    .select('subscription')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ selectUserSubscription ~ error:', error);
    throw new Error();
  }

  return subscription;
};

//ANCHOR - 사용자 구독 업데이트
export const UpdateUserSubscription = async (userId: string, subscription: PushSubscriptionProps[]) => {
  const { data, error } = await supabase
    .from('users')
    .update({ subscription: subscription as unknown as Json })
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ UpdateUserSubscription ~ error:', error);
    throw new Error();
  }

  return data;
};
