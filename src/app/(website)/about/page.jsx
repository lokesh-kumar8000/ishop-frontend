import Revenue from "@/components/website/Revenue";
import React from "react";
import { SiGoogleauthenticator } from "react-icons/si";
import { FaShippingFast } from "react-icons/fa";
import { IoPricetag } from "react-icons/io5";

function page() {
  const facelties = [
    {
      name: (
        <>
          100% authentic <br /> products
        </>
      ),
      icon: <SiGoogleauthenticator />,
      pera: " Swoo Tech Mart just distribute 100% authorized products & guarantee quality. Nulla porta nulla nec orci vulputate, id rutrum sapien varius.",
    },
    {
      name: (
        <>
          fast <br /> delivery
        </>
      ),
      icon: <FaShippingFast />,
      pera: " Fast shipping with a lots of option to delivery. 100% guarantee that your goods alway on time and perserve quality.",
    },
    {
      name: (
        <>
          affordable <br /> price
        </>
      ),
      icon: <IoPricetag />,
      pera: " We offer an affordable & competitive price with a lots of special promotions.",
    },
  ];
  const leader = [
    {
      name: "Henry Avery",
      pera: "Chairman",
      img: "/images/about/leader1.png",
    },
    {
      name: "Michael Edward",
      pera: "Vice President",
      img: "/images/about/leader2.png",
    },
    {
      name: "Eden Hazard",
      pera: "CEO",
      img: "/images/about/leader3.png",
    },
    {
      name: "Robert Downey Jr",
      pera: "CEO",
      img: "/images/about/leader4.png",
    },
    {
      name: "Nathan Drake",
      pera: "strategist director",
      img: "/images/about/leader5.png",
    },
  ];
  return (
    <div className=" py-[15px] px-[20px] sm:py-[25] sm:px-[0px] w-full  ">
      <div>
        {/* hero seaction  */}
        <div className="bg-[url(/images/about/hero.png)] bg-cover bg-center w-full rounded-[10px] flex flex-col justify-center px-6 sm:px-10 md:px-20 py-12 sm:py-16 md:py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Best experience <br className="hidden sm:block" />
            always wins
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#666666] leading-5 sm:leading-6 mt-3 sm:mt-4">
            #1 Online Marketplace for Electronic & Technology{" "}
            <br className="hidden sm:block" />
            in Mahanttan, CA
          </p>
        </div>
        {/* after hero seaction  */}
        <Revenue />
        {/* show reel seaction  */}

        <div className="w-full flex flex-col lg:flex-row my-7 gap-6">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-[10px] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] object-cover"
              src="/images/about/banner.jpg"
              alt="about banner"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 bg-[#c9cdd9] rounded-[10px] py-8 sm:py-12 md:py-20 px-6 sm:px-10 md:px-20 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg md:text-[18px] font-bold leading-6 sm:leading-7">
              We connect millions of buyers and sellers around the world,
              empowering people & creating economic opportunity for all.
            </h3>

            <p className="text-sm sm:text-[14px] leading-6 py-6 sm:py-8 md:py-10">
              Within our markets, millions of people around the world connect,
              both online and offline, to make, sell and buy unique goods. We
              also offer a wide range of Seller Services and tools that help
              creative entrepreneurs start, manage & scale their businesses.
            </p>

            <button className="bg-[#01A49E] rounded-[10px] text-white py-2.5 px-4 text-[12px] sm:text-sm font-medium cursor-pointer w-fit">
              our showreel
            </button>
          </div>
        </div>
        {/* Facelties seaction  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facelties.map((data, i) => {
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-[16px] shadow-sm hover:shadow-md transition"
              >
                {/* Top Row */}
                <div className="flex justify-between items-center gap-4">
                  <h1 className="text-[16px] sm:text-[18px] font-bold uppercase leading-5">
                    {data.name}
                  </h1>
                  <div className="bg-[#01A49E] text-white h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] rounded-full text-[24px] sm:text-[30px] flex justify-center items-center shrink-0">
                    {data.icon}
                  </div>
                </div>

                {/* Paragraph */}
                <p className="text-sm sm:text-base leading-6 text-[#666666] pt-5 sm:pt-7">
                  {data.pera}
                </p>
              </div>
            );
          })}
        </div>
        {/* Our mission and vision  */}
        <div className=" bg-white p-6 rounded-[10px] my-6 ">
          <h3 className=" text-[18px] md:text-[22px] font-bold leading-5 uppercase ">
            our mission and vision
          </h3>
          <p className=" text-[14px] md:text-[16px] leading-6 py-6 ">
            Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras
            non elit vel magna molestie pellentesque in eu dui. Donec laoreet
            quis erat vitae finibus. Vestibulum enim eros, porta eget quam et,
            euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi id
            felis placerat porta vel sed augue. Vivamus mollis mauris vitae
            rhoncus egestas. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas.
          </p>

          {/* Image */}
          <img
            className=" w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-[10px] pb-5 "
            src="/images/about/ourMission.png"
            alt=""
          />

          {/* Timeline Section */}
          <div className=" py-5 border-y border-[#cac8c8] ">
            <h3 className=" text-[18px] md:text-[20px] font-bold leading-5 ">
              from a retail store to the global chain of stores
            </h3>
            <p className=" text-sm md:text-[15px] leading-6 py-6 ">
              Pellentesque laoreet justo nec ex sodales euismod. Aliquam orci
              tortor, bibendum nec ultricies ac, auctor nec purus. Maecenas in
              consectetur erat.
            </p>

            <div className=" flex flex-col md:flex-row gap-6 ">
              {/* Left */}
              <div className=" w-full md:w-1/2 ">
                <ul className=" space-y-4 ">
                  <li className=" text-[14px]">
                    <strong>1947:</strong> A small store located in Brooklyn
                    Town, USA
                  </li>
                  <li className=" text-[14px]">
                    <strong>1998:</strong> It is a long established fact that a
                    reader will be distracted by the readable
                  </li>
                  <li className=" text-[14px]">
                    <strong>2000:</strong> Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry
                  </li>
                  <li className=" text-[14px]">
                    <strong>2002:</strong> Lorem Ipsum has been the industry's
                    standard dummy text ever since the
                  </li>
                  <li className=" text-[14px]">
                    <strong>2004:</strong> Contrary to popular belief, Lorem
                    Ipsum is not simply random text
                  </li>
                  <li className=" text-[14px]">
                    <strong>2005:</strong> The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters
                  </li>
                  <li className=" text-[14px]">
                    <strong>2006:</strong> Many variations of passages of Lorem
                    Ipsum available
                  </li>
                  <li className=" text-[14px]">
                    <strong>2010:</strong> All the Lorem Ipsum generators on the
                    Internet tend to repeat predefined
                  </li>
                  <li className=" text-[14px]">
                    <strong>2013:</strong> Lorem Ipsum comes from sections
                    1.10.32
                  </li>
                </ul>
              </div>

              {/* Right */}
              <div className=" w-full md:w-1/2 ">
                <ul className=" space-y-4 ">
                  <li className=" text-[14px]">
                    <strong>2014:</strong> Many variations of passages of Lorem
                    Ipsum available
                  </li>
                  <li className=" text-[14px]">
                    <strong>2016:</strong> All the Lorem Ipsum generators on the
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className=" text-[14px]">
                    <strong>2020:</strong> Lorem Ipsum comes from sections
                    1.10.32
                  </li>
                  <li className=" text-[14px]">
                    <strong>2021:</strong> Making this the first true generator
                    on the Internet
                  </li>
                  <li className=" text-[14px]">
                    <strong>2022:</strong> Lorem Ipsum which looks reasonable
                  </li>
                  <li className=" text-[14px]">
                    <strong>2023:</strong> Many variations of passages of Lorem
                    Ipsum available
                  </li>
                  <li className=" text-[14px]">
                    <strong>2024:</strong> Lorem Ipsum comes from sections
                    1.10.32
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className=" my-4 ">
            <div className=" flex justify-between items-center ">
              <h1 className=" font-bold text-[18px] leading-5 uppercase ">
                leaderships
              </h1>
              <p className=" cursor-pointer text-sm text-blue-600">
                {" "}
                View All{" "}
              </p>
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-5 ">
              {leader.map((data, i) => {
                return (
                  <div key={i} className=" text-center ">
                    <img
                      src={data.img}
                      className=" h-[250px] sm:h-[280px] md:h-[320px] w-full object-cover rounded-[10px] "
                      alt=""
                    />
                    <h5 className=" font-bold leading-4 pt-2 ">{data.name}</h5>
                    <p className=" text-[12px] text-[#666666] leading-4 ">
                      {data.pera}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
