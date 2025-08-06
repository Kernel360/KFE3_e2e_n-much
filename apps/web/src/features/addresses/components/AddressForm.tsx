'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import { usePatchAddressInfo, usePostAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import { deleteImageToBucket } from 'src/entities/addresses/supabase';
import { getImageURLFromDB } from 'src/entities/user/mypage/utils/getImage';
import { popToast } from 'src/shared/utils/popToast';
import type { PostcodeData, PreviewImage } from 'src/entities/addresses/types';
import type { AddressInsert, AddressRow } from 'src/shared/supabase/types';

const AddressForm = ({
  initialAddressInfo,
  userId
}: {
  initialAddressInfo: AddressRow | null;
  userId: AddressRow['user_id'];
}) => {
  const isEditMode = !!initialAddressInfo?.address_id;
  const initialPreviewImage = { url: isEditMode ? initialAddressInfo.company_image : null, file: null };

  const [businessName, setBusinessName] = useState(initialAddressInfo?.business_name || '');
  const [zonecode, setZonecode] = useState(initialAddressInfo?.postal_code || '');
  const [address, setAddress] = useState(initialAddressInfo?.road_address || '');
  const [detailAddress, setDetailAddress] = useState(initialAddressInfo?.detail_address || '');
  const [previewImage, setPreviewImage] = useState<PreviewImage>(initialPreviewImage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const postAddressMutation = usePostAddressInfo();
  const patchAddressMutation = usePatchAddressInfo();

  const router = useRouter();

  const handleComplete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZonecode(data.zonecode);
    setAddress(fullAddress);
  };

  // 등록 버튼 클릭시
  const handleAddressUpsert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if (!businessName || !zonecode || !address) {
      alert('필수 입력값을 모두 입력해 주세요.');
      return;
    }
    if (!previewImage.url) {
      alert('이미지를 등록해 주세요.');
      return;
    }

    let imageUrl: string | null = null;
    if (previewImage.file) {
      // 첨부한 이미지가 있으면 스토리지 버킷에 이미지 저장 후 URL 가져오기 - KSH
      imageUrl = await getImageURLFromDB(previewImage.file);
      if (isEditMode && initialAddressInfo.company_image) {
        // 기존 이미지(스토리지) 삭제
        const ImagePath = initialAddressInfo.company_image.split('company-image/')[1] ?? null;
        await deleteImageToBucket(ImagePath);
      }
    } else {
      // 첨부한 이미지가 없으면 기존 이미지 적용(기존 이미지 없으면 null) - KSH
      imageUrl = previewImage.url;
    }

    const addressFormData: AddressInsert = {
      user_id: userId,
      business_name: businessName,
      postal_code: zonecode,
      road_address: address,
      detail_address: detailAddress,
      company_image: imageUrl,
      is_default: true // 현재 주소 1개만 등록할 수 있음(is_default 무조건 true)
    };

    try {
      let status = null;

      if (isEditMode) {
        status = await patchAddressMutation.mutateAsync({
          addressId: initialAddressInfo.address_id,
          address: addressFormData
        });
      } else {
        status = await postAddressMutation.mutateAsync({ address: addressFormData });
      }

      if (status === 'success') {
        const message = isEditMode ? '주소를 수정했습니다.' : '주소를 등록했습니다.';
        popToast('info', '주소 설정', message, 'medium');
        router.push('/mypage');
      }
    } catch (error) {
      const message = isEditMode ? '주소를 수정하지 못했습니다.' : '주소를 등록하지 못했습니다.';
      popToast('error', '주소 설정', message, 'medium');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  // 파일 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      popToast('warning', '이미지 첨부', '이미지 첨부에 실패했습니다.', 'medium');
      return;
    }
    setPreviewImage({ url: URL.createObjectURL(file), file });
  };

  return (
    <form onSubmit={handleAddressUpsert}>
      <div className="mb-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          업체명
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input
          type="text"
          placeholder="예: OO 제과점"
          maxLength={30}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          이미지 등록
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {/* 미리보기 */}
        {previewImage.url && (
          <Image
            src={previewImage.url}
            alt="첨부한 이미지 미리보기"
            width={50}
            height={50}
            className="mt-2 h-20 w-20 object-cover"
          />
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          주소
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <div className="mb-2 flex items-stretch gap-2">
          <Input type="text" placeholder="우편번호" maxLength={10} readOnly value={zonecode} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="active" className="h-auto px-10" onClick={() => setIsDialogOpen(true)}>
                주소 검색
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-lg font-bold">{'주소검색'}</DialogTitle>
              </DialogHeader>
              <DaumPostcodeEmbed
                onComplete={(data) => {
                  handleComplete(data);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Input type="text" placeholder="기본 주소" className="mb-2" maxLength={50} readOnly value={address} />
        <Input
          type="text"
          placeholder="나머지 주소 (선택 입력 가능)"
          maxLength={50}
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white p-4">
        <Button type="submit" variant="base" className="w-full" disabled={postAddressMutation.isPending}>
          {postAddressMutation.isPending ? '등록 중...' : '등록하기'}
        </Button>
      </div>
      {/* <div className="mt-8">
        <label className="flex w-full items-start justify-center gap-2">
          <input type="checkbox" className="accent-(--color-accent) size-4 translate-y-0.5" checked readOnly />
          <p className="text-sm">
            <span className="mr-1 block md:inline-block">기본 주소로 저장</span>
            <span className="text-(--color-text-base)/70">&#40;첫 주소는 자동으로 기본 주소로 저장됩니다&#41;</span>
          </p>
        </label>
      </div> */}
    </form>
  );
};

export default AddressForm;
