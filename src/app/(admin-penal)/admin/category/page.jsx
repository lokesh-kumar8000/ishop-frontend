"use client";
import { getCategory } from "@/library/api.call";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StatusBtn from "@/components/admin/StatusBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  async function getcat(limit) {
    const allData = await getCategory(null, limit);
    setCategories(allData.data);
  }
  useEffect(() => {
    getcat(5);
  }, []);

  function limitHandler() {
    if (showAll) {
      getcat(5);
      setShowAll(false);
    } else { 
      getcat(); 
      setShowAll(true); 
    }
  }

  return (
    <div className="p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Category List</h2>
        <Link href="/admin/category/add"> 
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer ">
            + Add Category 
          </button> 
        </Link> 
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg"> 
        <table className="w-full border border-gray-200"> 
          <thead className="bg-gray-100"> 
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/category/${cat.image}`}
                    alt={cat.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">{cat.slug}</td>
                <td className="px-4 py-2">
                  <StatusBtn url="category" id={cat._id} status={cat.status} />
                </td>
                <td className=" flex px-4 py-2 gap-3.5 "> 
                  <DeleteBtn url="category" id={cat._id} /> 
                  <Link href={`/admin/category/edit/${cat._id}`}> 
                    <button className=" py-1 px-3 border-1 rounded-[10px] text-[14px] cursor-pointer ">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex justify-center items-center my-5 ">
        <button
          onClick={limitHandler}
          className=" bg-blue-600 text-white py-1.5 px-2.5 font-medium cursor-pointer "
        >
          {showAll ? "Show Less" : " View All "}
        </button>
      </div>
    </div>
  );
}

export default CategoryTable;
