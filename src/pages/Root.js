import React, { useEffect, useState } from 'react';
import { Navbar, Footer, LiveChat } from '../components';
import { Outlet, json, useLoaderData } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { productListActions } from '../store/productListSlice';

import styles from '../style';
import { loginActions, loginSelector } from '../store/loginSlice';
const Root = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();

  const checkStore = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return username && token ? true : false;
  };

  useEffect(() => {
    dispatch(productListActions.setProduct(data));
    if (checkStore()) {
      dispatch(cartActions.GET_CART());
      dispatch(loginActions.ON_LOGIN);
      console.log(1463847);
    }
  }, []);

  //
  const [user, setUser] = useState(null);

  return (
    <>
      <main>
        <Navbar />
        <div className={`${styles.boxContainer}`}>
          {/* <div className='mt-16'> */}
          <Outlet />
        </div>
        <LiveChat />
        <Footer />
      </main>
    </>
  );
};

export default Root;
export async function loader({ request, params }) {
  const url =
    'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';
  const response = await fetch(url);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();
    return data;
  }
}
