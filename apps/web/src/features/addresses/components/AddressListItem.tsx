import { Button } from '@repo/ui/components/ui/button';
import { FaLocationDot } from 'react-icons/fa6';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseCard from 'src/widgets/BaseCard';
import type { AddressRow } from 'src/shared/supabase/types';

interface AddressListItemProps {
  address: AddressRow;
  addressCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressListItem = ({ address, addressCount, onEdit, onDelete }: AddressListItemProps) => {
  return (
    <li>
      <BaseCard variant="custom" className="flex w-full items-center gap-4 px-4 pb-6 pt-4 sm:!items-start">
        <BaseAvatar
          src={address.company_image ?? '/'}
          alt={address.business_name ?? '매장'}
          size="md"
          className="shrink-0 translate-y-2"
        />
        <div className="w-full">
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="text-(--color-text-base)">{address.business_name || '이름 없음'}</h3>
              {address.is_default && <Button variant="active">기본주소</Button>}
            </div>
            <div className="mb-2 ml-auto flex items-center gap-2">
              <Button
                variant="text"
                className="text-(--color-text-base) hover:text-(--color-accent) p-0"
                onClick={onEdit}
              >
                수정
              </Button>
              <Button
                variant="text"
                className="text-(--color-text-base) hover:text-(--color-accent) p-0"
                onClick={onDelete}
                disabled={addressCount <= 1}
              >
                삭제
              </Button>
            </div>
          </div>
          <p className="text-(--color-warm-gray) flex flex-col gap-1 text-sm sm:flex-row">
            <span className="mt-1 flex items-center gap-0.5 sm:mt-0">
              <FaLocationDot size={16} />[{address.postal_code || '-'}]
            </span>
            <span>
              {address.road_address}
              {address.detail_address && ` ${address.detail_address}`}
            </span>
          </p>
        </div>
      </BaseCard>
    </li>
  );
};

export default AddressListItem;
