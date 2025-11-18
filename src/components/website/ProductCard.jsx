import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import CartBtn from "./CartBtn";
import { formatIndianCurrency } from "@/library/helper";

function ProductCard({ product }) {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow-sm relative ">
      {/* Product Image */}
      <Link href={`/product-view/${product._id}`} className=" flex justify-center">
        <img
          className="rounded-t-lg w-full h-[250px] object-contain"
          src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${product.thumbnail}`}
          alt={product.name}
        />
      </Link>

      {/* Product Details */}
      <div className="p-5">
        <h5 className="mb-2 text-[14px] font-bold ">{product.name}</h5>

        {/* Price Section */}
        <div className=" flex gap-1 items-center ">
          <span className=" text-[18px] text-[#F1352B] font-semibold ">
            {formatIndianCurrency(product.finalPrice)}
          </span>
          <span className=" text-[14px] font-semibold text-[#666666] line-through ">
            {formatIndianCurrency(product.originalPrice)} 
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 text-[12px] py-2">
          {product.stock ? (
            <>
              <FaCheckCircle className="text-[#1ABA1A]" />
              <span>In Stock</span>
            </>
          ) : (
            <>
              <MdCancel className="text-[#F1352B]" />
              <span>Out of Stock</span>
            </>
          )}
        </div>

        {/* ✅ Color Dots */}
        <div className="flex gap-2 py-2">
          {product.colors?.map((color, i) => (
            <span
              key={i}
              className="h-5 w-5 rounded-full border border-gray-300"
              style={{ backgroundColor: color.hexCode }}
            ></span> 
          ))} 
        </div>

       <CartBtn productId = {product._id} finalPrice = {product.finalPrice} originalPrice = {product.originalPrice} /> 
        
      </div>

      {/* ✅ Discount Badge (percentage) */}
      <div className=" absolute top-0 left-0 py-1.5 px-2  rounded-[10px] bg-[#e61515] text-white ">
        <p className=" text-[8px] uppercase ">OFF</p>
        <h6 className=" text-[10px] font-medium ">
          {product.discountPercentage}%
        </h6>
      </div>

      {/* Wishlist Icon */}
      <div className=" absolute top-[10px] right-[10px] h-[30px] w-[30px] bg-[#E2E4EB] rounded-full flex justify-center items-center ">
        <CiHeart className="text-red-600" />
      </div>
    </div>
  );
}

export default ProductCard;
