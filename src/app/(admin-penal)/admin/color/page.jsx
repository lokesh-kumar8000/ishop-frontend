import DeleteBtn from "@/components/admin/DeleteBtn";
import StatusBtn from "@/components/admin/StatusBtn";
import { getcolor } from "@/library/api.call";
import Link from "next/link";
import React from "react";

 async function colorTable() { 
    const allData = await getcolor();
    const colors =  allData.data;

  return (
    <div className="p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Color List</h2>
        <Link href="/admin/color/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer ">
            + Add Color
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((col, index) => (
              <tr key={index} className="border-t hover:bg-gray-50  ">
                <td
                
                  className="px-4 py-2"
                > <span style={{ backgroundColor: col.hexCode }} className=" px-8 py-1 border " ></span> </td>
                <td className="px-4 py-2">{col.name}</td>
                <td className="px-4 py-2">{col.slug}</td>
                <td className="px-4 py-2">
                  <StatusBtn status={col.status} url='color' id={col._id} />
                </td>
                <td className=" flex px-4 py-2 gap-3.5 ">
                  
                 <DeleteBtn url='color' id={col._id}/>
                  <Link href={`/admin/color/edit/${col._id}`}>
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
    </div>
  );
}

export default colorTable;
