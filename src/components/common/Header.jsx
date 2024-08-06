import React from "react";
import {FaIndianRupeeSign} from "react-icons/fa6";
import {GrNotes} from "react-icons/gr";
import {IoMdCash} from "react-icons/io";
import {MdPayments} from "react-icons/md";

export default function Header() {
  return (
    <>
      <div className="container text-white pt-2">
        <div className="bg-primary bg-custom-image bg-cover bg-center w-20 text-white font-semibold text-center py-2 rounded-md ">
          HOME
        </div>
        <div className="my-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="bg-primary group flex items-center  grow md:h-[120px] p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center hover:shadow-lg hover:shadow-gray-500 cursor-pointer transition-all duration-500">
            <div className="bg-primary-dark p-4 rounded-full">
              <FaIndianRupeeSign className="text-2xl text-secondary-light brightness-105" />
            </div>
            <div>
              <p className="mb-1 pt-3 text-base uppercase">Balance Enquiry</p>
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                10
              </p>
            </div>
          </div>

          <div className="bg-primary group flex items-center  grow md:h-[120px] p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center hover:shadow-lg hover:shadow-gray-500 cursor-pointer transition-all duration-500">
            <div className="bg-primary-dark p-4 rounded-full">
              <GrNotes className="text-2xl text-yellow-300" />
            </div>
            <div>
              <p className="mb-1 pt-3 text-base uppercase">Mini Statement</p>
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                10
              </p>
            </div>
          </div>

          <div className="bg-primary group flex items-center  grow md:h-[120px] p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center hover:shadow-lg hover:shadow-gray-500 cursor-pointer transition-all duration-500">
            <div className="bg-primary-dark p-4 rounded-full">
              <IoMdCash className="text-2xl text-green-300" />
            </div>
            <div>
              <p className="mb-1 pt-3 text-base uppercase">cash withdrawl</p>
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                10
              </p>
            </div>
          </div>
          <div className="bg-primary group flex items-center  grow md:h-[120px] p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center hover:shadow-lg hover:shadow-gray-500 cursor-pointer transition-all duration-500">
            <div className="bg-primary-dark p-4 rounded-full">
              <MdPayments className="text-2xl text-orange-300" />
            </div>
            <div>
              <p className="mb-1 pt-3 text-base uppercase">adhar pay</p>
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                10
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
