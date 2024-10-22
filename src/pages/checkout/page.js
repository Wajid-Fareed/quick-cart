import React, { useContext, useMemo, useState } from "react";
import Container from "../../components/layout/Container";
import countryList from "react-select-country-list";
import Select from "react-select";
import { CartContext } from "../../components/layout/Layout";

const CheckoutPage = () => {
  const {
    cart,
    subtotalPrice,
    couponDiscount,
    deliveryFee,
    totalPrice,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(CartContext);

  const [country, setCountry] = useState("");
  const [formData, setFormData] = useState({});
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
    setFormData((values) => ({ ...values, country: value }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };
  const handleCheckoutFromData = () => {
    // e.preventDefault();
    setCheckoutFormData(formData);
    console.log(checkoutFormData);
  };
  // console.log(formData);
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        <div>
          <h2 className="text-2xl font-medium">Checkout</h2>
          <p>Please enter your details to complete the checkout process.</p>
          <form className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col gap-3">
                <label
                  className="block text-lg font-medium"
                  htmlFor="first_name"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="px-4 py-2 w-full rounded-sm border border-gray-300"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="block text-lg font-medium"
                  htmlFor="last_name"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="px-4 py-2 w-full rounded-sm border border-gray-300"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="block text-lg font-medium" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-4 py-2 w-full rounded-sm border border-gray-300"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="block text-lg font-medium"
                  htmlFor="phone_number"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="px-4 py-2 w-full rounded-sm border border-gray-300"
                  value={formData.phone_number || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="block text-lg font-medium" htmlFor="address">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="px-4 py-2 w-full rounded-sm border border-gray-300"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="block text-lg font-medium" htmlFor="address">
                  country:
                </label>
                <Select
                  options={options}
                  value={country}
                  onChange={changeHandler}
                  className="border-gray-300 text-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label
                className="block text-lg font-medium"
                htmlFor="other_notes"
              >
                Other Notes:
              </label>
              <textarea
                id="other_notes"
                name="other_notes"
                className="px-4 py-2 w-full h-28 rounded-xl border border-gray-300"
                value={formData.other_notes || ""}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="bg-[#EEEEEE] rounded">
          <div className="px-5 py-2">
            <h2 className="text-xl font-medium">Review Order</h2>
            <p>Please review your order details before confirming.</p>
            <div className="flex flex-col gap-4 mt-5 bg-white p-5 rounded">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    <img src={item.image} alt={item.title} className="w-24" />
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                  <p className="text-lg font-medium">
                    ${item.price} * {item.quantity}
                  </p>
                  <div className="flex items-center gap-6">
                    <p className="text-lg font-medium">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-5 flex flex-col items-center">
              <div className="flex gap-4 justify-between items-center mt-5 w-full border-b">
                <h3 className="text-lg font-medium">Subtotal</h3>
                <p className="text-lg">$ {subtotalPrice}</p>
              </div>
              <div className="flex gap-4 justify-between items-center mt-5 w-full border-b">
                <h3 className="text-lg font-medium">Coupon Discount</h3>
                <p className="text-lg">{couponDiscount} %</p>
              </div>
              <div className="flex gap-4 justify-between items-center mt-5 w-full border-b">
                <h3 className="text-lg font-medium">Delivery Fees</h3>
                <p className="text-lg">
                  {subtotalPrice !== 0
                    ? deliveryFee === 0
                      ? "free"
                      : `$ ${deliveryFee}`
                    : "$ 0"}
                </p>
              </div>
              <div className="flex gap-4 justify-between items-center mt-5 w-full border-b">
                <h3 className="text-lg font-medium">Total Price</h3>
                <p className="text-lg">$ {totalPrice}</p>
              </div>
              <div
                className="w-full mt-5"
                onClick={() => handleCheckoutFromData()}
              >
                <button className="w-full h-14 bg-black text-white font-bold focus:outline-none">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
