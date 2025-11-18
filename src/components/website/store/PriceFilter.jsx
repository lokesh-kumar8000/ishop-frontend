"use client";
import { number } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState([200 ,200000]);

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    setPrice([Number(min), Number(max)]);
  }, [searchParams]);

  const changeHandler = (data) => {
    setPrice(data);
    const price = new URLSearchParams();
    price.set("min", data[0]);
    price.set("max", data[1]);
    router.push(`?${price.toString()}`);
  };
  return (
    <div className=" py-7 bg-[#EEEFF6] p-[30px] rounded-[10px] my-5 ">
      <h4 className=" font-bold text-[14px] pb-3 "> Price Filter </h4>
      <div className=" my-6 ">
        <label> {price[0]} </label>
        <span>-</span>
        <label> {price[1]} </label>
      </div>
      <div className=" my-4">
        <RangeSlider
          min="200"
          max="200000"
          value={price}
          // defaultValue={[200, 200000]}
          onInput={changeHandler}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
