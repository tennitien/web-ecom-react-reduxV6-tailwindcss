import React from 'react';
import { useSelector } from 'react-redux';

import { Header } from '../components';
import { Button, ContainerColumn, TotalBox, PriceChange } from '../UI';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
const CheckoutPage = () => {
  const listCart = useSelector(state => state.cart.listCart);

  const totalCart = useSelector(state => state.cart.totalCart);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required name'),
      email: Yup.string().required('Required email').email(),
      phone: Yup.string()
        .required('Required phone')
        .min(10, 'Phone must be at least 10'),
      address: Yup.string().required('Required address'),
    }),

    onSubmit: values => {
      const bill = values;
      console.log(bill);
      alert('Order success!');
    },
  });
  return (
    <>
      <section className='container italic'>
        <Header title='checkout'>
          <Link to={'/'}>home / </Link>
          <Link to={'/cart'}>cart / </Link>
          <Link className='text-gray-500' to={'/checkout'}>
            checkout
          </Link>
        </Header>

        <article id='checkout'>
          <h3>BILLING DETAILS</h3>
          <ContainerColumn>
            {/* TODO: BILLING DETAILS */}
            <form action='' onSubmit={formik.handleSubmit} className='w-full'>
              <div className='form-control flex flex-col gap-2 mt-4 '>
                <label htmlFor='name'>FULL NAME</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Enter Your Full Name Here!'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && (
                  <p className='text-red-500 '> {formik.errors.name} </p>
                )}
              </div>

              <div className='form-control flex flex-col gap-2 mt-4'>
                <label htmlFor='email'>EMAIL</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter Your Full Email Here!'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <p className='text-red-500 '> {formik.errors.email} </p>
                )}
              </div>

              <div className='form-control flex flex-col gap-2 mt-4'>
                <label htmlFor='phone'>PHONE NUMBER</label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  placeholder='Enter Your Phone Number Here!'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && (
                  <p className='text-red-500 '> {formik.errors.phone} </p>
                )}
              </div>

              <div className='form-control flex flex-col gap-2 mt-4'>
                <label htmlFor='address'>ADDRESS</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Enter Your Address Here!'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address && (
                  <p className='text-red-500 '> {formik.errors.address} </p>
                )}
              </div>
              <div className='form-action mt-6'>
                <Button>Place order</Button>
              </div>
            </form>
            {/* TODO: YOUR ORDER*/}
            <TotalBox>
              <h3>YOUR ORDER</h3>
              {/* list cart */}
              {listCart &&
                listCart.map((item, index) => (
                  <p key={index} className='flex-b-c border-b border-gray-400'>
                    <span className='font-semibold text-sm'>{item.name}</span>
                    <span className='text-gray-500 text-sm'>
                      <PriceChange price={item.price} /> VND x {item.quantity}
                    </span>
                  </p>
                ))}

              {/* total cart */}
              <p className='flex-b-c'>
                <span className='font-semibold  mr-4'>TOTAL </span>
                <span className='text-gray-500 text-md'>
                  <PriceChange price={totalCart} /> VND
                </span>
              </p>
            </TotalBox>
          </ContainerColumn>
        </article>
      </section>
    </>
  );
};

export default CheckoutPage;
