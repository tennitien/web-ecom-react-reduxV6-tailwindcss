import React, { useEffect } from 'react';
import { Navbar, Footer, LiveChat } from '../components';
import { Outlet, json, useLoaderData } from 'react-router';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { productListActions } from '../store/productListSlice';

const Root = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  useEffect(() => {
    dispatch(cartActions.GET_CART());
    dispatch(productListActions.setProduct(data));
  }, []);
  return (
    <>
      <main>
        <Navbar />
        <div className='mt-16'>
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
