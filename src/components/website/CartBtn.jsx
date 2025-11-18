"use client";
import { axioIsnstance, notify } from "@/library/helper";
import { addToCart } from "@/redux/features/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CartBtn({ finalPrice, originalPrice, productId }) {
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user.data);

  function addToCartHandler() {
    if (user != null) {
      axioIsnstance
        .post("cart/add-to-cart", {
          productId: productId,
          qty: 1,
          userId: user._id,
        })
        .then((response) => {
          notify(response.data.message, response.data.success);
          dispatcher(
            addToCart({
              productId,
              finalPrice,
              originalPrice,
            })
          );
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data.message, err.response.data.success);
        });
    } else {
      dispatcher(
        addToCart({
          productId, 
          finalPrice, 
          originalPrice, 
        })
      );
      notify("Cart Add SuccessFully", true);
    }
  }

  return (
    <button
      onClick={addToCartHandler}
      className="w-full cursor-pointer mt-3 bg-[#1ABA1A] hover:bg-[#068506] text-white text-[14px] py-2 rounded-lg font-medium"
    >
      Add to Cart 
    </button>
  );
}

export default CartBtn;
