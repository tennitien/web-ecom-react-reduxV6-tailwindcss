import React from 'react';
import Button from '../UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/loginSlice';

// ------get data form localStorage ------------ //
const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
const emailArr = userArr.map(user => user.email);
// fn to check exist validate : password, name
function passwordCheck(email) {
  let find = userArr.find(user => user.email === email);
  return find?.password;
}
function findName(email) {
  let find = userArr.find(user => user.email === email);
  return find?.name;
}
// ------------------ //
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCart = useSelector(state => state.cart.listCart);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      // todo: Email sẽ không được trùng với các tài khoản đã có.
      email: Yup.string()
        .required('Required email')
        .email()
        .oneOf(emailArr, 'Email not exist'),
      password: Yup.string().required('Required'),
    }),

    onSubmit: values => {
      if (passwordCheck(values.email) === values.password) {
        /*
        Bạn cần cập nhật dữ liệu cho State của Component bằng cách sử dụng Redux và viết một Action mới là ON_LOGIN.
        Bạn cũng cần cập nhật dữ liệu về người dùng hiện lại xuống localStorage để khi vào lại trang Web thì vẫn ở trạng thái đăng nhập.
        */
        localStorage.setItem('user', JSON.stringify(findName(values.email)));

        // get value for cart
        localStorage.setItem('listCart', JSON.stringify(listCart));
        dispatch(loginActions.ON_LOGIN);
        navigate('/');
      } else {
        alert('Email or password is incorrect ');
        formik.resetForm();
      }
    },
  });
  const inputClass =
    'border border-gray-300 text-gray-900 text-sm  focus:ring-red-400 focus:border-red-400 block w-full p-4';

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='w-full md:w-1/2 shadow-lg p-6 rounded-md mt-16 bg-white'
      >
        <h3 className='text-4xl text-center font-light py-5'>Sign In</h3>
        <div className=''>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            className={inputClass}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {/* show error */}
          {formik.errors.email && (
            <p className='text-red-500 py-3'> {formik.errors.email} </p>
          )}
        </div>
        <div className=''>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            className={inputClass}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {/* show error */}
          {formik.errors.password && (
            <p className='text-red-500 py-3'> {formik.errors.password} </p>
          )}
        </div>

        <Button className='w-full mt-4'>Sign in</Button>

        <p className='text-gray-500 italic text-center mt-8'>
          Create an account?
          <span className='text-blue-600'>
            <Link to={'/register'}> Sign-up</Link>
          </span>
        </p>
      </form>
    </>
  );
};

export default SignIn;
