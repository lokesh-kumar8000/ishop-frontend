"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function ThankYouPage({ params }) {
  
  const { orderId } = React.use(params);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-[1.02]">
        
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-40"></div>
          <FaCheckCircle className="text-green-600 w-20 h-20 relative z-10" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Successful! 🎉
        </h1>

        <p className="text-gray-700 mb-6 text-lg">
          Your order 
          <span className="font-semibold text-blue-600"> #{orderId}</span>  
          <br />has been placed successfully.
        </p>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
