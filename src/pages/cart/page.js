import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/layout/Layout";
import Container from "../../components/layout/Container";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { couponData } from "../../data";

const Cart = () => {
  const {
    cart,
    setCart,
    totalCartPrice,
    totalTex,
    subtotalPrice,
    setSubTotalPrice,
    couponDiscount,
    setCouponDiscount,
  } = useContext(CartContext);
  const [couponFormData, setCouponFormData] = useState("");
  const handleRemoveFromCart = (id) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== id));
    }
  };
  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  const handleDeleteFromCart = (id) => {
    setCart(cart.filter((cartItem) => cartItem.id !== id));
  };

  useEffect(() => {
    setSubTotalPrice(totalCartPrice + totalTex);
    setCouponDiscount(0);
  }, [totalCartPrice, totalTex]);
  const handleDiscountToCart = (e) => {
    e.preventDefault();
    const coupon = couponData.find((item) => item.key === couponFormData);
    setCouponDiscount(coupon.discountPercent);

    if (coupon) {
      const discountAmount = totalCartPrice * (coupon.discountPercent / 100);
      setSubTotalPrice(totalCartPrice - discountAmount + totalTex);
    }
  };
  return (
    <>
      <Container className="py-4">
        <h2 className="text-4xl font-bold text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
          <div>
            <div className="overflow-auto max-h-[60vh]">
              <table className="w-full">
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">
                        <div className="flex gap-4 items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20"
                          />
                          <h2 className="text-xl font-medium">{item.title}</h2>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-between w-28 h-14 border ms-auto">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                          >
                            +
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-end">
                        <div>
                          <p>{item.price * item.quantity}</p>
                        </div>
                      </td>
                      <td className="p-3 text-end">
                        <div>
                          <button
                            onClick={() => handleDeleteFromCart(item.id)}
                            className="w-20 h-10 flex justify-end items-center text-xl font-semibold text-black"
                          >
                            <RxCross1 size={30} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalCartPrice > 0 ? (
              <div className="mt-5">
                <form
                  className="flex gap-4 items-end"
                  onSubmit={handleDiscountToCart}
                >
                  <div className="flex gap-2 flex-col flex-grow">
                    <label htmlFor="cart_coupon" className="text-xl font-bold">
                      Apply coupon:
                    </label>
                    <input
                      type="text"
                      id="cart_coupon"
                      name="coupon"
                      className="border h-14 px-4"
                      placeholder="Coupon Code"
                      onChange={(e) => setCouponFormData(e.target.value)}
                      value={couponFormData}
                      disabled={couponDiscount > 0}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponDiscount > 0}
                    className={`bg-black text-white font-bold focus:outline-none h-14 px-8 ${
                      couponDiscount > 0 ? "bg-zinc-700" : ""
                    }`}
                  >
                    Apply
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-bold">No items in cart</h2>
                <div className="text-end">
                  <button className="bg-black text-white font-bold focus:outline-none h-14 px-8">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border text-center">
            <h2 className="text-2xl font-bold">Total Cart</h2>
            <div className="flex flex-col gap-6 mt-5">
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">Subtotal:</p>
                <span className="text-xl font-medium">$ {totalCartPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">Coupon Discount:</p>
                <span className="text-xl font-medium">{couponDiscount} %</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">Tax:</p>
                <span className="text-xl font-medium">$ {totalTex}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">Total:</p>
                <span className="text-xl font-medium">${subtotalPrice}</span>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/checkout"
                  className="bg-black text-white font-bold focus:outline-none h-14 px-8 w-full flex justify-center items-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
