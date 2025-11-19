"use client";
import { axioIsnstance, notify } from "@/library/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // react-icons

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const logInHandler = (e) =>{
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value 
    }

    axioIsnstance.post('admin/login',data, {withCredentials:true} ).then(
      (response)=>{
        if(response.data.success){
          console.log(response.data);
          notify(response.data.message,response.data.success); 
          router.push('/admin')
        }
      }
    ).catch(
      (error)=>{
        console.log(error);
        notify(error.response.data.message,500)
      }
    )

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={logInHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </div>
    </div>
  );
}
