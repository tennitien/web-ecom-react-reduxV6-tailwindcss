import React from 'react';
import CardHover from '../UI/CardHover';
import PriceChange from '../UI/PriceChange';
const ProductItem = ({ product, getItemOnClick }) => {
  return (
    <>
      <div
        id={product._id.$oid}
        className={`flex flex-col text-center gap-2 animate-fadeIn`}
      >
        <div onClick={() => getItemOnClick(product)}>
          <CardHover src={product.img1} alt={product.name} />
        </div>
        <div className='italic'>
          <p className='font-semibold'>{product.name}</p>
          <p className='text-gray-500'>
            <PriceChange price={product.price} /> VND
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
