export const truncateText = (content: string, maxLength: number): { text: string; isTruncated: boolean } => {
  if (content.length > maxLength) {
    return {
      text: `${content.slice(0, maxLength)}...`,
      isTruncated: true
    };
  }
  return {
    text: content,
    isTruncated: false
  };
};
