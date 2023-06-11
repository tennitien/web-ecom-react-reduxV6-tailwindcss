import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUserInfoStore } from '../auth/auth';
import { loginActions, loginSelector } from '../store/loginSlice';
import { cartSelector } from '../store/cartSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase';

// ------------------ //
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCart = useSelector(cartSelector.listCart);
  const login = useSelector(loginSelector.isLogin);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required email').email(),
      password: Yup.string().required('Required'),
    }),

    onSubmit: async values => {
      const isLogin = await loginUser(values.email, values.password);

      // get value for cart
      if (isLogin) {
        // save list cart & username to localStorage
        localStorage.setItem('listCart', JSON.stringify(listCart));
        setUserInfoStore();
        // action : loginSlice
        dispatch(loginActions.ON_LOGIN());
        navigate('/');
      }
      formik.resetForm();
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
        {!login && (
          <p className='text-gray-500 italic text-center mt-8'>
            Create an account?
            <span className='text-blue-600'>
              <Link to={'/register'}> Sign-up</Link>
            </span>
          </p>
        )}
      </form>
    </>
  );
};

export default SignIn;
