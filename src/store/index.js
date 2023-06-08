import { configureStore } from '@reduxjs/toolkit';

import popupReducer from './popupSlice';
import productsListReducer from './productListSlice';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    productList: productsListReducer,
    login: loginReducer,
    cart: cartReducer,
    data: dataReducer,
  },
});

export default store;
