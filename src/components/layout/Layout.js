import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "./Container";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext(null);

const Layout = () => {
  const [menu, SetMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const handleMenu = () => SetMenu(!menu);
  const [totalCartPrice, setCartTotalPrice] = useState(0);
  const [totalTex, setTotalTex] = useState(0);
  const [subtotalPrice, setSubTotalPrice] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartCounters = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  useEffect(() => {
    setCartTotalPrice(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    setCouponDiscount(0);
  }, [cart]);
  useEffect(() => {
    setTotalTex(totalCartPrice >= 200 ? 10 : 0);
  }, [totalCartPrice]);
  useEffect(() => {
    setSubTotalPrice(totalCartPrice + totalTex);
  }, [totalCartPrice, totalTex]);
  useEffect(() => {
    if (subtotalPrice >= 500) {
      setDeliveryFee(0);
    } else {
      subtotalPrice === 0 ? setDeliveryFee(0) : setDeliveryFee(50);
    }
  }, [subtotalPrice]);
  useEffect(() => {
    setTotalPrice(subtotalPrice + deliveryFee);
  }, [subtotalPrice, deliveryFee]);
  return (
    <>
      <header className="bg-black">
        <Container>
          <nav className="flex justify-between items-center text-white h-20 w-full">
            <div className="text-xl font-semibold">
              <Link to="/">Quick Cart</Link>
            </div>
            <ul className="hidden md:flex items-center gap-6 capitalize text-lg font-semibold">
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/about-us">About</Link>
              </li> */}
              <li className="relative">
                <Link to="/wishlist">Wishlist</Link>
                {wishlist.length > 0 && (
                  <span className="text-white bg-red-500 w-6 h-5 rounded-3xl flex justify-center items-center text-xs font-light absolute -top-2 -right-2">
                    {wishlist.length}
                  </span>
                )}
              </li>
              <li className="relative">
                <Link to="/cart">cart</Link>
                {cart.length > 0 && (
                  <span className="text-white bg-red-500 w-6 h-5 rounded-3xl flex justify-center items-center text-xs font-light absolute -top-2 -right-2">
                    {cartCounters()}
                  </span>
                )}
              </li>
              {/* <li>
                <Link to="/profile">profile</Link>
              </li> */}
            </ul>
            <div className="md:hidden flex gap-5 items-center">
              <div className="relative text-xl font-semibold">
                <Link to="/cart">Cart</Link>
                {cart.length > 0 && (
                  <span className="text-white bg-red-500 w-6 h-5 rounded-3xl flex justify-center items-center text-xs font-light absolute -top-2 -right-2">
                    {cartCounters()}
                  </span>
                )}
              </div>
              <button
                className="block text-white font-bold focus:outline-none"
                onClick={handleMenu}
              >
                <HiMiniBars3BottomRight size={30} />
              </button>

              <div
                className={`fixed top-0 right-0 w-64 bg-white shadow-md transition-all duration-300 text-black text-xl font-semibold capitalize ${menu ? "block" : "hidden"
                  }`}
              >
                <button
                  className="block text-black font-bold focus:outline-none absolute top-2 right-2"
                  onClick={handleMenu}
                >
                  <ImCancelCircle size={25} />
                </button>
                <ul className="px-4 py-6 text-sm">
                  <li className="py-1">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="py-1">
                    <Link to="/about-us">About</Link>
                  </li>
                  <li className="py-1">
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                  {/* <li className="py-1">
                    <Link to="/profile">profile</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </Container>
      </header>
      <ToastContainer />
      <CartContext.Provider
        value={{
          cart,
          setCart,
          wishlist,
          setWishlist,
          totalCartPrice,
          setCartTotalPrice,
          totalTex,
          setTotalTex,
          subtotalPrice,
          setSubTotalPrice,
          couponDiscount,
          setCouponDiscount,
          deliveryFee,
          setDeliveryFee,
          totalPrice,
          setTotalPrice,
        }}
      >
        <Outlet />
      </CartContext.Provider>
      <footer className="bg-black">
        <Container className="flex justify-center items-center h-14">
          <p className="text-white text-lg font-medium">Quick Cart © 2024. All Rights Reserved</p>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
