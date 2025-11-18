"use client";

import { axioIsnstance, getCookie, notify } from "@/library/helper";
import { useRouter } from "next/navigation";
import React  from "react";

function ProductStock({ product }) {
  const token = getCookie('admin_token')
  const router = useRouter();

  const statusHandler = (flag) => {
  axioIsnstance
    .patch(
      `product/status/${product._id}`,
      { flag }, 
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        if (flag === 2) {
          notify("Top Selling updated", response.data.success);
          product.topSelling = !product.topSelling;
        } else if (flag === 1) {
          notify("Stock updated", response.data.success);
          product.stock = !product.stock;
        } else if (flag === 3) {
          notify("Status updated", response.data.success);
          product.status = !product.status;
        }
        router.refresh();
      }
    })
    .catch((err) => {
      notify(err.response?.data?.message || "Error", false);
      console.log(err);
    });
};


  return (
    <div className="flex gap-3.5 ">
      <button>
        <span
          onClick={() => statusHandler(3)}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
            product.status
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status ? "Active" : "Inactive"}
        </span>
      </button>
      <button
        onClick={() => statusHandler(1)}
        className=" py-1 px-3 border-1 rounded-[10px] text-[14px] cursor-pointer "
      >
        {product.stock ? "In" : "Out"}
      </button>
      <button
        onClick={() => statusHandler(2)}
        className=" py-1 px-3 border-1 rounded-[10px] text-[14px] cursor-pointer "
      >
        {product.topSelling ? "Yes" : "No"}
      </button>
    </div>
  );
}

export default ProductStock;
