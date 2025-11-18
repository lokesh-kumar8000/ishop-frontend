"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdCancel } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { getProducts } from "@/library/api.call";
import ProductCard from "../ProductCard";

function BestSeller() {
  const [products, setProducts] = useState([]);
  const [top, setTop] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const productJSON = await getProducts();
      const dtat = productJSON?.data.filter((d) => d.topSelling);
      if (top == "best") {
        setProducts(productJSON.data);
      } else if (top == "Popular") {
        setProducts(dtat);
      } else {
        setProducts(productJSON.data);
      }
    };
    fetchData();
  }, [top]);

  return (
    <div className="p-3 sm:p-5 bg-white rounded-[10px] mt-2.5">
      {/* top section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex flex-wrap gap-4">
          <h1
            onClick={() => setTop("best")}
            className="text-[16px] sm:text-[18px] font-semibold uppercase cursor-pointer "
          >
            Best seller
          </h1>
          <h2
            onClick={() => setTop("Popular")}
            className="text-[16px] sm:text-[18px] uppercase cursor-pointer "
          >
            Popular
          </h2>
        </div>
        <p className="text-[#666666] text-[12px] sm:text-[13px] cursor-pointer">
          <Link href="/store" > View All </Link> 
          
        </p>
      </div>

      {/* product cards */} 
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products &&
          products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div> 

      <div className=" flex justify-center py-4 ">
        <Link href="/store" className=" px-3.5 py-2 rounded-[15px] text-white bg-green-600 " > View More </Link>
      </div>
    </div>
  );
}

export default BestSeller;
