import { createClient } from 'src/shared/supabase/client/client';
import { v4 as uuidv4 } from 'uuid';
import type { AddressInsert, AddressRow } from 'src/shared/supabase/types';

const supabase = createClient();

// 기본 주소 가져오기 1건
export const selectDefaultAddress = async (userId: string) => {
  const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId).eq('is_default', true);

  if (error) {
    console.error('🚀 ~ selectDefaultAddress ~ error:', error);
    throw new Error('기본 주소를 불러오는 데 실패했습니다.');
  }

  return data;
};

// 주소 등록
export const insertAddressInfo = async (address: AddressInsert) => {
  const { data, error } = await supabase.from('addresses').insert([address]).select();

  if (error) {
    console.error('🚀 ~ insertAddressInfo ~ error:', error);
    throw new Error('주소 등록 중 오류 발생');
  }

  return data?.[0];
};

// 주소 수정
export const updateAddressInfo = async (addressId: string, addressFormData: AddressRow) => {
  const { data, error } = await supabase.from('addresses').update(addressFormData).eq('address_id', addressId).select();

  if (error) {
    console.error('🚀 ~ updateAddressInfo ~ error:', error);
    throw new Error('주소 수정 중 오류 발생');
  }

  return data;
};

// 주소 삭제
export const deleteAddressInfo = async (addressId: string) => {
  const { data, error } = await supabase.from('addresses').delete().eq('address_id', addressId).select();

  if (error) {
    console.error('🚀 ~ deleteAddressInfo ~ error:', error);
    throw new Error('주소 삭제 중 오류 발생');
  }

  return data;
};

// Storage Bucket(company-image)의 이미지 삭제 - KSH
export const deleteImageToBucket = async (ImagePath: string | null): Promise<string | null> => {
  if (!ImagePath) {
    throw new Error('BUCKET(company-image): 이미지 삭제 에러(ImagePath가 없습니다.)');
  }

  const { data, error } = await supabase.storage.from('company-image').remove([ImagePath]);

  if (error) {
    console.error('🚀 ~ deleteImageToBucket ~ error:', error);
    throw new Error('BUCKET(company-image): 이미지 삭제 에러');
  }

  const fileObject = data?.[0];
  const imageName = fileObject?.name;
  return imageName ?? null;
};

//TODO - webp로 최적화하기- KSH
// Storage Bucket(company-image)에 이미지 업로드  - KSH
export const uploadImageToBucket = async (imageFile: File, ext: string) => {
  if (!imageFile) {
    throw new Error('BUCKET(company-image): 이미지 업로드 에러(imageFile이 없습니다.)');
  }

  const { data, error } = await supabase.storage.from('company-image').upload(`images/${uuidv4()}.${ext}`, imageFile, {
    contentType: imageFile.type
  });

  if (error) {
    console.error('🚀 ~ uploadImageToBucket ~ error:', error);
    throw new Error('BUCKET(company-image): 이미지 업로드 에러');
  }

  return data;
};
