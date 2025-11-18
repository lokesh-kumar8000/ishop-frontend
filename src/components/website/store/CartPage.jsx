"use client";
import { FaShoppingCart } from "react-icons/fa";
import { axioIsnstance, formatIndianCurrency, notify } from "@/library/helper";
import { incDec, removeCart } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage({ products }) {
  const router = useRouter();
  const dispatcher = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  // console.log(cart, "cart");

  function checkoutHandler() {
    if (user) {
      if (!cart.items || cart?.items.length === 0) {
        router.push("/store");
      } else {
        router.push("/checkout");
      }
    } else {
      router.push("/user-login?ref=checkout");
    }
  }

  function removeHandler(productId, qty, originalPrice, finalPrice) {
    if (user != null) {
      axioIsnstance
        .delete(`cart/delete-cart/${productId}/${user._id}`)
        .then((response) => {
          notify(response.data.message, response.data.success);
          dispatcher(
            removeCart({
              productId: productId,
              finalPrice: finalPrice,
              originalPrice: originalPrice,
              qty: qty,
            })
          );
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data.message, err.response.data.success);
        });
    } else {
      dispatcher(
        removeCart({
          productId: productId,
          finalPrice: finalPrice,
          originalPrice: originalPrice,
          qty: qty,
        })
      );
      notify("Cart Delete Successfully", true);
    }
  }

  function updateCart({ flag, productId, original_total, final_total }) {
    if (user != null) {
      axioIsnstance
        .patch(`cart/inc-to-dec/${productId}/${user._id}/${flag}`)
        .then((response) => {
          // notify(response.data.message, response.data.success);
          console.log(response.data);
          dispatcher(
            incDec({
              flag,
              productId,
              original_total,
              final_total,
            })
          );
        })
        .catch((err) => {
          console.log(err);
          notify(err.response.data.message, err.response.data.success);
        });
    } else {
      dispatcher(
        incDec({
          flag,
          productId,
          original_total,
          final_total,
        })
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 my-5 rounded-[10px] p-6">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart?.items?.length !== 0 ? (
            cart?.items?.map((item) => {
              const product = products.find(
                (prod) => prod._id === item.productId
              );
              return (
                <div
                  key={product._id}
                  className="flex items-center gap-4 bg-white rounded-2xl shadow p-4"
                >
                  {/* Image + Tag */}
                  <div className="relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${product.thumbnail}`}
                      alt={product.name}
                      className="w-24 h-28 object-contain rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className=" flex justify-between items-center ">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-700">
                          {product.name}
                        </h3>
                        <p className="text-red-600 font-bold text-lg">
                          {formatIndianCurrency(product.finalPrice * item.qty)}
                        </p>
                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateCart({
                                flag: "-",
                                productId: product._id,
                                original_total: product.originalPrice,
                                final_total: product.finalPrice,
                              })
                            }
                            className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-gray-100"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-2"> {item.qty} </span>
                          <button
                            onClick={() =>
                              updateCart({
                                flag: "+",
                                productId: product._id,
                                original_total: product.originalPrice,
                                final_total: product.finalPrice,
                              })
                            }
                            className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-gray-100"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeHandler(
                            product._id,
                            item.qty,
                            product.originalPrice,
                            product.finalPrice
                          )
                        }
                        className=" bg-red-600 text-white px-3 py-2 rounded-[10px] cursor-pointer "
                      >
                        {" "}
                        Remove{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
              <div className="text-6xl text-gray-400 mb-4">
                <FaShoppingCart />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven’t added any products yet.
              </p>
              <button
                onClick={() => router.push("/store")}
                className=" cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit border border-green-500">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Total:</span>
              <span className="font-medium">
                {formatIndianCurrency(cart.original_total)}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saving:</span>
              <span className="font-medium">
                {" "}
                {formatIndianCurrency(cart.original_total - cart.final_total)}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>ORDER TOTAL:</span>
            <span>{formatIndianCurrency(cart.final_total)} </span>
          </div>
          <button
            onClick={checkoutHandler}
            className="mt-6 w-full cursor-pointer bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
