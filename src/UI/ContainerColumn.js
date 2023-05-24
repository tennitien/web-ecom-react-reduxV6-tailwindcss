import React from 'react';

const ContainerColumn = props => {
  return (
    <div className='grid md:grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] lg:place-items-start gap-4 '>
      {props.children}
    </div>
  );
};

export default ContainerColumn;
