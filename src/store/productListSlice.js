import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  productList: [],
  productFilter: [],
  categories: 'all',
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.productList = action.payload;
      state.productFilter = state.productList;
    },

    setCategory(state, action) {
      const categories = action.payload;
      state.categories = categories;
      //  item => item.category.toLowerCase() === categories.toLowerCase()
      if (categories !== 'all') {
        const filter = state.productList.filter(
          item => item.category.toLowerCase() === categories.toLowerCase()
        );
        state.productFilter = filter;
      } else {
        state.productFilter = state.productList;
      }
    },
  },
});

export const productListActions = productListSlice.actions;
export default productListSlice.reducer;
