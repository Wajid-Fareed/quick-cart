import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import About from "./pages/about/page";
import Home from "./pages/home/page";
import Wishlist from "./pages/wishlist/page";
import Cart from "./pages/cart/page";
import CheckoutPage from "./pages/checkout/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="about-us" element={<About />} /> */}
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
