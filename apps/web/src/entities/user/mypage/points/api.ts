// 포인트 리스트 불러오기
export const getUserPoints = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/points?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

// 유저의 포인트 불러오기
export const getUserBidPoint = async (userId: string) => {
  const res = await fetch(`/api/episodes/bid?user_id=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
