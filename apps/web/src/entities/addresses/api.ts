import type { AddressRow, AddressInsert, AddressUpdate } from 'src/shared/supabase/types';

// 기본 주소 정보 조회
export const getDefaultAddressInfo = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses?user_id=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: AddressRow[] = await res.json();
  return data[0] ?? null;
};

// 주소 등록
export const postAddressInfo = async (payload: AddressInsert) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const result = await res.json();
  return result;
};

// 주소 수정
export const patchAddressInfo = async (adrressId: string, address: AddressUpdate) => {
  if (!adrressId) {
    throw new Error('patchAddressInfo: adrressId가 없습니다.');
  }
  if (!address) {
    throw new Error('patchAddressInfo: address가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({ adrressId, address })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const result = await res.json();
  return result;
};

// 주소 삭제
export const deleteAddressInfo = async (adrressId: string) => {
  if (!adrressId) {
    throw new Error('deleteAddressInfo: adrressId가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
    body: JSON.stringify({ adrressId })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const result = await res.json();
  return result;
};

// userId로 해당 유저의 주소 목록을 가져오는 함수 (fetch 방식)
export const getAddressList = async (userId: string): Promise<AddressRow[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses?user_id=${userId}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '주소 목록을 불러오는 데 실패했습니다.');
  }

  // 주소 배열이 온다고 가정!
  const result = await res.json();
  return result;
};
