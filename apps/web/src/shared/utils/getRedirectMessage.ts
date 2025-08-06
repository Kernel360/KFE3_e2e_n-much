import { cookies } from 'next/headers';

//NOTE - 쿠키에서
export const getRedirectMessage = async () => {
  const cookieStore = await cookies();
  const reason = cookieStore.get('redirectMessage');
  const message = reason?.value;

  return message;
};
