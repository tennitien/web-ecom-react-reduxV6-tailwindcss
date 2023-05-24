import React from 'react';

const Button = props => {
  return (
    <button
      // className={`py-3 px-5 drop-shadow-lg bg-gray-900 text-white cursor-pointer italic hover:bg-gray-800 hover:-translate-y-0.5`}
      className={`btn rounded-none hover:bg-second hover:border-second  hover:text-neutral-800 font-light ${props.className}`}
      onClick={props.onClick}
      type={'text' || props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
