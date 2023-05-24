import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { popupActions } from '../store/popupSlice';
import { useDispatch } from 'react-redux';
import { useRouteLoaderData } from 'react-router';

const Products = () => {
  // get data from API
  const dataRoot = useRouteLoaderData('root');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Chỉ hiển thị tối đa 8 phần tử đầu tiên của danh sách trả về từ API.
    setProducts(dataRoot.slice(0, 8));
  }, [dataRoot]);

  // add action and value to  popupSlice >> open Popup
  const dispatch = useDispatch();
  const getItemOnClick = product => {
    dispatch(popupActions.SHOW_POPUP(product));
  };
  return (
    <>
      <section id='products' className='container'>
        <div className='flex flex-col italic uppercase'>
          <p className='text-gray-500'>made the hard way</p>
          <h2>top trending products</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4'>
          {products.map((product, i) => (
            <ProductItem
              key={i}
              product={product}
              getItemOnClick={getItemOnClick}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
