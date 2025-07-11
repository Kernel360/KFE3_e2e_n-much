//NOTE - 업로드할 이미지를 드래그하면 UI에 효과줄 수 있음 (isDragActive)

import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function ImageUploader({
  onPreviewImages
}: {
  onPreviewImages: Dispatch<SetStateAction<{ id: string; data: string; isUrl: boolean }[]>>;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      onPreviewImages([]);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          onPreviewImages((prev) => [...prev, { id: uuidv4(), data: reader.result as string, isUrl: false }]);
        };
      });
    },
    [onPreviewImages]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  return (
    <div
      className="h-2xl flex w-full justify-center rounded-sm border-2 border-dashed bg-white align-middle"
      {...getRootProps()}
    >
      <div className="mx-auto my-auto flex-col justify-center pt-8 pb-8 align-middle">
        <FaCloudUploadAlt className="mx-auto mb-4 h-14 w-14 text-(--color-accent)" />
        <p className="text-md mb-4 text-center">이미지를 끌어다 놓거나</p>
        <p className="rounded-sm bg-(--color-secondary) p-2 text-center text-sm text-(--color-primary)">
          파일 선택하기
        </p>
      </div>
      <input {...getInputProps()} />
      {/* {isDragActive ? (
        <p className="">Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </div>
  );
}
