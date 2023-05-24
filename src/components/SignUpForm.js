import React from 'react';
import Button from '../UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import { useDispatch } from 'react-redux';

import { setLocalStorage, getFromStorage } from '../store/setLocalStorage';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get data form localStorage
  const userArrStore = getFromStorage('userArr') || [];
  const emailArr = userArrStore.map(item => item.email);
  //   Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required name'),
      // todo Email sẽ không được trùng với các tài khoản đã có.
      email: Yup.string()
        .required('Required email')
        .email()
        .test(
          '',
          'Email is exit',
          value => !emailArr.find(item => item === value)
        ),

      // todo: Password khi đăng ký phải nhiều hơn 8 ký tự.
      password: Yup.string()
        .required('Required password')
        .min(8, 'Password must be at least 8 characters '),

      phone: Yup.string()
        .required('Required phone')
        .min(10, 'Phone must be at least 10'),
    }),

    /*
    Nếu thông tin người dùng hơp lý, bạn sẽ thêm người dùng đó vào mảng userArr (chứa danh sách toàn bộ người dùng) và lưu lại vào LocalStorage. Sau đó đưa người dùng trở về trang Sign In.
    */
    onSubmit: values => {
      const userArr = setLocalStorage('userArr', values);
      dispatch(loginActions.SIGN_UP(userArr));
      navigate('/login');
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
        <h3 className='text-4xl text-center font-light py-5'>Sign Up</h3>
        <div className='form-control'>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Full Name'
            className={inputClass}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {/* show error */}
          {formik.errors.name && (
            <p className='text-red-500 py-3'> {formik.errors.name} </p>
          )}
        </div>
        <div className='form-control'>
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

        <div className='form-control'>
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

        <div className='form-control'>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Phone'
            className={inputClass}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {/* show error */}
          {formik.errors.phone && (
            <p className='text-red-500 py-3'> {formik.errors.phone} </p>
          )}
        </div>
        <Button className='w-full mt-4'>Sign up</Button>
        <p className='text-gray-500 italic text-center mt-8'>
          Login?
          <span className='text-blue-600'>
            <Link to={'/login'}> Click</Link>
          </span>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
