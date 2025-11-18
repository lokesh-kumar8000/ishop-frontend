import React from "react";

function Hero() {
  return (
    <div className=" bg-white rounded-[10px] my-4">
      <div className="py-[25px] px-[30px]">
        <h2 className="text-[18px] font-bold uppercase">
          top cell phones & tablets
        </h2>
        <div className="pt-4 flex flex-col md:flex-row items-stretch justify-center gap-4">
          
          {/* Left Hero */}
          <div className='bg-[url(/images/hero1.png)] w-full md:w-[67%] rounded-[10px] bg-cover bg-center'>
            <div className="px-6 md:px-10 py-10 md:py-15 text-white">
              <h1 className="text-[22px] md:text-[30px] font-bold mb-4 leading-7 md:leading-9">
                Noise Cancelling <br />
                <span className="font-light">Headphone</span>
              </h1>
              <p className="text-[12px] leading-[18px]">Boso Over-Ear Headphone</p>
              <p className="text-[12px] leading-[18px]">Wifi, Voice Assistant,</p>
              <p className="text-[12px] leading-[18px] mb-6">
                Low latency game mde
              </p>
              <button className="bg-white text-black py-[7px] px-[16px] text-[12px] font-medium rounded-[10px] cursor-pointer">
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Hero */}
          <div className='bg-[url("/images/hero2.png")] w-full md:w-[33%] rounded-[10px] bg-cover bg-center'>
            <div className="px-6 md:px-7 pt-10 pb-28 md:pb-48 flex flex-col justify-between h-full">
              <div>
                <h1 className="text-[20px] md:text-[24px] font-medium leading-6 md:leading-7 mb-2.5">
                  redmi note 12 <br /> Pro+ 5g
                </h1>
                <p className="text-[12px] text-[#666666]">
                  Rise to the challenge
                </p>
              </div>
              <button className="mt-4 md:mt-0 bg-black text-white py-[8px] px-[16px] rounded-[10px] text-[12px] font-medium cursor-pointer self-start md:self-end">
                SHOP NOW
              </button>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
}

export default Hero;
