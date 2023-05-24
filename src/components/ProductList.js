import React, { useEffect, useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
const ProductList = () => {
  // get data from redux
  const categories = useSelector(state => state.productList.categories);
  // get data from API
  const dataRoot = useRouteLoaderData('root');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(dataRoot);
  }, [dataRoot]);

  let productsFilter;
  if (categories === 'all') {
    productsFilter = products;
  } else {
    productsFilter = products.filter(
      item => item.category.toLowerCase() === categories.toLowerCase()
    );
  }
  const getItemOnClick = product => {};
  return (
    <section>
      <div id='productList' className='grid grid-cols-2 md:grid-cols-3 '>
        {productsFilter.length ? (
          productsFilter.map((item, index) => (
            <Link to={`/detail/${item._id.$oid}`} key={index}>
              <ProductItem product={item} getItemOnClick={getItemOnClick} />
            </Link>
          ))
        ) : (
          <p>No found product</p>
        )}
      </div>
      {/*  */}
      <div className=' flex items-end flex-col gap-2'>
        <div className='btn-group'>
          <button className='btn btn-outline'>
            <FaAngleDoubleLeft />
          </button>
          <button className='btn'>1</button>
          <button className='btn btn-outline'>
            <FaAngleDoubleRight />
          </button>
        </div>
        {productsFilter.length ? (
          <p className='italic'>
            Showing 1 - {productsFilter.length} of {productsFilter.length}{' '}
            results
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default ProductList;
