export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export const setLocalStorage = (key, value) => {
  let dataStorage = getFromStorage(key) ? getFromStorage(key) : [];
  let newArr = [];
  if (key === 'listCart') {
    // find Index in Arr
    let findIndex = dataStorage.findIndex(item => item.id === value.id);
    // If don't have : push
    let exitsItem;
    if (findIndex < 0) {
      newArr = [...dataStorage, value];
      // If have: change
    } else {
      exitsItem = dataStorage[findIndex];
      let newQuantity = parseInt(exitsItem.quantity) + value.quantity;
      exitsItem.quantity = newQuantity;

      dataStorage[findIndex] = exitsItem;
      newArr = dataStorage;
    }
  } else {
    newArr = [...dataStorage, value];
  }
  // Finally
  localStorage.setItem(key, JSON.stringify(newArr));
  return newArr;
};
