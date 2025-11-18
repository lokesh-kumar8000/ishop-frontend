"use client";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { lstoCart } from "@/redux/features/cartSlice";
import { userAdd } from "@/redux/features/userSlice";
import { formatIndianCurrency } from "@/library/helper";

export default function Header() {
  const dispatcher = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatcher(lstoCart());
    dispatcher(userAdd());
  }, [dispatcher]);
  // console.log(user,'user');

  return (
    <div className="  w-full  ">
      <div className=" bg-white rounded-[10px] shadow pb-[25px] px-[30px]">
        {/* Top section */}
        <div className="py-3 px-4 flex flex-wrap items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-[#EBEEF6] text-[12px] py-[4px] px-[10px] flex items-center rounded-[6px]">
              Hotline 24/7
            </div>
            <div className="text-[12px] font-bold">(025) 3886 25 16</div>
          </div>
          <div className="hidden sm:flex items-center space-x-3.5">
            <div className="text-[14px] cursor-pointer">Sell on Swoo</div>
            <div className="text-[14px] cursor-pointer">Order Tracki</div>
            <div className="ml-6">
              <select
                id="currency"
                name="currency"
                className="text-[14px] border rounded px-2 py-1"
              >
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
              </select>
            </div>
            <div className="ml-4">
              <select
                id="langauge"
                name="langauge"
                className="text-[14px] border rounded px-2 py-1"
              >
                <option value="hindi">Hindi</option>
                <option value="eng">English</option>
                <option value="guj">Gujarati</option>
                <option value="punjabi">Punjabi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navbar section */}
        <nav className="flex py-3 px-4 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <div className="mr-10">
              <img src="/images/logo.png" height={40} width={161} alt="logo" />
            </div>
            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 uppercase font-bold text-[14px]">
              <Link href="/">
                <li className="cursor-pointer hover:text-green-600">Home</li>
              </Link>
              <Link href="/about">
                <li className="cursor-pointer hover:text-green-600">ABOUT</li>
              </Link>
              <Link href="/profile-view">
                <li className="cursor-pointer hover:text-green-600">PROFILE</li>
              </Link>
              <Link href="/store">
                <li className="cursor-pointer hover:text-green-600">Store</li>
              </Link>
              <Link href="/contact">
                <li className="cursor-pointer hover:text-green-600">
                  Contacts
                </li>
              </Link>
            </ul>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <div className="ml-2  hidden sm:block">
              {user?.data ? (
                <p className="font-bold text-[14px] uppercase "> hi {user?.data?.name} </p>
              ) : (
                <Link href={'/user-login'} > <p className="font-bold text-[14px]">Log in / Register</p> </Link>
              )}
            </div>

            <Link href="/cart">
              <div className="ml-[15px] h-[40px] w-[40px] bg-[#EBEEF6] rounded-full flex items-center justify-center relative">
                <span className="text-[18px]">
                  <BsCart />
                </span>
                <div className="h-[20px] w-[20px] bg-[#1ABA1A] rounded-full absolute top-[25px] left-[25px] text-[11px] text-white flex justify-center items-center">
                  {cart?.items.length || 0}
                </div>
              </div>
            </Link>
            <Link href="/cart">
              <div className="hidden sm:block">
                <p className="text-[11px] text-[#666666]">Cart</p>
                <p className="font-bold text-[14px]"> {formatIndianCurrency(cart.final_total)} </p>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-3 text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiOutlineMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#f8f9fb] px-4 py-3 space-y-3">
            <ul className="space-y-2 font-bold text-[14px] uppercase">
              <Link href="/">
                <li className="cursor-pointer hover:text-green-600">Home</li>
              </Link>
              <Link href="/about">
                <li className="cursor-pointer hover:text-green-600">ABOUT</li>
              </Link>
              <Link href="/profile-view">
                <li className="cursor-pointer hover:text-green-600">PROFILE</li>
              </Link>
              <Link href="/store">
                <li className="cursor-pointer hover:text-green-600">Store</li>
              </Link>
              <Link href="/contact">
                <li className="cursor-pointer hover:text-green-600">
                  Contacts
                </li>
              </Link>
            </ul>
            <div className="mt-4 space-y-3">
              <select className="w-full border rounded px-2 py-1">
                <option>USD</option>
                <option>INR</option>
                <option>EUR</option>
              </select>
              <select className="w-full border rounded px-2 py-1">
                <option>Hindi</option>
                <option>English</option>
                <option>Gujarati</option>
                <option>Punjabi</option>
              </select>
            </div>
          </div>
        )}
        {/* <Search/>  */}
        {/* <Search /> */}
      </div>
    </div>
  );
}
