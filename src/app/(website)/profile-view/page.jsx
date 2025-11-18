"use client";
import { axioIsnstance, formatIndianCurrency, notify } from "@/library/helper";
import { clearCart } from "@/redux/features/cartSlice";
import Swal from "sweetalert2";
import {
  addAddress,
  clearUser,
  removeAddres,
} from "@/redux/features/userSlice";
// import { current } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function AccountInfoPage() {
  const user = useSelector((state) => state?.user);
  const [toggle, setToggle] = useState("account");
  const [showFrom, setShowFrom] = useState(false);
  const [users, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const router = useRouter();
  const dispatcher = useDispatch();

  // get Address
  useEffect(() => {
    axioIsnstance
      .get(`user/get/${user?.data?._id}`)
      .then((response) => {
        setUser(response.data.data.shipping_address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.data?._id]);

  // get order
  useEffect(() => {
    axioIsnstance
      .get(`order/getUser/${user?.data?._id}`)
      .then((response) => {
        setOrder(response.data.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.data?._id]);

  function Button({ text, tab }) {
    return (
      <button
        onClick={() => setToggle(tab)}
        className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base transition-colors
          ${
            toggle === tab
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
      >
        {text} <FaArrowRight className="ml-2" />
      </button>
    );
  }

  // address submit
  function addressSubmit(e) {
    e.preventDefault();
    if (users.length >= 3) {
      notify("You can add only 3 addresses.", false);
      setShowFrom(!showFrom);
    } else {
      if (user?.data._id) {
        const userData = {
          userData: {
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            city: e.target.city.value,
            contact: e.target.contact.value,
            state: e.target.state.value,
            country: e.target.country.value,
            postCode: e.target.postCode.value,
          },
          token: user.token,
          loginAt: user.loginAt,
        };
        axioIsnstance
          .put(`user/address/${user?.data?._id}`, userData)
          .then((response) => {
            const newAddress = response.data.data.shipping_address;
            setUser(newAddress);
            notify(response.data.message, response.data.success);
            setShowFrom(!showFrom);
            dispatcher(addAddress(newAddress));
          })
          .catch((err) => {
            console.log(err);
            notify("User not found", false);
            router.push("/user-login");
          });
      }
    }
  }
  // delete address
  function deleteAddress(index) {
    axioIsnstance
      .delete(`user/delete/${user?.data?._id}/${index}`)
      .then((response) => {
        notify(response.data.message, response.data.success);
        setUser((prew) => {
          const updated = [...prew];
          updated.splice(index, 1);
          setTimeout(() => {
            dispatcher(removeAddres(index));
          }, 0);
          return updated;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // change password
  function passwordUpadate(e) {
    e.preventDefault();
    console.log("click update btn");
    axioIsnstance
      .put(`user/password-update/${user?.data?._id}`, {
        current: e.target.current.value,
        newPass: e.target.newPass.value,
        confirm: e.target.confrim.value,
      })
      .then((response) => {
        notify(response.data.message, response.data.success);
        e.target.reset();
      });
    e.target.reset().catch((err) => {
      notify(err.response.data.message, err.response.data.success);
      console.log(err);
    });
  }

  function logOutHandler() {
    setTimeout(() => {
      dispatcher(clearCart());
      dispatcher(clearUser());
    }, 0);
  }

  function removeAddress(orderId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axioIsnstance
          .delete(`order/remove-oder/${user?.data?._id}/${orderId}`)
          .then((response) => {
            setOrder(response.data.data);
            notify(response.data.message, response.data.success);
          })
          .catch((err) => {
            console.log(err);
            notify(err.response.data.message, err.response.data.success);
          });
      }
    });
  }

  return (
    <div className=" flex items-center justify-center p-3 sm:px-0"> 
      <div className="w-full  bg-white rounded-2xl shadow-md flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-4 sm:p-6 flex flex-col items-center">
          <div>
            <img
              src="/images/profile.png"
              alt="Profile"
              className=" rounded-xl object-cover"
            />
            <h2 className="mt-3 font-semibold text-base sm:text-lg">
              {user?.data?.name || ""}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {user?.data?.email || " "}
            </p>
          </div>

          <div className="mt-4 sm:mt-6 w-full flex flex-col gap-2 sm:gap-3">
            <Button text={"Account info"} tab="account" />
            <Button text={"My Order"} tab="order" />
            <Button text={"My Address"} tab="address" />
            <Button text={"Change Password"} tab="password" />
          </div>
          {user?.data != null ? (
            <button
              onClick={logOutHandler}
              className=" bg-red-500 text-white py-2 px-3 mt-3 rounded-[10px] font-semibold cursor-pointer "
            >
              {" "}
              LogOut{" "}
            </button>
          ) : (
            ""
          )}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 p-4 sm:p-8">
          {/* my account  */}
          {toggle === "account" &&
            (user?.data != null ? (
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Account Info
                </h1>

                <form className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      defaultValue={user?.data?.name || " "}
                      readOnly
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      defaultValue={user?.data?.email || " "}
                      readOnly
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium mb-1">
                      Phone Number{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      readOnly
                      placeholder="+1 0231 4554 452"
                      defaultValue={user.contact || "+1 0231 4554 452"}
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="col-span-1">
                    <button
                      type="button"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2 rounded-lg text-sm sm:text-base"
                    >
                      SAVE
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <NotLogIn />
            ))}
          {/* my order */}
          {toggle === "order" &&
            (user?.data != null ? (
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  My Orders
                </h1>
                {order.length > 0 ? (
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {order.map((ord, i) => (
                      <div
                        key={i}
                        className="border rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div>
                          <h2 className="font-semibold text-base sm:text-lg">
                            Order #{ord._id}
                          </h2>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Placed on:{" "}
                            {new Date(ord.createdAt).toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Status:{" "}
                            <span
                              className={`font-medium ${
                                ord.order_status == "0"
                                  ? "text-green-600"
                                  : ord.order_status == "1"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {ord.order_status == "0"
                                ? "Delivery"
                                : ord.order_status == "1"
                                ? "Shipped"
                                : " Cancel "}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatIndianCurrency(ord.order_total)}
                          </p>
                          <button
                            onClick={() => removeAddress(ord._id)}
                            className="mt-1 sm:mt-2 text-xs sm:text-sm rounded-2xl py-1.5 px-2 text-white  bg-red-600 cursor-pointer border "
                          >
                            Cencel Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center mt-20">
                    <img
                      src="/images/notOrder.jpg" // dummy image use kar sakte ho
                      alt="No Orders"
                      className="w-60 h-60 object-contain mb-6"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      No Orders Yet
                    </h2>
                    <p className="text-gray-500 mb-6">
                      You haven’t placed any orders yet. Start shopping now!
                    </p>
                    <Link
                      href="/store"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <NotLogIn />
            ))}
          {/* my address  */}
          {toggle === "address" &&
            (user?.data != null ? (
              <section className="  p-6 bg-white rounded-2xl shadow-sm relative ">
                <div className=" flex justify-end ">
                  <button
                    onClick={() => setShowFrom(!showFrom)}
                    className="rounded-md px-4 py-2 cursor-pointer  font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {showFrom ? "Close From" : "Add Address"}
                  </button>
                </div>
                {showFrom ? (
                  <form
                    onSubmit={addressSubmit}
                    className="space-y-6 bg-white w-full "
                    aria-label="Address form"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="block  font-medium ">
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="addressLine1"
                          placeholder="House number, building, street"
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <p className="mt-1 text-xs text-gray-400">
                          This field is required.
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block  font-medium ">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          required
                          placeholder="Apartment, suite, unit (optional)"
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <p className="mt-1 text-xs text-gray-400">Optional</p>
                      </div>

                      <div>
                        <label className="block  font-medium ">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Jaipur"
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>

                      <div>
                        <label className="block  font-medium ">Contact</label>
                        <input
                          type="tel"
                          name="contact"
                          placeholder="Phone number "
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>

                      <div>
                        <label className="block  font-medium ">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          placeholder="e.g. Rajasthan"
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>

                      <div>
                        <label className="block  font-medium ">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          placeholder="e.g. India"
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block  font-medium ">
                          PostCode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="postCode"
                          placeholder="e.g. 302006"
                          required
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>
                      <div className=" col-span-2 flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          All required fields are marked with an asterisk.
                        </p>
                        <div className="flex gap-3">
                          <button
                            type="reset"
                            className="rounded-md px-4 py-2  font-medium border border-gray-300 hover:bg-gray-50"
                          >
                            Reset
                          </button>
                          <button
                            type="submit"
                            className="rounded-md px-4 py-2  font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div>
                    {/* address list */}
                    <h1 className="text-2xl font-semibold mb-6">My Address</h1>
                    {/* Address List */}
                    {users && users.length > 0 ? (
                      users.map((address, index) => {
                        return (
                          <div
                            key={index}
                            className="p-4 border rounded-lg bg-gray-50 mt-3.5 "
                          >
                            <h3 className="text-lg font-semibold mb-2">
                              Delivery Address
                            </h3>
                            <p className="text-sm text-gray-700">
                              {address.addressLine1}
                              {address.addressLine2 &&
                                `, ${address.addressLine2}`}
                            </p>
                            <p className="text-sm text-gray-700">
                              {address.city}, {address.state}
                            </p>
                            <p className="text-sm text-gray-700">
                              {address.country}, {address.postCode}
                            </p>

                            <div className="mt-4 flex gap-3">
                              <button
                                onClick={() => deleteAddress(index)}
                                className="text-sm bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center mt-20">
                        <img
                          src="/images/notOrder.jpg" // dummy image use kar sakte ho
                          alt="No address"
                          className="w-60 h-60 object-contain mb-6"
                        />
                        <h2 className="text-xl font-semibold mb-2">
                          No address Yet
                        </h2>
                        <p className="text-gray-500 mb-6">
                          You haven’t placed any orders yet. Start shopping now!
                        </p>
                        <button
                          onClick={() => setShowFrom(!showFrom)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer "
                        >
                          Add address
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <p className=" text-sm text-gray-600 py-2 ">
                  {" "}
                  You are allowed to add only 3 addresses{" "}
                </p>
              </section>
            ) : (
              <NotLogIn />
            ))}
          {/* change password  */}
          {toggle === "password" &&
            (user?.data != null ? (
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Change Password
                </h1>
                <form
                  onSubmit={passwordUpadate}
                  className="flex flex-col gap-4 sm:gap-6 max-w-lg"
                >
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="current"
                      placeholder={`Enter Current password`}
                      required
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="newPass"
                      placeholder={`Enter New password`}
                      required
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      confrim Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confrim"
                      required
                      placeholder={`Enter confrim password`}
                      className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2 rounded-lg text-sm sm:text-base"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <NotLogIn />
            ))}
        </div>
      </div> 
    </div> 
  );
}

const NotLogIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          You’re not logged in
        </h2>
        <p className="text-gray-500 mb-6">
          Please login to access your profile
        </p>

        <div className="flex flex-col space-y-3">
          <Link
            href={"/user-login?ref=profile-view"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </Link>
          <Link
            href={"/user-login?ref=profile-view"}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
