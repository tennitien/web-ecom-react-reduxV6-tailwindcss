import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLogin: false,
  userArr: [],
};
const loginSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    // dang nhap
    ON_LOGIN(state, action) {
      // save localStorage user
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.isLogin = true;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
    },
    SIGN_UP(state, action) {
      state.userArr = [...state.userArr, action.payload];
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
