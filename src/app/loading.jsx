"use client";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function CartLoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="flex flex-col items-center">
        {/* Animated Cart */}
        <div className="relative">
          <FaShoppingCart className="w-20 h-20 text-white animate-bounce" />

          {/* Spinning wheels under cart */}
          <div className="absolute -bottom-2 left-2 w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute -bottom-2 right-2 w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h1 className="mt-8 text-2xl font-bold text-white animate-pulse tracking-wide">
          Adding to Cart...
        </h1>

        {/* Animated Dots */}
        <div className="flex space-x-2 mt-4">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.6s]"></span>
        </div>
      </div>
    </div>
  );
}

export default CartLoadingPage;
