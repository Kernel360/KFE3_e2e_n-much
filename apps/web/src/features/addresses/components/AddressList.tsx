'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGetAddressList } from 'src/entities/addresses/queries/useAddresses'; // 여러개라면
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import AddressListItem from './AddressListItem';
import type { AddressRow } from 'src/shared/supabase/types';

const AddressList = () => {
  const user = useUserState();
  const userId = user?.id;

  const { data: addressList, isPending, isError } = useGetAddressList(userId as string);
  const { push } = useRouter();

  if (!userId) return <div>로그인 해주세요</div>;
  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러!</div>;
  if (!addressList || addressList.length === 0) return <div>주소 없음</div>;

  return (
    <div>
      <ul className="space-y-3">
        {addressList.map((address: AddressRow) => (
          <AddressListItem
            key={address.address_id}
            address={address}
            addressCount={addressList.length}
            onEdit={() => {
              /* 수정 로직, 예: 페이지 이동 */
            }}
            onDelete={() => {
              /* 삭제 로직, 예: mutation */
            }}
          />
        ))}
      </ul>
      <div className="mt-8 flex justify-end">
        <Button variant="active" onClick={() => push('/mypage/addresses/write')}>
          주소 추가
        </Button>
      </div>
    </div>
  );
};

export default AddressList;
