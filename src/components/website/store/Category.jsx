import Link from "next/link";
import React from "react";

function Category({ categories }) {
  return (
    <div className="w-full bg-[#EEEFF6] p-[30px] rounded-[10px] ">
      <h2 className=" uppercase text-[18px] font-bold pb-4 ">categories</h2>
      <Link href={'/store'} >
        <button className=" text-[12px] font-bold bg-white px-3 py-2 rounded-[10px] mb-4 ">
          All Categories
        </button>
      </Link> 
      <ul>
        {categories &&
          categories?.map((data, index) => {
            return (
              <Link href={`/store/${data.slug}`} key={index}>
                <li
                  className=" text-[14px] leading-5 mb-2 flex justify-between "
                  
                >
                  {" "}
                  {data.name} <span>({data.productCount})</span>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default Category;
