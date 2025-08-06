import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDefaultAddressInfo,
  postAddressInfo,
  getAddressList,
  patchAddressInfo,
  deleteAddressInfo
} from 'src/entities/addresses/api';
import { addressQueryKeys } from 'src/entities/addresses/queries/keys';
import type { AddressInsert, AddressRow } from 'src/shared/supabase/types';

// 기본 주소 정보 조회 훅
export const useGetDefaultAddressInfo = (userId?: string) => {
  return useQuery({
    queryKey: addressQueryKeys.default(userId ?? ''),
    queryFn: async () => {
      const result: AddressRow | null = await getDefaultAddressInfo(userId ?? '');
      return result;
    },
    enabled: !!userId
  });
};

// 주소 등록 훅
export const usePostAddressInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { address: AddressInsert }, void>({
    mutationFn: async ({ address }) => {
      const result = await postAddressInfo(address);
      return result.message;
    },
    onSuccess: (_data, { address }) => {
      if (address.is_default && address.user_id) {
        queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(address.user_id) });
      }
    }
  });
};

// 주소 수정 훅
export const usePatchAddressInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { addressId: string; address: AddressInsert }, void>({
    mutationFn: async ({ addressId, address }) => {
      const result = await patchAddressInfo(addressId, address);
      return result.message;
    },
    onSuccess: (_data, { address }) => {
      if (address.user_id) {
        queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(address.user_id) });
      }
    }
  });
};

// 주소 삭제 훅
export const useDeleteAddressInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { addressId: string; userId?: string }, void>({
    mutationFn: async ({ addressId }) => {
      const result = await deleteAddressInfo(addressId);
      return result.message;
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(userId ?? '') });
    }
  });
};

export const useGetAddressList = (userId: string) => {
  return useQuery({
    queryKey: addressQueryKeys.list(userId),
    queryFn: () => getAddressList(userId),
    enabled: !!userId
  });
};
