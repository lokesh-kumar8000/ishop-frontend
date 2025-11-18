"use client";
import { axioIsnstance, notify } from "@/library/helper";
import Link from "next/link";
import React, { useRef } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Page() {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const countryRef = useRef();
  const subRef = useRef();
  const msgRef = useRef(); 
  const formRef = useRef(); 

  function fromHandler(e) {
    e.preventDefault();

    const data = {
      fName: fNameRef.current.value,
      lName: lNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      country: countryRef.current.value,
      subject: subRef.current.value,
      message: msgRef.current.value,
    }; 

    axioIsnstance
      .post("contact/msg", data)
      .then((response) => {
        notify(response.data.message, true); 
        formRef.current.reset(); 
      })
      .catch((error) => {
        console.log(error);
      }); 
  } 

  return (
    <div className="w-full my-3.5">
      {/* Contact Section */}
      <div className="bg-white px-4 sm:px-8 md:px-12 py-8">
        <h2 className="text-xl md:text-2xl font-bold pb-8">
          READY TO WORK WITH US
        </h2>

        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side Form */}
          <div>
            <p className="text-[#666666] pb-3 text-sm md:text-base">
              Contact us for all your questions and opinions
            </p>

            {/* Form */}
            <form ref={formRef} onSubmit={fromHandler} className="space-y-6">
              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    ref={fNameRef}
                    className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    ref={lNameRef}
                    className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  ref={emailRef}
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">
                  Phone Number{" "}
                  <span className="text-[#666666]">(Optional)</span>
                </label>
                <input
                  type="text"
                  ref={phoneRef}
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue="India"
                  ref={countryRef}
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option>United States (US)</option>
                  <option>United Kingdom (UK)</option>
                  <option>India</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium">
                  Subject <span className="text-[#666666]">(Optional)</span>
                </label>
                <input
                  type="text"
                  ref={subRef}
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  rows="5"
                  required
                  ref={msgRef}
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Note about your order, e.g. special note for delivery"
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm text-gray-600">
                  I want to receive news and updates once in a while. By
                  submitting, I'm agreed to the{" "}
                  <a href="#" className="text-green-600 underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-[#01A49E] cursor-pointer text-white px-6 py-3 rounded-md hover:bg-[#18b9b4] text-[12px] sm:text-sm md:text-base"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Right Side Info */}
          <div className="space-y-6">
            <div className="bg-[#EDEFF6] rounded-md p-6 space-y-6">
              <div>
                <h3 className="text-[12px] uppercase text-[#666666] pb-3">
                  United States (Head Quater)
                </h3>
                <p className="text-gray-700 leading-7 text-sm sm:text-base">
                  152 Thatcher Road St, Mahattan, 10463, US <br />
                  (+025) 3886 25 16
                </p>
                <Link href="" className="text-green-600 block pt-2">
                  hello@swattechmart.com
                </Link>
              </div>

              <div>
                <h3 className="text-[12px] uppercase text-[#666666] pb-3">
                  United Kingdom (Branch)
                </h3>
                <p className="text-gray-700 leading-7 text-sm sm:text-base">
                  12 Buckingham Rd, Thornthwaite, HG3 4TY, UK <br />
                  (+718) 895-5350
                </p>
                <Link href="" className="text-green-600 block pt-2">
                  contact@swattechmart.co.uk
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 sm:space-x-4">
                {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube].map(
                  (Icon, i) => (
                    <Link
                      key={i}
                      href=""
                      className="h-[35px] w-[35px] bg-white rounded-full flex justify-center items-center text-gray-600 hover:text-[#01A49E] shadow-sm"
                    >
                      <Icon />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Image */}
            <div>
              <img
                src="/images/contact.png"
                alt="working"
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="bg-white p-5 sm:p-7 my-3.5">
        <h2 className="text-[16px] sm:text-[18px] font-bold leading-5 uppercase">
          find us on google map
        </h2>
        <div className="w-full mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.0532124395!2d75.62574534444468!3d26.885115143864432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2z4KSc4KSv4KSq4KWB4KSwLCDgpLDgpL7gpJzgpLjgpY3gpKXgpL7gpKg!5e0!3m2!1shi!2sin!4v1758173854482!5m2!1shi!2sin"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-md"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Page;
