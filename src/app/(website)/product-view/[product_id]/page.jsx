"use client";

import CartBtn from "@/components/website/CartBtn";
import { axioIsnstance, formatIndianCurrency } from "@/library/helper";
import { use, useEffect, useState } from "react";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

export default function ProductPage({ params }) {
  const { product_id } = use(params);
  const [product, setProduct] = useState({});
  const [img, setImge] = useState("");

  useEffect(() => {
    axioIsnstance
      .get(`product/${product_id}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data.data);
          setImge(response.data.data.thumbnail); // ✅ thumbnail initially set
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product_id]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
        {/* Left Side - Images */}
        <div>
          <div className="flex justify-center items-center">
            <img
              src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${img}`}
              alt={product.name}
              className="rounded-2xl max-h-[400px] w-full object-contain sm:max-h-[500px]"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3 overflow-x-auto sm:overflow-visible">
            {product?.images?.map((image, i) => (
              <img
                key={i}
                src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${image}`}
                alt="gallery"
                onMouseOver={() => setImge(image)}
                onMouseLeave={() => setImge(product.thumbnail)}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {product.shortDescription}
          </p>

          {/* Category + Brand */}
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500">
            <span>Category: {product?.categoryId?.name}</span>
            <span>Brand: {product?.brandId?.name}</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {formatIndianCurrency(product.finalPrice)}
            </span>
            <span className="line-through text-gray-400 text-sm sm:text-base">
              {formatIndianCurrency(product.originalPrice)}
            </span>
            <span className="text-green-600 font-medium text-sm sm:text-base">
              {product.discountPercentage}% Off
            </span>
          </div>

          {/* Colors */}
          <div>
            <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Available Colors:
            </p>
            <div className="flex gap-3 flex-wrap">
              {product?.colors?.map((color) => (
                <div
                  key={color._id}
                  title={color.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow cursor-pointer"
                  style={{ backgroundColor: color.hexCode }}
                ></div>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <p
            className={`font-semibold text-sm sm:text-base ${
              product.stock ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Long Description */}
          <div
            className="prose max-w-none text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />

          {/* Buttons */}
           <div >
            <CartBtn finalPrice = {product.finalPrice} originalPrice = {product.originalPrice} productId={product._id} /> 
          </div>
        </div>
      </div>
    </div>
  );
}
