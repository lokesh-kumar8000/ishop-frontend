"use client";
import React, { useEffect, useState } from "react";
import { FaLaptop } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { GiSmartphone } from "react-icons/gi";
import { FaTabletScreenButton } from "react-icons/fa6";
import { IoCameraSharp } from "react-icons/io5";
// import { LuSend } from "react-icons/lu";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getCategory } from "@/library/api.call";

function Hero() { 
  const [ Category , setCategory ] = useState([])

 async function getcat(limit) {
    const allData = await getCategory(null, limit);
    setCategory(allData.data);
  }
  useEffect(() => {
    getcat(5);
  }, []);


  const heros = [
    {
      img: "/images/homeHero.png",
      msg: (
        <h1 className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold leading-tight">
          Don’t miss amazing <br className="hidden sm:block" /> grocery deals
        </h1>
      ),
    },
    {
      img: "/images/homeHero.png",
      msg: (
        <h1 className="text-[48px] lg:text-[72px] font-bold leading-tight">
          Don’t miss amazing <br className="hidden sm:block" /> grocery deals
        </h1>
      ),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    waitForAnimate: false
    // cssEase: "linear"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* left section */}
      <div className="bg-white p-5 rounded-[15px]">
        <h1 className="text-[#253D4E] font-bold text-[20px] md:text-[24px] border-b-2 border-[#ECECEC] pb-3">
          Category
        </h1>
        <div className="pt-5 space-y-3">
          {Category.map((cat, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-[#F2F3F4] px-4 py-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                <span className="text-[13px] md:text-[15px] font-semibold">
                  {cat.name}
                </span>
              </div>
              <div className="flex justify-center items-center h-[24px] w-[24px] rounded-full bg-[#01A49E78] text-[12px]">
                {cat.productCount} 
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right section */}

      <div className="lg:col-span-3 ">
        <Slider {...settings}>
          {heros.map((hero, i) => (
            <div
              key={i}
              className="relative min-h-[400px] rounded-[20px] md:rounded-[30px] overflow-hidden flex items-center justify-center p-6"
            >
              {/* Background Image */}
              <img
                src={hero.img}
                alt={`hero-${i}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="relative z-10 text-white text-center lg:text-left max-w-2xl">
                {hero.msg}
                <div className="mt-8">
                  <Link
                    href="/store"
                    className="bg-[#01A49E] px-4 sm:px-6 lg:px-[40px] py-2 sm:py-3 lg:py-[22px] rounded-full text-sm sm:text-base"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* Optional overlay for dark effect */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
