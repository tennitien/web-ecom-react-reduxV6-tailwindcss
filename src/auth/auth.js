import { auth, firebaseConfig } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';

import firebase from 'firebase/app';
import { useState } from 'react';

export const createUser = async (email, password) => {
  try {
    await await createUserWithEmailAndPassword(auth, email, password);
    alert('Đăng ký thành công');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    await await signInWithEmailAndPassword(auth, email, password);
    alert('Đăng nhập thành công');

    await setTokenStore();
  } catch (error) {
    throw new Error(error.message);
  }
};
export async function logoutUser() {
  try {
    await auth.signOut();
    console.log('Đăng xuất thành công');
  } catch (error) {
    throw new Error(error.message);
  }
}

// ! chua dung duoc
export const changePassword = async newPassword => {
  try {
    const user = await auth.currentUser;
    await user.updatePassword(newPassword);
    alert('Đổi mật khẩu thành công');
  } catch (error) {
    alert('Đổi mật khẩu thất bại:', error);
    throw error;
  }
};

export const getAuthToken = async () => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setTokenStore = async () => {
  const getToken = await getAuthToken();
  const token = JSON.stringify(getToken);
  if (token) {
    localStorage.setItem('token', token);
  }
};
