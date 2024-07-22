import React from "react";
import { CiBank } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { RiDeviceLine } from "react-icons/ri";
import { SiSecurityscorecard } from "react-icons/si";

export default function QuickLinks() {
  return (
    <>
      <div className="bg-white px-8 py-5 shadow-md rounded-md h-[300px] md:h-[315px] w-[256px] md:w-[260px]">
        <p className=" text-base md:text-lg mb-5 ">Quick Links</p>
        <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
          <GrTransaction className="text-green-500 text-xl md:text-2xl" />{" "}
          Transactions
        </p>
        <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
          <CiBank className="text-orange-500 text-xl md:text-2xl" /> Move To
          Bank
        </p>
        <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
          <SiSecurityscorecard className="text-blue-500 text-xl md:text-2xl" />{" "}
          Complete 2FA
        </p>
        <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
          <RiDeviceLine className="text-yellow-500 text-xl md:text-2xl" />
          Device Driver Links
        </p>
        <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 ">
          <IoSettingsSharp className="text-gray-500 text-xl md:text-2xl" />{" "}
          Settings
        </p>
      </div>
    </>
  );
}
