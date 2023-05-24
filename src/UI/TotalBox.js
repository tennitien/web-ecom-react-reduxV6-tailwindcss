import React from 'react';

const TotalBox = props => {
  return (
    <div className='bg-bgPrimary italic p-6 flex flex-col justify-between w-fit md:w-full gap-3'>
      {props.children}
    </div>
  );
};

export default TotalBox;
