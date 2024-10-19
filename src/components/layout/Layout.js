import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "./Container";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";

const Layout = () => {
  const [ShowMenu, Menu] = useState(false);
  const handleMenu = () => Menu(!ShowMenu);
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
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="relative">
                <Link to="/cart">cart</Link>
                <span className="text-white bg-red-500 w-6 h-5 rounded-3xl flex justify-center items-center text-xs font-light absolute -top-2 -right-2">
                  22
                </span>
              </li>
              <li>
                <Link to="/profile">profile</Link>
              </li>
            </ul>
            <div className="md:hidden flex gap-5 items-center">
              <div className="relative text-xl font-semibold">
                <Link to="/cart">Cart</Link>
                <span className="text-white bg-red-500 w-6 h-5 rounded-3xl flex justify-center items-center text-xs font-light absolute -top-2 -right-2">
                  22
                </span>
              </div>
              <button
                className="block text-white font-bold focus:outline-none"
                onClick={handleMenu}
              >
                <HiMiniBars3BottomRight size={30} />
              </button>

              <div
                className={`fixed top-0 right-0 w-64 bg-white shadow-md transition-all duration-300 text-black text-xl font-semibold capitalize ${
                  ShowMenu ? "block" : "hidden"
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
                  <li className="py-1">
                    <Link to="/profile">profile</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
