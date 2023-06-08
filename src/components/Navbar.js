import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import style from '../style';
import { FaShoppingCart, FaUserAlt, FaCaretDown, FaBars } from 'react-icons/fa';
import { loginActions } from '../store/loginSlice';
import ListCart from './ListCart';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const tokenStore = JSON.parse(localStorage.getItem('token'));
  const login = user && tokenStore ? true : false;
  let number = useSelector(state => state.cart.numberCart);

  // const links = [
  //   { id: 0, name: 'Home', path: '/' },
  //   { id: 1, name: 'Shop', path: '/shop' },
  //   {
  //     id: 2,
  //     name: 'Cart',
  //     path: login ? '/cart' : '/register',
  //     numberCart: number,
  //     icon: <FaShoppingCart />,
  //   },
  //   {
  //     id: 3,
  //     name: login ? user : 'Login',
  //     path: '/register',
  //     icon: <FaUserAlt />,
  //   },
  // ];

  // const navLinks = links.map((item, index) => (
  //   <li className={`${style.flexCenter} gap-2`} key={index}>
  //     <div className='relative gap-2 '>
  //       {item.icon}
  //       {item.numberCart && (
  //         <span
  //           className={`absolute top-0 right-0 -translate-y-4 translate-x-4  px-2 bg-neutral-700 text-white text-sm rounded-full ${
  //             user ? '' : 'hidden'
  //           }`}
  //         >
  //           {item.numberCart}
  //         </span>
  //       )}
  //     </div>

  //     <NavLink
  //       to={`${item.path}`}
  //       className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
  //     >
  //       {item.name}
  //     </NavLink>
  //   </li>
  // ));
  // ------------------ ///

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('listCart');
    localStorage.removeItem('token');
    dispatch(loginActions.ON_LOGOUT);

    navigate('/');
  };

  const buttonClass = 'link link-hover focus:text-second';

  const [windowSize, setWindowSize] = useState(768);
  const [isOpenNavbar, setIsOpenNavbar] = useState(true);

  // Responsive for Navbar
  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWindowSize(window.innerWidth);
  //   }
  //   window.addEventListener('resize', handleWindowResize);
  //   // for screen tablet , laptop
  //   if (windowSize >= 768) setIsOpenNavbar(true);
  //   else setIsOpenNavbar(false);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, [windowSize]);
  // const toggleNavbar = () => {
  //   setIsOpenNavbar(pre => !pre);
  // };
  // const linkClass = `flex flex-col items-start md:flex-row gap-4 md:text-lg md:opacity-1 ${
  //   isOpenNavbar ? '' : 'hidden'
  // }`;
  // Responsive for Navbar --end--
  const nameWeb = 'boutique';
  const homeLink = (
    <li className={`${style.flexCenter} gap-2`}>
      <NavLink
        to='/'
        className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
      >
        Home
      </NavLink>
    </li>
  );
  const shopLink = (
    <li className={`${style.flexCenter} gap-2`}>
      <NavLink
        to='/shop'
        className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
      >
        Shop
      </NavLink>
    </li>
  );
  const cartLink = (
    <>
      <li className={`${style.flexCenter} gap-2 ${style.tooltipContainer}`}>
        <div className=' gap-2 relative'>
          <FaShoppingCart />
          <span
            className={`absolute top-0 right-0 -translate-y-4 translate-x-4  px-2 bg-neutral-700 text-white text-sm rounded-full ${
              user ? '' : 'hidden'
            }`}
          >
            {number ? number : 0}
          </span>
        </div>
        {login && (
          <div
            className={`${style.tooltipItem} w-[400px] translate-x-[10%] translate-y-[12%]`}
          >
            <ListCart />
            <button
              className='mt-5 btn btn-warning border-none w-full'
              onClick={() => navigate('/cart')}
            >
              Go to cart
            </button>
          </div>
        )}
        <NavLink
          to={login ? '/cart' : '/register'}
          className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
        >
          Cart
        </NavLink>
      </li>
    </>
  );
  const loginLink = (
    <li className={`${style.flexCenter} gap-2 ${style.tooltipContainer}`}>
      <div className=' gap-2 '>
        <FaUserAlt />
      </div>
      {login && (
        <div className={`${style.tooltipItem} w-[130px] translate-y-[50%]`}>
          <div
            className='hover:text-primary cursor-pointer'
            onClick={logoutHandler}
          >
            Logout
          </div>
        </div>
      )}
      <NavLink
        to='/register'
        className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
      >
        {login ? user : 'Login'}
      </NavLink>
    </li>
  );
  let [open, setOpen] = useState(false);
  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-1000 relative`}>
        <div
          className={`${style.boxContainer} ${style.flexBetweenMd} ${style.padding} bg-white`}
        >
          <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800'>
            <Link to='/'>
              <h1>{nameWeb}</h1>
            </Link>
            <p>Serach</p>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'
          >
            <ion-icon name={open ? 'close' : 'menu'}>
              <FaCaretDown />
            </ion-icon>
          </div>

          <ul
            className={`flex flex-col md:flex md:flex-row  gap-6  ${
              style.padding
            } ${open ? 'hidden' : ''} `}
          >
            {homeLink}
            {shopLink}
            {cartLink}
            {loginLink}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
