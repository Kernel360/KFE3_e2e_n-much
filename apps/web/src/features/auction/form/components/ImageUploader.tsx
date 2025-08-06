import { Button } from '@repo/ui/components/ui/button';
import Image from 'next/image';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BUCKET_FOLDER_NAME, MAX_UPLOADED_IMAGES } from 'src/entities/auction/constants';
import { useImageUpload } from 'src/entities/auction/hooks/useImageUpload';
import type { ImageUploaderProps } from 'src/entities/auction/types';

const ImageUploader = ({ previewImages, setPreviewImages, setImageUrlsToDelete }: ImageUploaderProps) => {
  const { getRootProps, getInputProps, handleImageToDelete } = useImageUpload(
    previewImages,
    setPreviewImages,
    setImageUrlsToDelete,
    BUCKET_FOLDER_NAME,
    MAX_UPLOADED_IMAGES
  );

  return (
    <div
      className="flex h-60 w-full cursor-pointer justify-center rounded-sm border-2 border-dashed bg-white p-2 align-middle"
      {...getRootProps()}
    >
      {previewImages.length > 0 ? (
        <ul className="grid h-full w-full grid-cols-5 gap-1">
          {previewImages.map((previewImage) => (
            <li className="relative h-full w-full border-2 border-black" key={previewImage.id}>
              <Image
                alt="업로드할 경매 이미지"
                src={previewImage.data}
                className="h-full w-full overflow-hidden object-cover"
                priority
                fill
                sizes="(min-width: 768px) 115px, 216px"
              />
              <Button
                type="button"
                className="absolute right-1 top-1 size-4"
                variant="base"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageToDelete(previewImage);
                }}
              >
                &times;
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto my-auto flex flex-col items-center justify-center pb-8 pt-8">
          <FaCloudUploadAlt className="text-(--color-accent) mb-4 size-14" />
          <p className="text-md mb-4 text-center">이미지를 끌어다 놓거나</p>
          <Button
            type="button"
            variant="base"
            className="bg-(--color-secondary) text-(--color-primary) rounded-sm text-center text-sm"
          >
            파일 선택하기
          </Button>
        </div>
      )}

      <input {...getInputProps()} />
    </div>
  );
};

export default ImageUploader;
