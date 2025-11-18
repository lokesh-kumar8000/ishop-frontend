"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function BrandFilter({ brands }) {
  const router = useRouter();
  const [selBrand, setSelBrand] = useState(null);

  useEffect(() => {
    const brand = new URLSearchParams({ brand: selBrand });
    if (selBrand) {
      router.push(`?${brand.toString()}`);
    }
  }, [selBrand]);

  return (
    <div className=" py-7 bg-[#EEEFF6] p-[30px] rounded-[10px] my-5 ">
      <h4 className=" font-bold text-[14px] ">By Brands</h4>
      <Link href={"/store"}>
        <button className=" text-[12px] font-bold bg-white px-3 py-2 rounded-[10px] my-4 cursor-pointer ">
          All Brands
        </button> 
      </Link>
      <div className=" pb-3 ">
        <ul>
          {brands &&
            brands?.map((data, index) => {
              return (
                <li
                  onClick={() => setSelBrand(data.slug)}
                  className=" text-[14px] leading-5 mb-2 flex justify-between cursor-pointer "
                  key={index}
                >
                  {data.name} <span>({data.brandCount})</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default BrandFilter;
