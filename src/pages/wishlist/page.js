import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlist, setWishlist, setCart } = useContext(CartContext);
  const [wishlistData, setWishlistData] = useState(() => {
    const localWishlistData = localStorage.getItem("Wishlist");
    const initialWishlist = localWishlistData ? JSON.parse(localWishlistData) : [];
    return initialWishlist;
  });

  const handleDeleteFromWishlist = (item) => {
    const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
    setWishlist(updatedWishlist);
    setWishlistData(updatedWishlist);
    localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
    toast.success("Product Remove From Wishlist Successfully!", { autoClose: 1000 });
  };

  const handleAddToCartFromWishlist = (item) => {
    setCart((cart) => [
      ...cart,
      { ...item, quantity: item.quantity ? item.quantity + 1 : 1 },
    ]);
    const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
    setWishlist(updatedWishlist);
    setWishlistData(updatedWishlist);
    localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
    toast.success("Product Added To Cart Successfully!", { autoClose: 1000 });

  };
  useEffect(() => {
    const localWishlistData = localStorage.getItem("Wishlist");
    const initialWishlist = localWishlistData ? JSON.parse(localWishlistData) : [];
    setWishlist(initialWishlist);
  },[]);

  return (
    <Container className="py-9">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Wishlist</h1>
      </div>
      {wishlist && wishlist.length > 0 ? (
        <div className="min-w-full overflow-x-auto min-h-[73vh]">
          <div className="flex justify-between items-center py-4 border-b gap-10 min-w-[975px]">
            <h2 className="text-2xl font-bold flex-grow w-[350px]">Products</h2>
            <h2 className="text-2xl font-bold w-52 text-center">Price</h2>
            <h2 className="text-2xl font-bold w-[330px] text-center">Actions</h2>
          </div>
          {wishlist.map((item) => (
            <div className="flex justify-between items-center py-4 border-b gap-10 min-w-[975px]" key={item.id}>
              <div className="flex gap-5 items-center flex-grow w-[350px]">
                <img src={item.image} alt={item.title} className="w-24" />
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="w-52 text-center">
                <p className="text-xl font-semibold">{item.price}</p>
              </div>
              <div>
                <button
                  className="bg-black text-white text-xl font-semibold w-52 h-14 flex justify-center items-center rounded-md"
                  onClick={() => handleAddToCartFromWishlist(item)}
                >
                  Add to Cart
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteFromWishlist(item)}
                  className="w-20 h-10 flex justify-end items-center text-xl font-semibold text-black"
                >
                  <RxCross1 size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 min-h-[73vh]">
          <h2 className="text-2xl font-medium">Wishlist is empty.</h2>
          <Link
            to="/"
            className="bg-black text-white rounded-md w-40 h-10 flex justify-center items-center"
          >
            Back to Home
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
