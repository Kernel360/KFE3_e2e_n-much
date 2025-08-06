//NOTE - 파일이름에서 확장자를 반환
export const getExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  const extension = fileName.substring(dotIndex + 1);

  return extension;
};
