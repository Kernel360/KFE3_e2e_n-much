export const getList = (params: { key: string }) => {
  const { key } = params;

  const storedValuesString = localStorage.getItem(key);
  if (!storedValuesString) return [];

  try {
    const storedvalueList = JSON.parse(storedValuesString);
    return storedvalueList || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`전체 조회에 실패했습니다.: ${error.message}`);
    }
    return [];
  }
};

export const pushItem = (params: { key: string; newValueItem: string; valueList: string[]; maxLangth: number }) => {
  const { key, newValueItem, valueList, maxLangth } = params;

  let newValueList = valueList.filter((item) => item !== newValueItem);
  newValueList.unshift(newValueItem);
  if (newValueList.length > maxLangth) {
    newValueList = newValueList.slice(0, maxLangth);
  }

  try {
    localStorage.setItem(key, JSON.stringify(newValueList));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`아이템 추가에 실패했습니다.: ${error.message}`);
    }
  }

  return newValueList;
};

export const removeItem = (params: { key: string; newValueItem: string; valueList: string[] }) => {
  const { key, newValueItem, valueList } = params;

  const newValueList = valueList.filter((item) => item !== newValueItem);

  try {
    localStorage.setItem(key, JSON.stringify(newValueList));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`아이템 삭제에 실패했습니다.: ${error.message}`);
    }
  }

  return newValueList;
};

export const removeList = (params: { key: string }) => {
  const { key } = params;

  try {
    localStorage.setItem(key, JSON.stringify([]));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`전체 삭제에 실패했습니다.: ${error.message}`);
    }
  }

  return [];
};
