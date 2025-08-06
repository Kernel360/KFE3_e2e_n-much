'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select';
import { useRouter } from 'next/navigation';
import type { SelectOrderProps } from 'src/entities/auction/types';

const selectItemList = [
  { id: 0, label: '곧 종료되는 경매', value: 'end_date' },
  { id: 1, label: '인기 경매', value: 'favorite_count' },
  { id: 2, label: '최신 경매', value: 'created_at' }
];

const SelectOrder = ({ order, keyword }: SelectOrderProps) => {
  const { push } = useRouter();

  if (!keyword?.trim()) {
    keyword = '';
  }

  return (
    <Select
      onValueChange={(changedOrder) => {
        if (keyword) {
          return push(`/auctions?order=${changedOrder}&keyword=${keyword}`);
        }
        return push(`/auctions?order=${changedOrder}`);
      }}
      value={order}
    >
      <SelectTrigger className={'ml-auto w-full md:!w-80'}>
        <SelectValue placeholder="정렬 순서 선택" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 순서</SelectLabel>
          {selectItemList.map((select) => (
            <SelectItem key={select.id} value={select.value}>
              {select.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectOrder;
