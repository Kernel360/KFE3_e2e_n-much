// export const filterByText = <T extends { status: string }>(
//   items: T[],
//   filterText: string,
//   statusMap: Record<string, string>
// ): T[] => {
//   if (filterText === '전체') {
//     return items;
//   }

//   // statusMap에서 텍스트에 해당하는 상태 키 찾기
//   const statusKey = Object.keys(statusMap).find((key) => statusMap[key] === filterText);

//   if (statusKey) {
//     return items.filter((item) => item.status === statusKey);
//   }

//   return items;
// };
