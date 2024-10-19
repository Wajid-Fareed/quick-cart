import React from "react";
import Container from "../../components/layout/Container";
import { productData } from "../../data";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  return (
    <Container className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-8">
      {productData.map((item) => (
        <div key={item.id} className="px-2 relative group">
          <span className="absolute top-3 right-6 opacity-0 transform transition-opacity group-hover:opacity-100 cursor-pointer">
            <FaHeart size={25} className="text-black" />
          </span>
          <img src={item.image} alt={item.title} className="w-full" />
          <div>
            <div className="flex gap-3 items-center justify-between border-b px-2 py-1">
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
            </div>
            <p className="px-2 py-1">{item.description}</p>
            <div className="text-center py-2">
              <button className="px-4 py-2 rounded-3xl bg-black text-white border border-black hover:bg-white hover:text-black text-base font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Home;
