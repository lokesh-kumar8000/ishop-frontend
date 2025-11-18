"use client";
import { axioIsnstance, formatIndianCurrency, notify } from "@/library/helper";
import { clearCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";

export default function CheckoutPage() {
  const { error, isLoading, Razorpay } = useRazorpay();
  const [selectAddress, setSelectAddress] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);
  const [shipingAddress, setShipingAddress] = useState([]);
  const router = useRouter();
  const user = useSelector((state) => state?.user?.data);
  const cart = useSelector((state) => state?.cart);
  const userToken = useSelector((state) => state?.user);
  const dispatcher = useDispatch();


  // Get shipping address
  useEffect(() => {
    if (!user?._id) return;
    axioIsnstance
      .get(`user/get/${user._id}`)
      .then((response) => {
        setShipingAddress(response?.data?.data?.shipping_address || []);
      })
      .catch((err) => console.log(err));
  }, [user]);

  //  Stop redirect loop (Removed checkout redirect)
  useEffect(() => {
    if (!user) {
      router.push("/user-login");
    } else {
      router.push("/checkout");
    }
  }, [user]);

  //  Order Handler (Main Logic)
  function orderHandler() {

    if (shipingAddress.length == 0) {
      notify("Add Address", false); 
      router.push("/profile-view"); 
      return; 
    }

    axioIsnstance
      .post("order/order-place", {
        user_id: user._id,
        payment_mode: paymentMode,
        shipping_details: shipingAddress[selectAddress],
        name: user.name,
        email: user.email,
      })
      .then((response) => {
        console.log("Order Response:", response.data);

        if (!response.data.success) {
          alert("Order failed. Please try again.");
          return;
        }

        //  COD
        if (paymentMode === 0) {
          router.push(`/thank-you/${response.data.order_id}`);
          dispatcher(clearCart());
          return;
        }

        //  Online Payment (Razorpay)
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          // amount: response.data.amount || cart.final_total * 100, // amount in paise
          currency: "INR",
          name: "Lokesh Kumar",
          description: "Test Transaction",
          order_id: response.data.rozorpay_order_id,
          handler: function (razorResponse) {
            axioIsnstance
              .post(
                "order/success",
                {
                  order_id: response.data.order_id,
                  user_id: user?._id,
                  razorpay_response: razorResponse,
                },
                {
                  headers: {
                    Authorization: userToken.token,
                  },
                }
              )
              .then((successResponse) => {
                if (successResponse.data.status == "success") {
                  dispatcher(clearCart());
                  router.push(`/thank-you/${response.data.order_id}`);
                }
              })
              .catch((err) => {
                console.log(err);
                notify("payment is not verified!");
              });
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: shipingAddress[selectAddress]?.contact,
          },
          theme: {
            color: "#f37254",
          },
        };

        if (typeof Razorpay === "undefined") {
          alert("Razorpay SDK not loaded properly!");
          return;
        }

        const rzp1 = new Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        console.error("Order Error:", error);
      });
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Address + Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="p-6 bg-white shadow rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <h2 className="text-xl font-semibold mb-4">Select Address</h2>

            <div className="space-y-4">
              {shipingAddress.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => setSelectAddress(index)}
                  className={`flex items-start gap-3 border border-blue-300 p-4 rounded-lg cursor-pointer hover:shadow ${
                    selectAddress === index ? "bg-blue-50" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">
                      {addr.addressLine1}, {addr.addressLine2}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addr.country}, {addr.postCode}
                    </p>
                    <p className="text-sm text-gray-600">Mob: {addr.contact}</p>
                  </div>
                </div>
              ))}

              <Link
                href="/profile-view"
                className="px-8 py-2 bg-blue-600 rounded-[10px] text-xl text-white inline-block text-center"
              >
                + Add New
              </Link>
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-6 bg-white shadow rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">
              Select Payment Method
            </h2>
            <div className="flex gap-6 items-center">
              <button
                type="button"
                onClick={() => setPaymentMode(0)}
                className={`w-full py-2.5 rounded-[10px] border font-semibold cursor-pointer ${
                  paymentMode === 0 ? "bg-blue-600 text-white" : ""
                }`}
              >
                Cash On Delivery (COD)
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode(1)}
                className={`w-full py-2.5 rounded-[10px] border font-semibold cursor-pointer ${
                  paymentMode === 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                Online Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="space-y-6">
          <div className="p-6 bg-white shadow rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span>{formatIndianCurrency(cart.original_total)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Discount</span>
                <span className="text-green-500">
                  {formatIndianCurrency(cart.original_total - cart.final_total)}
                </span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-3">
                <span>Final Total</span>
                <span>{formatIndianCurrency(cart.final_total)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={orderHandler}
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
