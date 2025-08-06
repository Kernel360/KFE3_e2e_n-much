import { uploadImageToDB } from 'src/entities/user/mypage/utils/uploadImage';

export const getImageURLFromDB = async (imageFile: File): Promise<string | null> => {
  if (!imageFile) {
    return null;
  }

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadImageToDB(imageFile);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return imageUrl;
};
