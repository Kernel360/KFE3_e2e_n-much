import { uploadImageToBucket } from 'src/entities/auction/supabase';
import type { PreviewImage } from 'src/entities/auction/types';

export const uploadImagesToDB = async (previewImages: PreviewImage[]) => {
  if (previewImages.length === 0) {
    return [];
  }

  const imageUploadPromise = previewImages.map(async (prevImage): Promise<string> => {
    if (!prevImage.isUrl) {
      const data = await uploadImageToBucket(prevImage.data, prevImage.ext);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    }
    return prevImage.data;
  });

  const imageUrls = await Promise.all(imageUploadPromise);
  return imageUrls;
};
