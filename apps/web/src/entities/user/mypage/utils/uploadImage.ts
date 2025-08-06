import { uploadImageToBucket } from 'src/entities/addresses/supabase';
import { getExtension } from 'src/entities/auction/utils/extension';

export const uploadImageToDB = async (imageFile: File) => {
  if (!imageFile) {
    return null;
  }

  // 확장자 가져오기
  const ext = getExtension(imageFile.name);

  const data = await uploadImageToBucket(imageFile, ext);
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
};
