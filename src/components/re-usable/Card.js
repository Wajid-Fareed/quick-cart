import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../layout/Layout";

const Card = ({ item }) => {
  const { cart, setCart , wishlist, setWishlist } = useContext(CartContext);

  const handleAddToCart = () => {
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

  const hanldeAddToWishlist = () => {
    const existingwisklist = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
    const existingcart = cart.find((wishlistItem) => wishlistItem.id === item.id);
    if(!existingwisklist && !existingcart ) {
      setWishlist([...wishlist , item]);
    }
  }
  return (
    <div className="px-2 relative group">
      <span className="absolute top-3 right-6 opacity-0 transform transition-opacity group-hover:opacity-100 cursor-pointer" onClick={hanldeAddToWishlist}>
        <FaHeart size={25} className="text-black" />
      </span>
      <img src={item.image} alt={item.title} className="w-full max-h-[360px] object-cover" />
      <div>
        <div className="flex gap-3 items-center justify-between border-b px-2 py-1">
          <h2>{item.title}</h2>
          <p>Price: ${item.price}</p>
        </div>
        <p className="px-2 py-1">{item.description}</p>
        <div className="text-center py-2">
          <button
            className="px-4 py-2 rounded-3xl bg-black text-white border border-black hover:bg-white hover:text-black text-base font-medium"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
