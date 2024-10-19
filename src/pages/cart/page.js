import React, { useContext } from "react";
import { CartContext } from "../../components/layout/Layout";
import Container from "../../components/layout/Container";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
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
  return (
    <>
      <Container className="py-4">
        <h2 className="text-4xl font-bold text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 py-6">
          <div>
            <table className="w-full space-y-2">
              <tr>
                <th className="px-2 text-2xl font-bold text-start">Product</th>
                <th className="px-2 text-2xl font-bold text-end">Quantity</th>
                <th className="px-2 text-2xl font-bold text-end">Price</th>
                <th className="px-2 text-2xl font-bold text-end">Sub Price</th>
              </tr>

              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="px-2">
                    <div className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-20" />
                      <h2 className="text-xl font-medium">{item.title}</h2>
                    </div>
                  </td>
                  <td className="px-2">
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
                  <td className="px-2 text-end">
                    <div>
                      <p>{item.price}</p>
                    </div>
                  </td>
                  <td className="px-2 text-end">
                    <div>
                      <p>{item.price * item.quantity}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div></div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
