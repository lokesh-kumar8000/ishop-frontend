"use client";
import DeleteBtn from "@/components/admin/DeleteBtn";
import StatusBtn from "@/components/admin/StatusBtn";
import { getBrand } from "@/library/api.call";
import Link from "next/link";
import { useEffect, useState } from "react";

function BrandTable() {
  const [brands, setBrands] = useState([]);
  const [showAll, setShowAll] = useState(false);

  async function getbrands(limit) {
    const allData = await getBrand(null, limit);
    setBrands(allData.data);
  }

  useEffect(() => {
    getbrands(5);
  }, []);

  function limitHandler() {
    if (showAll) {
      getbrands(5);
      setShowAll(false);
    } else {
      getbrands();
      setShowAll(true);
    }
  } 


  

  return (
    <div className="p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Brand List</h2>
        <Link href="/admin/brand/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            + Add brand
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Logo</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/brand/${brand.image}`}
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg object-contain "
                  />
                </td>
                <td className="px-4 py-2">{brand.name}</td>
                <td className="px-4 py-2">{brand.slug}</td>
                <td className="px-4 py-2">
                  <StatusBtn status={brand.status} url="brand" id={brand._id} />
                </td>
                <td className=" flex px-4 py-2 gap-3.5 ">
                  <DeleteBtn url="brand" id={brand._id} />
                  <Link href={`/admin/brand/edit/${brand._id}`}>
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

export default BrandTable;
