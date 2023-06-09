import React, { useEffect, useState } from 'react';
import style from '../style';
import SignBackground from '../UI/SignBackground';
import { Button } from 'react-daisyui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { loginSelector } from '../store/loginSlice';
import { useNavigate } from 'react-router';
import SignIn from '../components/SignIn';

const Setting = () => {
  const login = useSelector(loginSelector.isLogin);
  const username = useSelector(loginSelector.username);
  const [newUsername, setNewUsername] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user: '',
    },
    validationSchema: Yup.object({
      user: Yup.string().required('Required user'),
    }),

    onSubmit: values => {
      setNewUsername(values.user);
      navigate('/login');
    },
  });
  useEffect(() => {
    let newUsername = {
      user: username,
    };
    formik.setValues(newUsername);
  }, []);
  const inputClass =
    'border border-gray-300 text-gray-900 text-sm  focus:ring-red-400 focus:border-red-400 block w-full p-4';
  return (
    <section id='setting'>
      <SignBackground>
        {/* Form Update */}
        <form
          onSubmit={formik.handleSubmit}
          className='w-full md:w-1/2 shadow-lg p-6 rounded-md mt-16 bg-white'
        >
          <h3 className='text-4xl text-center font-light py-5'>Setting</h3>
          <div className='form-control'>
            <input
              type='text'
              id='user'
              name='user'
              className={inputClass}
              onChange={formik.handleChange}
              value={formik.values.user}
            />
            {/* show error */}
            {formik.errors.user && (
              <p className='text-red-500 py-3'> {formik.errors.user} </p>
            )}
          </div>
          <Button className='w-full mt-4'>Update</Button>
        </form>
      </SignBackground>
    </section>
  );
};

export default Setting;
