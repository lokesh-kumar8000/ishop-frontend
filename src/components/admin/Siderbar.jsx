import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaChartPie,
  FaCog,
  FaTags,
} from "react-icons/fa"; 
import { IoIosColorPalette } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";

export default function Sidebar() {
  return (
    <div className="w-64 h-[100%] shadow-lg  p-5">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      {/* Menu */}
      <ul className="space-y-4">
        <li className=" p-2 rounded-lg hover:bg-blue-100 cursor-pointer">
          <Link href='/admin' className=" flex items-center gap-3 " >
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 cursor-pointer">
        <Link href='/admin/category' className="flex items-center gap-3" >
            <FaTags /> 
            <span>Category</span>
        </Link> 
          </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100  cursor-pointer">
          <Link href='/admin/color' className="flex items-center gap-3" >
           <IoIosColorPalette /> <span>Color</span>
          </Link>
        </li>
         <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100  cursor-pointer">
          <Link href='/admin/brand' className="flex items-center gap-3" >
           <SiBrandfolder /> <span>Brand</span>
          </Link>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100  cursor-pointer">
          <Link href="/admin/product" className="flex items-center gap-3" >
           <FaBox /> <span>Products</span>
          </Link>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100  cursor-pointer">
          <FaChartPie /> <span>Analytics</span>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100  cursor-pointer">
          <FaCog /> <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}
