import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left: Logo or Title */}
      <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>

      {/* Center: Search */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-72">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm flex-1"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-gray-800" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800" />
      </div>
    </header>
  );
}
