import { createSlice } from '@reduxjs/toolkit';

import { setLocalStorage, getFromStorage } from './setLocalStorage';

export const initialState = {
  listCart: [],
  numberCart: 0,
  totalCart: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    GET_CART(state) {
      state.listCart = getFromStorage('listCart') || [];
      state.totalCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item?.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
    },
    ADD_CART(state, action) {
      const newItem = action.payload;
      setLocalStorage('listCart', newItem);
      state.listCart = getFromStorage('listCart');
      state.totalCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item?.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
    },
    UPDATE_CART(state, action) {
      const newUpdate = action.payload;
      const id = newUpdate.id;
      const quantity = parseInt(newUpdate.quantity);
      let listStore = getFromStorage('listCart');
      const findItem = listStore.find(item => item.id === id);

      // update
      findItem.quantity = quantity;
      state.listCart = setLocalStorage('listCart', findItem);
      state.totalCart = state.listCart.reduce(
        (sum, item) => sum + item?.price * item?.quantity,
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    DELETE_CART(state, action) {
      const idRemove = action.payload;
      // get from localStorage
      let listStore = getFromStorage('listCart');

      state.listCart = listStore.filter(item => item.id !== idRemove);
      state.totalCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item?.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
      localStorage.setItem('listCart', JSON.stringify(state.listCart));
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartSelector = {
  listCart: state => state.cart.listCart,
  numberCart: state => state.cart.numberCart,
  totalCart: state => state.cart.totalCart,
};
export default cartSlice.reducer;
