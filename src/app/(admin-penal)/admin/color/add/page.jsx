"use client";
import { axioIsnstance, createSlug, getCookie, notify } from "@/library/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function colorForm() {
  const token = getCookie("admin_token");
  console.log(token, "token");
  const slugRef = useRef();
  const nameRef = useRef();
  const router = useRouter();
  const genrateSlug = () => {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug;
  };
  const genrateSlugs = () => {
    const slug = createSlug(slugRef.current.value);
    slugRef.current.value = slug;
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      hexCode: e.target.hexCode.value,
    };

    if (
      nameRef.current.value === "" ||
      slugRef.current.value === "" ||
      e.target.hexCode.value === ""
    ) {
      notify("Enter name slug and hexcode", "warning");
    } else {
      axioIsnstance
        .post("color/create", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            notify(response.data.message, response.data.success);
            nameRef.current.value = ""; 
            slugRef.current.value = ""; 
            router.push("/admin/color");  
          }
        })
        .catch((error) => {
          notify(error.response.data.message, error.response.data.success);
          console.log(error);
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        ➕ Add New Color
      </h2>

      <form onSubmit={handlerSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category Name
          </label>
          <input
            type="text"
            ref={nameRef}
            onChange={genrateSlug}
            placeholder="Enter category name"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Slug
          </label>
          <input
            type="text"
            ref={slugRef}
            onChange={genrateSlugs}
            placeholder="Enter category slug"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* hex code */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            color hexCode
          </label>
          <div className="flex items-center gap-5">
            {/* Upload Box */}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer p-6 hover:border-blue-400 hover:bg-blue-50 transition">
              <input type="color" className="" name="hexCode" />
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition"
        >
          Save Category
        </button>
      </form>
    </div>
  );
}

export default colorForm;
