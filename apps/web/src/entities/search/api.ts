export const getPopularKeywords = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/keywords`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const resData = await res.json();
  return resData.map((item: { keyword: string }) => item.keyword);
};

export const postKeyword = async (keyword: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/keywords`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keyword })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const successResponse = await res.json();

  return successResponse.message;
};
