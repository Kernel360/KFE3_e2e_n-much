//ANCHOR - 현재 사용 x
export const getAuthInfo = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data = await res.json();
  return data;
};
