import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getExtension } from 'src/entities/auction/utils/extension';
import { popToast } from 'src/shared/utils/popToast';
import { v4 as uuidv4 } from 'uuid';
import type { PreviewImage } from 'src/entities/auction/types';

export const useImageUpload = (
  previewImages: PreviewImage[],
  setPreviewImages: Dispatch<SetStateAction<PreviewImage[]>>,
  setImageUrlsToDelete: Dispatch<SetStateAction<string[]>>,
  bucketFolderName: string,
  maxUploadedImages: number
) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (previewImages.length + acceptedFiles.length > maxUploadedImages) {
        popToast('error', '이미지 업로드 에러', '업로드 가능한 이미지 갯수를 초과했습니다. (최대 5개)', 'medium');
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const ext = getExtension(file.name);
          setPreviewImages((prev) => [...prev, { id: uuidv4(), data: reader.result as string, isUrl: false, ext }]);
        };
      });
    },
    [previewImages.length, setPreviewImages, maxUploadedImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/gif': ['.gif'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    }
  });

  const handleImageToDelete = (previewImage: PreviewImage) => {
    setPreviewImages((prev) => prev.filter((image) => image.id !== previewImage.id));
    if (previewImage.isUrl) {
      setImageUrlsToDelete((prev) => {
        const imageFullPath: string[] = previewImage.data.split('/');
        const imagePath = bucketFolderName + imageFullPath[imageFullPath.length - 1];
        return [...prev, imagePath];
      });
    }
  };

  return { getRootProps, getInputProps, onDrop, handleImageToDelete };
};
