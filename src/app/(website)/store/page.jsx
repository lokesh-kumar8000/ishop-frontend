"use client";
import ProductCard from "@/components/website/ProductCard";
import { getProducts } from "@/library/api.call";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const brand = searchParams.get("brand") ?? null;
  const color = searchParams.get("color") ?? null;
  const min = searchParams.get("min") ?? null;
  const max = searchParams.get("max") ?? null;

  let limit = 12;

  const fatchData = async () => {
    const productJSON = await getProducts(
      null,
      null,
      brand,
      color,
      min,
      max,
      limit,
      currentPage
    ); 
    setProducts(productJSON.data);
    setPages(Math.ceil(productJSON.total_product / limit));
  };
  useEffect(() => {
    fatchData();
  }, [searchParams,currentPage]);

  let pagination = [];

  for (let i = 1; i <= pages; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className=" px-4 py-2 border cursor-pointer "
      >
        {" "}
        {i}{" "}
      </button>
    );
  }
  return (
    <div className="w-full sm:px-5 px-0 ">
      <h4 className=" text-[18px]  font-bold leading-[21px] pb-3 ">
        Best seller in this category
      </h4>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-x-3 gap-y-16 ">
        {products &&
          products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
      <div className=" my-5 flex justify-center items-center ">
        <div> {pagination} </div>
      </div>
    </div>
  );
}

export default page;
