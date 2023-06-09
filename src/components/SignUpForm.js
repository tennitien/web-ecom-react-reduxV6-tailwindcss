import React from 'react';
import Button from '../UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmailRegistered, createUser } from '../auth/auth';

const SignUpForm = () => {
  const navigate = useNavigate();
  //   Formik
  const formik = useFormik({
    initialValues: {
      user: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      user: Yup.string().required('Required user'),
      email: Yup.string().required('Required email').email(),

      // todo: Password khi đăng ký phải nhiều hơn 8 ký tự.
      password: Yup.string()
        .required('Required password')
        .min(8, 'Password must be at least 8 characters '),
    }),

    //
    onSubmit: async values => {
      const checkEmail = await checkEmailRegistered(values.email);
      // If Email already exists
      if (checkEmail) return null;

      await createUser(values.user, values.email, values.password);
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
            id='user'
            name='user'
            placeholder='User Name'
            className={inputClass}
            onChange={formik.handleChange}
            value={formik.values.user}
          />
          {/* show error */}
          {formik.errors.user && (
            <p className='text-red-500 py-3'> {formik.errors.user} </p>
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
