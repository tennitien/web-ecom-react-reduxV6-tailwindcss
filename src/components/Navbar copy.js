import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaShoppingCart, FaUserAlt, FaCaretDown, FaBars } from 'react-icons/fa';

import { loginActions } from '../store/loginSlice';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let number = useSelector(state => state.cart.numberCart);
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('listCart');
    dispatch(loginActions.ON_LOGOUT);

    navigate('/');
  };

  const buttonClass = 'link link-hover focus:text-second';
  const nameWeb = 'boutique';

  const [windowSize, setWindowSize] = useState(768);
  const [isOpenNavbar, setIsOpenNavbar] = useState(true);

  // Responsive for Navbar
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowResize);
    // for screen tablet , laptop
    if (windowSize >= 768) setIsOpenNavbar(true);
    else setIsOpenNavbar(false);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);
  const toggleNavbar = () => {
    setIsOpenNavbar(pre => !pre);
  };
  const linkClass = `flex flex-col items-start md:flex-row gap-4 md:text-lg md:opacity-1 ${
    isOpenNavbar ? '' : 'hidden'
  }`;
  // Responsive for Navbar --end--

  return (
    <nav id='navbar' className='bg-white fixed left-0 top-0 w-full z-50'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center container'>
        {/* name web */}
        <div className='flex justify-between md:order-1 w-11/12 md:w-fit '>
          <h1
            onClick={() => navigate('/')}
            className='italic uppercase text-center cursor-pointer '
          >
            {nameWeb}
          </h1>
          <button
            className='md:hidden btn btn-ghost rounded-full'
            onClick={toggleNavbar}
          >
            <FaBars />
          </button>
        </div>

        {/* left */}
        <div className={`${linkClass} md:order-0`}>
          <NavLink
            to={'/'}
            className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
          >
            Home
          </NavLink>
          <button className={buttonClass} onClick={() => navigate('/shop')}>
            Shop
          </button>
        </div>

        {/* right */}
        <div className={`${linkClass} order-2`}>
          <button
            className={`indicator flex items-center gap-2 ${buttonClass}`}
            onClick={() => navigate(user === null ? '/' : '/cart')}
          >
            <FaShoppingCart />
            Cart
            <span
              className={`badge badge-sm indicator-item  ${
                user ? '' : 'hidden'
              }`}
            >
              {number}
            </span>
          </button>
          <button
            className={`flex items-center gap-2 ${buttonClass}`}
            onClick={() => navigate(user === null ? '/register' : '')}
          >
            <FaUserAlt />
            {user ? user : 'Login'}
            {user && <FaCaretDown />}
          </button>
          {user && (
            <button className={`${buttonClass}`} onClick={logoutHandler}>
              (Logout)
            </button>
          )}
        </div>
      </div>
      {/*  */}
    </nav>
  );
};

export default Navbar;
