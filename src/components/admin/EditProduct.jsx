"use client";
import { axioIsnstance, createSlug, notify } from "@/library/helper";
import React, { useRef, useState } from "react";
import Select from "react-select"; 
import TextEditor from "./TextEditor";

export default function ProductAdd({ category, brand, color }) {
  const [selColor , setSelColor] = useState([]);
  const [longDescription,setLongDescription] = useState(""); 
  const nameRef = useRef();
  const slugRef = useRef();
  const originalRef = useRef();
  const discountRef = useRef();
  const finalRef = useRef();
 
  const genrateSlug = () => {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug;
  };
  const genrateSlugs = () => {
    const slug = createSlug(slugRef.current.value);
    slugRef.current.value = slug;
  };

  const priceCalculate = () => {
    const op = originalRef.current.value;
    const dp = discountRef.current.value;
    const fp = op - (op * dp) / 100;
    finalRef.current.value = parseInt(fp);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("shortDescription", e.target.shortDescription.value);
    formData.append("longDescription", longDescription); 
    formData.append("originalPrice", originalRef.current.value);
    formData.append("discountPercentage", discountRef.current.value);
    formData.append("finalPrice", finalRef.current.value);
    formData.append("categoryId", e.target.category_id.value);
    formData.append("brandId", e.target.brand_id.value); 
    formData.append("colors", JSON.stringify(selColor)); 
    formData.append("thumbnail", e.target.thumbnail.files[0]);
    for( let img of e.target.images.files){ 
      formData.append("images",img) 
    } 

    axioIsnstance.post("product/create",formData).then(
      (response)=>{
        notify(response.data.message,response.data.success); 
      }
    ).catch(
      (err)=>{
        console.log(err);
        notify(err.response.data.message, err.response.data.success);
      }
    )

  }; 

  return (
    <div className="max-w-5xl mx-auto mt-5 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Product</h2>
      <form onSubmit={submitHandler} className="grid grid-cols-1  gap-6">
        <div className=" grid grid-cols-2 gap-4 ">
          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              ref={nameRef}
              onChange={genrateSlug}
              name="name"
              placeholder="Enter product name"
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Slug</label>
            <input
              type="text"
              ref={slugRef}
              onChange={genrateSlugs}
              name="slug"
              placeholder="Enter slug"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-2 font-medium">Short Description</label>
          <textarea
            placeholder="Enter short description"
            name="shortDescription"
            className="w-full border rounded-lg p-2"
            rows="2"
          ></textarea>
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-2 font-medium">Long Description</label>
          <TextEditor value= {longDescription} changeHandler={(data)=> setLongDescription(data) } />
        </div>
        <div className=" grid grid-cols-3 gap-4 ">
          {/* Original Price */}
          <div>
            <label className="block mb-2 font-medium">Original Price</label>
            <input
              type="number"
              ref={originalRef}
              onChange={priceCalculate}
              name="originalPrice"
              placeholder="Enter price"
              className="w-full border rounded-lg p-2"
            />
          </div>
          {/* Discount Percentage */}
          <div>
            <label className="block mb-2 font-medium">Discount %</label>
            <input
              type="number"
              ref={discountRef}
              onChange={priceCalculate}
              name="discountPercentage"
              placeholder="Enter discount %"
              className="w-full border rounded-lg p-2"
            />
          </div>
          {/* Final Price */}
          <div>
            <label className="block mb-2 font-medium">Final Price</label>
            <input
              type="number"
              ref={finalRef}
              readOnly
              placeholder="Final price"
              name="finalPrice"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className=" grid grid-cols-3 gap-4 ">
          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <Select name="category_id"
              options={category.map((cat) => {
                return { value: cat._id, label: cat.name };
              })}
            />
          </div>
          {/* Brand */}
          <div>
            <label className="block mb-2 font-medium">Brand</label>
            <Select name="brand_id"
              options={brand.map((brands) => {
                return { value: brands._id, label: brands.name };
              })}
            />
          </div>
          {/* color  */}
          <div>
            <label className="block mb-2 font-medium">Color</label>
            <Select
              closeMenuOnSelect={false}
              isMulti 
              onChange={(data)=> {
                const color = data.map(o=>o.value)
                setSelColor(color);
              }
               }
              options={color.map((col) => {
                return { value: col._id, label: col.name };
              })}
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-medium">Images</label>
          <input
            type="file"
            name="images"
            multiple
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Submit Button */}
        <div className=" flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
