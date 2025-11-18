"use client";
import { getCategory, getcolor } from "@/library/api.call";
import { axioIsnstance, createSlug, getCookie, notify } from "@/library/helper";
import React, { useEffect, useRef, useState } from "react";

function ColorEdit({ params }) {
  const token = getCookie("admin_token");
  const { color_id } = React.use(params);
  const [color, setcolor] = useState({});

  async function getFormData() {
    const getColor = await getcolor(color_id);
    setcolor(getColor.data);
  }

  useEffect(() => {
    getFormData();
  }, [color_id]);

  const slugRef = useRef();
  const nameRef = useRef();
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
      notify("Enter name and slug ", "warning");
    } else {
      axioIsnstance
        .put(`color/update/${color_id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            notify(response.data.message, response.data.success);
            nameRef.current.value = "";
            slugRef.current.value = "";
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
        ➕ Add New Category
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
            defaultValue={color.name}
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
            defaultValue={color.slug}
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
            <div className=" w-22 h-20 border-2 border-dashed border-gray-300 rounded-xl p-3.5">
              <h1 className="block text-sm font-medium text-gray-600 mb-2">
                {" "}
                Privews{" "}
              </h1>
              <div
                style={{ backgroundColor: color.hexCode }}
                className=" px-4 py-2 rounded-xl "
              ></div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition"
        >
          Save color
        </button>
      </form>
    </div>
  );
}

export default ColorEdit;
