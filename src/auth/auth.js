import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
} from '@firebase/auth';

export const checkEmailRegistered = async email => {
  let checkEmail;
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    // signInMethods chứa danh sách các phương thức xác thực đã đăng ký với email này

    if (signInMethods.length > 0) {
      // Email đã được đăng ký trước đó
      alert('Email đã được đăng ký');
      checkEmail = true;
    } else {
      // Email chưa được đăng ký
      checkEmail = false;
    }
  } catch (error) {
    // Xử lý lỗi
    console.error('Lỗi khi kiểm tra email đã đăng ký:', error);
  }

  return checkEmail;
};

export const createUser = async (user, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Cập nhật tên người dùng (username)
    await updateProfile(userCredential.user, {
      displayName: user,
    });
    alert('Đăng ký thành công');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  let login;
  try {
    await await signInWithEmailAndPassword(auth, email, password);

    await setTokenStore();
    login = true;
    alert('Đăng nhập thành công');
  } catch (err) {
    login = false;
    alert('Email or password is not correct');
    throw new Error(err.message);
  }
  return login;
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
export function changePassword(newPassword) {
  const user = auth.currentUser;

  updatePassword(user, newPassword)
    .then(() => {
      alert('Mật khẩu đã được thay đổi thành công');
    })
    .catch(error => {
      alert('Đã xảy ra lỗi khi thay đổi mật khẩu: ', error);
    });
}
// Cập nhật tên người dùng
export function updateUserName(newName) {
  const user = auth.currentUser;

  updateProfile(user, { displayName: newName })
    .then(() => {
      alert('Tên người dùng đã được cập nhật thành công');
    })
    .catch(error => {
      alert('Đã xảy ra lỗi khi cập nhật tên người dùng: ', error);
    });
}

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
export const setUserInfoStore = onAuthStateChanged(auth, user => {
  if (user) {
    // Người dùng đã đăng nhập
    const username = JSON.stringify(user.displayName);
    localStorage.setItem('username', username);

    const email = JSON.stringify(user.email);
    localStorage.setItem('email', email);
  } else {
    // Người dùng chưa đăng nhập
    console.log('Người dùng chưa đăng nhập');
    return null;
  }
});
