import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

//* get localStorage set isLogin
const initialState = {
  isLogin: false,
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // dang nhap
    ON_LOGIN(state) {
      state.isLogin = true;
      console.log('sliceL:', state.isLogin);
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginSelector = {
  isLogin: state => state.login.isLogin,
};
export default loginSlice.reducer;
