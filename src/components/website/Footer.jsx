import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

function Footer() {
  const top = ["Laptops","PC & Computers","Cell Phones","Tablets","Gaming & VR","networks","Cameras","Sounds","Office"];
  const company = ["About Swoo","Contact","Career","Blog","Sitemap","Store Locations"];
  const help = ["Customer Service","Policy","Terms & Conditions","Trach Order","FAQs","My Account","Product Support"];
  const partner = ["Become Seller","Affiliate","Advertise","Partnership"];

  return (
    <div className="w-full bg-white ">
      <div className=" py-[25px] px-5 sm:px-[30px]">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Left Info */}
          <div className="w-full lg:w-[30%]">
            <h2 className="font-bold text-[18px] uppercase leading-[22px] pb-6">
              Swoo - 1st NYC tech online market
            </h2>
            <p className="text-[14px] leading-[23px] uppercase">hotline 24/7</p>
            <p className="text-[#1ABA1A] text-[26px] sm:text-[30px] leading-[36px] font-bold py-2">
              (025) 3686 25 16
            </p>
            <p className="text-[14px] leading-[23px]">
              257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
            </p>
            <p className="text-[14px] leading-[23px]">contact@Swootechmart.com</p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-3 flex-wrap">
              {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin].map((Icon, i) => (
                <div key={i} className="h-[35px] w-[35px] rounded-full bg-[#E1E3EB] flex justify-center items-center">
                  <Icon />
                </div>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row my-10 gap-5 sm:gap-10">
              <select className="text-[14px] border rounded-[10px] px-3 py-2">
                <option>USD</option><option>INR</option><option>EUR</option>
              </select>
              <select className="text-[14px] border rounded-[10px] px-3 py-2">
                <option>Hindi</option><option>Eng</option><option>Guj</option><option>Punjab</option>
              </select>
            </div>
          </div>

          {/* Right Links */}
          <div className="w-full lg:w-[70%]">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Top Categories */}
              <div>
                <h2 className="text-[18px] uppercase font-bold">Top Categories</h2>
                <ul className="py-[15px] space-y-2">
                  {top.map((d,i) => <li key={i} className="text-[14px] text-[#666]">{d}</li>)}
                </ul>
              </div>
              {/* Company */}
              <div>
                <h2 className="text-[18px] uppercase font-bold">Company</h2>
                <ul className="py-[15px] space-y-2">
                  {company.map((d,i) => <li key={i} className="text-[14px] text-[#666]">{d}</li>)}
                </ul>
              </div>
              {/* Help */}
              <div>
                <h2 className="text-[18px] uppercase font-bold">Help Center</h2>
                <ul className="py-[15px] space-y-2">
                  {help.map((d,i) => <li key={i} className="text-[14px] text-[#666]">{d}</li>)}
                </ul>
              </div>
              {/* Partner */}
              <div>
                <h2 className="text-[18px] uppercase font-bold">Partner</h2>
                <ul className="py-[15px] space-y-2">
                  {partner.map((d,i) => <li key={i} className="text-[14px] text-[#666]">{d}</li>)}
                </ul>
              </div>
            </div>

            {/* Subscribe Section */}
            <h1 className="text-[18px] font-bold uppercase py-8">
              subscribe & get <span className="text-red-500">10% off</span> for your first order
            </h1>
            <div className="border-b border-[#666] py-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <input type="email" placeholder="Enter your email address" className="flex-1 outline-none text-[14px]" />
              <button className="text-[14px] uppercase font-bold text-[#1ABA1A] cursor-pointer">subscribe</button>
            </div>
            <p className="text-[13px] italic text-[#666] py-2">
              By subscribing, you’re accepting our Policy
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-8 border-t border-[#999]">
          <p className="text-[14px]">© 2024 <strong>Shawonetc3</strong> . All Rights Reserved</p>
          <div className="flex gap-3 sm:gap-5 flex-wrap justify-center">
            <img src="/images/ptym1.png" alt="" />
            <img src="/images/ptym2.png" alt="" />
            <img src="/images/ptym3.png" alt="" />
            <img src="/images/ptym4.png" alt="" />
            <img src="/images/ptym5.png" alt="" />
          </div>
          <p className="text-[14px] text-[#0D6EFD]">Mobile Site</p>
        </div>

      </div>
    </div>
  );
}

export default Footer;
