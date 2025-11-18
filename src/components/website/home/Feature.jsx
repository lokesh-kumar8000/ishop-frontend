"use client";
import { getBrand, getCategory } from "@/library/api.call";
import React, { useEffect, useState } from "react";

function Feature() {
  const [category, setCategory] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [brandShaowAll, setbrandShaowAll] = useState(false);
  const [brands, setBrands] = useState([]);
  async function getcat(limit) {
    const allData = await getCategory(null, limit);
    setCategory(allData.data);
  }
  useEffect(() => {
    getcat(5);
  }, []);

  function limitHandler() {
    if (showAll) {
      getcat(5);
      setShowAll(false);
    } else {
      getcat();
      setShowAll(true);
    }
  }

  async function getbrands(limit) {
    const allData = await getBrand(null, limit);
    setBrands(allData.data);
  }

  useEffect(() => {
    getbrands(5);
  }, []);

  function limitHandlers() {
    if (brandShaowAll) {
      getbrands(5);
      setbrandShaowAll(false);
    } else {
      getbrands();
      setbrandShaowAll(true);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 my-7">
      {/* Left Section */}

      <div className="col-span-1 bg-white py-5 px-4 sm:py-6 sm:px-5 rounded-[15px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px] sm:text-[18px] font-bold uppercase">
            featured brands
          </h1>
          <p
            onClick={limitHandlers}
            className="text-[#666666] text-[12px] sm:text-[13px] leading-[20px] cursor-pointer"
          >
            {brandShaowAll ? "Show Less" : " View All "}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-x-14 sm:gap-y-4 pt-4 sm:pt-5">
          {brands.map((brand, i) => {
            return (
              <img key={i}
                    src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/brand/${brand.image}`}
                    alt={brand.name}
                    className="w-20 h-20 rounded-lg object-contain "
                  />
            );
          })}
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-1 bg-white py-5 px-4 sm:py-6 sm:px-5 rounded-[15px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px] sm:text-[18px] font-bold uppercase">
            top categories
          </h1>
          <p
            onClick={limitHandler}
            className="text-[#666666] text-[12px] sm:text-[13px] leading-[20px] cursor-pointer"
          >
            {showAll ? "Show Less" : " View All "}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-5 pt-4 sm:pt-5">
          {category.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/category/${data.image}`} 
                alt={data.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h4 className="text-[13px] sm:text-[14px] font-semibold leading-[20px] sm:leading-[24px] text-center mt-2">
                {data.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feature;
