'use client';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { FaAngleRight, FaLocationDot } from 'react-icons/fa6';
import { useGetDefaultAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import AddressEditDeleteBtn from 'src/features/user/mypage/components/main/AddressEditDeleteBtn';
import AddressStatusSkeleton from 'src/features/user/mypage/components/main/skeleton/AddressStatusSkeleton';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';

const AddressStatus = () => {
  const user = useUserState();
  const userId = user?.id;

  const { data, isPending, isError } = useGetDefaultAddressInfo(userId);

  if (isPending) return <AddressStatusSkeleton />;
  if (isError) return <div>에러!</div>;

  if (!data) {
    return (
      <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
        <h3 className="text-(--color-text-base) mb-3 text-base font-semibold">주소</h3>
        <p>주소가 등록되지 않았습니다. 주소를 입력해 주세요.</p>
        <Link href="/mypage/addresses/write" className="text-(--color-accent) mt-3 inline-flex items-center gap-1">
          <Button variant="base" size="sm" className="min-w-30">
            등록하기
            <FaAngleRight />
          </Button>
        </Link>
      </div>
    );
  }

  // 기본배송지 "있음"
  return (
    <>
      <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
        <div className="flex items-start justify-between">
          <h3 className="text-(--color-text-base) mb-3 text-base font-semibold">주소</h3>
          <AddressEditDeleteBtn userId={userId} addressId={data.address_id} imageUrl={data.company_image} />
        </div>
        <div className="flex items-start gap-2">
          <BaseAvatar
            src={data.company_image ?? '/'}
            alt={data.business_name ?? '매장'}
            size="md"
            className="shrink-0"
          />
          <div className="-translate-y-1">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="text-(--color-text-base)">{data.business_name || '이름 없음'}</h4>
              <BaseBadge variant="accent">매장주소</BaseBadge>
            </div>
            <p className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1">
                <FaLocationDot size={16} />[{data.postal_code || '-'}]
              </span>
              <span>
                {data.road_address}
                {data.detail_address && ` ${data.detail_address}`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressStatus;
