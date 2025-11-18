"use client";

import { getCategory } from "@/library/api.call";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
function PopularCategories() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allCategory = await getCategory();
      setCategory(allCategory.data);
    };
    fetchData();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="  bg-white rounded-[10px] my-4 ">
      <div className=" py-[25px] px-[30px] ">
        <h2 className=" text-[18px] font-bold uppercase pb-3.5 ">
          popular categories
        </h2>
        <div className="slider-container">
          {category.length > 0 ? (
            <Slider {...settings}>
              {category.map((data, index) => {
                return (
                  <div className="  ml-2 " key={index}>
                    <div className=" flex flex-col justify-center items-center ">
                      <Link
                        href={`/store/${data.slug}`}
                        className=" flex flex-col justify-center items-center "
                      >
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API__BASE_URL}/image/category/${data.image}`}
                            alt="img"
                            className=" h-20 w-20 rounded-full  border border-gray-200 p-1  "
                          />
                        </div>
                        <h1 className=" font-bold text-[14px] ">{data.name}</h1>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
