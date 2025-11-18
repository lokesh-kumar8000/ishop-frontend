"use client";
import { getProducts } from "@/library/api.call";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductStock from "@/components/admin/ProductStock";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { formatIndianCurrency } from "@/library/helper";

function ProductTable() {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [ids, setIds] = useState(false); 
  const [pages, setPages] = useState(0); 
  const [currentPage, setCurrentPage] = useState(0); 
  let limit = 6;
  useEffect(() => {
    const fetchData = async () => {
      const allData = await getProducts(null ,null,null,null,null,null,limit,currentPage);
      setProduct(allData.data);
      setPages(Math.ceil(allData.total_product / limit)); 
    };
    fetchData();
  }, [ids,currentPage]);

  let pagination = [];

  for (let i = 1; i <= pages; i++) {
    pagination.push(
      <button key={i} onClick={()=>setCurrentPage(i)} className=" px-4 py-2 border cursor-pointer ">
        {" "}
        {i}{" "}
      </button>
    );
  }
// console.log(currentPage,limit);
  return (
    <div className="p-6 ">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <Link href="/admin/product/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer ">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-screen shadow rounded-lg relative">
        <table className="w-full border border-gray-200  ">
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
            {product.map((pro, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-100 transition-colors duration-200"
              >
                {/* Thumbnail */}
                <td className="px-4 py-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${pro.thumbnail}`}
                    alt={pro.name}
                    className="w-12 h-12 rounded-md object-cover shadow-sm"
                  />
                </td>

                {/* Name */}
                <td className="px-4 py-3 text-sm font-medium text-gray-700">
                  {pro.name}
                </td>

                {/* Slug */}
                <td className="px-4 py-3 text-sm text-gray-500">{pro.slug}</td>

                {/* Status / Stock / TopSelling */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* <StatusBtn url="product" id={pro._id} status={pro.status} /> */}
                    <ProductStock product={pro} />
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <DeleteBtn
                      url="product"
                      id={pro._id}
                      ids={ids}
                      setIds={setIds} 
                    />

                    <Link href={`/admin/product/edit/${pro._id}`}>
                      <button className="py-1 px-3 rounded-lg text-sm border border-gray-300 hover:bg-gray-200 transition">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedProduct(pro);
                        setShowPopup(true);
                      }}
                      className="py-1 px-3 rounded-lg text-sm border border-gray-300 hover:bg-gray-200 transition"
                    >
                      View
                    </button>
                  </div>

                  {showPopup && selectedProduct && (
                    <AnimatePresence>
                      <ProductView
                        className="duration-800"
                        product={selectedProduct}
                        onClose={() => setShowPopup(false)}
                      />
                    </AnimatePresence>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination  */}
        <div className=" my-5 flex justify-center items-center ">
          <div>{pagination}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;

// product view 

function ProductView({ product, onClose }) {
  const [img, setImg] = useState(product.thumbnail); 
  
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }} // 👈 Start from left
      animate={{ x: 0, opacity: 1 }} // 👈 Slide to center
      exit={{ x: "-100%", opacity: 0 }} // 👈 Exit back to left
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute min-h-screen top-0 left-0 right-0 p-6 bg-white z-50"
    >
      <div className=" flex justify-between items-center ">
        <h1> Product Veiw page </h1>
        <p
          onClick={() => onClose(true)}
          className=" h-[40px] w-[40px] bg-gray-300 rounded-full flex justify-center items-center hover:text-red-500 duration-500 cursor-pointer  "
        >
          <RxCross1 className="font-extrabold" />
        </p>
      </div>
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-8  ">
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${img}`}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg border mb-4"
          />
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/product/${img}`}
                alt="gallery"
                onMouseOver={() => setImg(img)}
                onMouseLeave={() => setImg(product.thumbnail)}
                className="w-24 h-24 object-contain rounded border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.shortDescription}</p>

          <div>
            <span className="line-through text-gray-400 mr-2">
              {formatIndianCurrency(product.originalPrice)}
            </span>
            <span className="text-red-600 text-xl font-bold">
              {formatIndianCurrency(product.finalPrice)}
            </span>
            <span className="ml-2 text-green-600">
              ({product.discountPercentage}% OFF)
            </span>
          </div>

          <ul className="space-y-1 text-sm">
            <li>
              <strong>Slug:</strong> {product.slug}
            </li>
            <li>
              <strong>Category :</strong> {product.categoryId?.name}
            </li>
            <li>
              <strong>Brand :</strong> {product.brandId.name}
            </li>
            <li>
              <strong>Colors:</strong>{" "}
              <div className=" flex gap-2.5 ">
                {product.colors?.map((name, i) => {
                  return (
                    <p key={i} className=" w-[30px] h-[30px] rounded-full " style={{ backgroundColor: name.hexCode }}>
                      
                    </p>
                  );
                })}
              </div>
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {product.status ? "Active ✅" : "Inactive ❌"}
            </li>
            <li>
              <strong>Stock:</strong>{" "}
              {product.stock ? "Available 🟢" : "Out of Stock 🔴"}
            </li>
            <li>
              <strong>Top Selling:</strong> {product.topSelling ? "Yes" : "No"}
            </li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
        </div>
      </div>
    </motion.div>
  );
}
