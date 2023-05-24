export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export const setLocalStorage = (key, value) => {
  let getDataStorage = getFromStorage(key) ? getFromStorage(key) : [];
  let newArr = [];
  if (key === 'listCart') {
    // find Index in Arr
    let findIndex = getDataStorage.findIndex(item => item.id === value.id);
    // If don't have : push
    if (findIndex < 0) {
      newArr = [...getDataStorage, value];
      // If have: change
    } else {
      getDataStorage[findIndex] = value;
      newArr = getDataStorage;
    }
  }
  // Other not Cart
  else {
    newArr = [...getDataStorage, value];
  }
  // Finally
  localStorage.setItem(key, JSON.stringify(newArr));
  return newArr;
};
