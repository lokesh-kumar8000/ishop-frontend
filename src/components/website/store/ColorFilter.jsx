"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react"; 


function ColorFilter({ color }) {
  const router = useRouter();
  const [selColor, setSelColor] = useState(null);

  useEffect(() => {
    const color = new URLSearchParams({ color: selColor });
    
    if (selColor) { 
      router.push(`?${color.toString()}`);   
    } 
  }, [selColor]); 

  return (
    <div className=" py-7 bg-[#EEEFF6] p-[30px] rounded-[10px] my-5 "> 
      <h4 className=" font-bold text-[14px] pb-3 ">By Color</h4>
      <Link href={"/store"}>
        <button className=" text-[12px] font-bold bg-white px-3 py-2 rounded-[10px] my-4 cursor-pointer ">
          All Brands
        </button>
      </Link> 
      <div className=" flex items-center flex-wrap gap-4 ">
        {color &&
          color.map((data, index) => {
            return (
              <button
                onClick={() => setSelColor(data.slug)}
                key={index}
                style={{ backgroundColor: data.hexCode }}
                className={`h-[30px] w-[30px] text-[13px] rounded-[6px] cursor-pointer `}
              ></button>
            );
          })}
      </div>
    </div>
  );
}

export default ColorFilter;
