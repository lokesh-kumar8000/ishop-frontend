"use client";
import React from "react";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center">
        {/* Big 404 */}
        <h1 className="text-9xl font-extrabold animate-bounce">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page not found</p>
        <p className="mt-2 text-lg text-gray-200">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 flex items-center mx-auto gap-2 px-6 py-3 bg-white text-purple-600 rounded-2xl font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          <FaHome />
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage; 
