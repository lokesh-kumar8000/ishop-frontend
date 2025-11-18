"use client";
import { axioIsnstance, notify } from "@/library/helper";
import { userLogin } from "@/redux/features/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function LoginSignUpPage() {
  const params = useSearchParams();
  // console.log(params.get("ref"));
  const dispatcher = useDispatch();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleForm = () => setIsLogin(!isLogin);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user, "user");

  const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (user) {
      if (params.get("ref") == "checkout") {
        router.push("/checkout");
      } else if (params.get("ref") == "profile-view") {
        router.push("/profile-view");
      } else {
        router.push("/");
      }
      notify("You are logIn", true);
    } else {
      router.push("/user-login");
    }
  }, [user]);
  function logInSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axioIsnstance
      .post("user/login", data)
      .then(async (response) => {
        if (response.data.success) {
          dispatcher(
            userLogin({
              token: response.data.data.token,
              user: response.data.data.user,
            })
          );
          const updatedCart = await axioIsnstance.post("cart/sync", {
            cart: cart != null ? cart.items : null,
            userId: response.data?.data?.user?._id,
          });
          let final_total = 0;
          let original_total = 0;
          const items = updatedCart?.data?.data?.cart.map((prod) => {
            original_total += prod?.product_id?.originalPrice * prod.qty || 0;
            final_total += prod?.product_id?.finalPrice * prod.qty || 0;
            return {
              productId: prod.product_id._id,
              qty: prod.qty,
            };
          });
          localStorage.setItem(
            "cart",
            JSON.stringify({ items, original_total, final_total })
          );

          notify(response.data.message, response.data.success);
          if (params.get("ref") == "checkout") {
            router.push("/checkout");
          } else if (params.get("ref") == "profile-view") {
            router.push("/profile-view");
          } else {
            router.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.message, error.response.data.success);
      });
  }

  function signUpSubmit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axioIsnstance
      .post("user/register", data)
      .then(async (response) => {
        if (response.data.success) {
          dispatcher(
            userLogin({
              token: response.data.data.token,
              user: response.data.data.user,
            })
          );
          const updatedCart = await axioIsnstance.post("cart/sync", {
            cart: cart != null ? cart.items : null,
            userId: response.data?.data?.user?._id,
          });
          let final_total = 0;
          let original_total = 0;

          const items = updatedCart?.data?.data?.cart.map((prod) => {
            original_total += prod?.product_id?.originalPrice * prod.qty || 0;
            final_total += prod?.product_id?.finalPrice * prod.qty || 0;
            return {
              productId: prod.product_id._id,
              qty: prod.qty,
            };
          });
          localStorage.setItem(
            "cart",
            JSON.stringify({ items, original_total, final_total })
          );
          notify(response.data.message, response.data.success);
          if (params.get("ref") == "checkout") {
            router.push("/checkout");
          } else if (params.get("ref") == "profile-veiw") {
            router.push("/profile-veiw");
          } else {
            router.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex min-h-screen items-center lg:px-28 justify-center bg-gray-50">
      <div className="flex w-full  bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-10">
          <img
            src="/images/login.png"
            alt="auth illustration"
            className="max-w-sm"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          {isLogin ? (
            <>
              {/* ---------- LOGIN FORM ---------- */}
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 text-sm mt-1 mb-6">
                Login to continue
              </p>

              <form onSubmit={logInSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Example@gmail.com"
                    name="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      name="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:underline mt-1 inline-block"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Submit */}
                <button className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                  LOGIN
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-gray-500 mt-6 text-center">
                New User?{" "}
                <button
                  onClick={toggleForm}
                  className="text-teal-600 font-semibold hover:underline"
                >
                  SIGN UP
                </button>
              </p>
            </>
          ) : (
            <>
              {/* ---------- SIGN UP FORM ---------- */}
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm mt-1 mb-6">
                Sign up to get started
              </p>

              <form onSubmit={signUpSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Example@gmail.com"
                    name="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Submit */}
                <button className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                  SIGN UP
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-gray-500 mt-6 text-center">
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-teal-600 font-semibold hover:underline"
                >
                  LOGIN
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
