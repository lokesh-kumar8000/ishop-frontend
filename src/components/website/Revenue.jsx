'use client'
import React from 'react'
import CountUp from 'react-countup'; 

function Revenue() {
  return (
   <div className="w-full bg-white py-12 px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row gap-8 md:gap-0 shadow-2xl rounded-[10px] ">
        {/* Left Section */}
        <h6 className="md:w-1/3 text-lg sm:text-xl md:text-[18px] font-bold uppercase leading-7 sm:leading-8 text-center md:text-left">
          our purpose is to{" "}
          <span className="text-green-500">
            enrich <br className="hidden sm:block" />
            and enhance{" "}
          </span>
          lives through <br className="hidden sm:block" />
          technology
        </h6>

        {/* Right Section */}
        <div className="md:w-2/3 flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h6 className="text-3xl sm:text-4xl md:text-[40px] font-bold">
              $
              <CountUp start={1} end={12.5} duration={5} decimals={1} />M
            </h6>
            <p className="text-xs sm:text-sm leading-5 text-[#666666] uppercase">
              total revenue from <br />
              2001 - 2025
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h6 className="text-3xl sm:text-4xl md:text-[40px] font-bold">
              <CountUp start={1} end={12} duration={5} decimals={1} />K+
            </h6>
            <p className="text-xs sm:text-sm leading-5 text-[#666666] uppercase">
              orders delivered <br />
              successful on everyday
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h6 className="text-3xl sm:text-4xl md:text-[40px] font-bold">
              <CountUp start={1} end={725} duration={4} decimals={2} />+
            </h6>
            <p className="text-xs sm:text-sm leading-5 text-[#666666] uppercase">
              store and office in U.S <br />
              and worldwide
            </p>
          </div>
        </div>
      </div> 
  )
}

export default Revenue