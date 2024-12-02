import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    name = "Unknown Customer",
    studioType = "Unknown Studio",
    time = "Unknown Time",
    subtotal = 0,
    discount = 0,
    totalPrice = 0,
  } = location.state || {};

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 font-sans">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/400"
            alt="Studio"
            className="rounded-lg w-full"
          />
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-700 text-sm mb-2">{name}</p>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
            <span>{studioType}</span>
            <span>{time}</span>
          </div>
          <hr className="border-gray-300 mb-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="font-semibold">${discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Total Price</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          <p className="text-gray-700 text-sm mb-1">Bri M-Banking</p>
          <p className="text-gray-600 text-xs">Payment ID: ASB1473</p>
          <p className="text-gray-600 text-xs mb-6">
            Card Number: 1201232931398
          </p>

          <button
            className="w-full bg-blue-100 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
            onClick={() =>
              navigate("/confirmation", {
                state: { name, studioType, totalPrice },
              })
            }
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
