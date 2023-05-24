import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  categories: 'all',
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categories = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;
export default productListSlice.reducer;
