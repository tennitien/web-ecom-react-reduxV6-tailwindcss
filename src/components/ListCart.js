import React from 'react';
import { useSelector } from 'react-redux';
import { PriceChange } from '../UI';

const ListCart = () => {
  const listCart = useSelector(state => state.cart.listCart);
  const totalCart = useSelector(state => state.cart.totalCart);
  return (
    <>
      {listCart.map((item, index) => (
        //   className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center justify-items-center italic text-sm'
        <div
          className='grid grid-cols-[1fr_4fr_1fr] gap-4 items-center justify-items-center italic text-sm'
          key={index}
        >
          <img src={item.img} alt='' />
          <div className='font-bold text-center '>{item.name}</div>
          <div className=' text-center'>
            <p>
              <PriceChange price={item.price} />
            </p>
            <p>VND</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCart;
