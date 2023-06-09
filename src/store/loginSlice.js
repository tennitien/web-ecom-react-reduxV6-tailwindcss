import { createSlice } from '@reduxjs/toolkit';

//* get localStorage set isLogin
const initialState = {
  isLogin: false,
  username: '',
  email: '',
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // dang nhap
    ON_LOGIN(state) {
      let username = JSON.parse(localStorage.getItem('username'));
      let email = JSON.parse(localStorage.getItem('email'));
      state.isLogin = true;
      state.username = username;
      state.email = email;
    },
    ON_LOGOUT(state) {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('listCart');
      localStorage.removeItem('token');

      state.isLogin = false;
      state.username = '';
      state.email = '';
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginSelector = {
  isLogin: state => state.login.isLogin,
  username: state => state.login.username,
  email: state => state.login.email,
};
export default loginSlice.reducer;
