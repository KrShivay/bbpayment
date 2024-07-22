import React, { useState } from "react";
import {
  FaAngleDown,
  FaCaretDown,
  FaEye,
  FaEyeSlash,
  FaRegSquare,
  FaSyncAlt,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { HiVolumeUp } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { PiBookOpenBold } from "react-icons/pi";
import bank1 from "../assets/images/bank-1.png";
import bank2 from "../assets/images/bank-2.png";
import bank3 from "../assets/images/bank-3.png";
import bank4 from "../assets/images/bank-4.png";
import bank5 from "../assets/images/bank-5.png";
import indiaflag from "../assets/images/india.png";
import ukflag from "../assets/images/uk.png";
import Header from "../components/common/Header";
import QuickLinks from "../components/QuickLinks";
export default function Home() {
  const [amount, setAmount] = useState("");
  const [isAdhar, setIsAdhar] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Balance Enquiry");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState("TypeA");
  const [showAdhar, setShowAdhar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const handleAmountClick = (value) => {
    setAmount(value);
  };
  const handleToggle = () => {
    setIsAdhar((prev) => !prev);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowDropdown(false);
  };
  const togglePasswordVisibility = () => {
    setShowAdhar((prev) => !prev);
  };
  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev); // Toggle the isChecked state
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <>
      <div className="bg-background">
        <Header />
        <div className="container mt-7 flex flex-wrap justify-center md:justify-between gap-3">
          <div className="relative">
            <div
              className="bg-secondary  flex flex-nowrap items-center justify-between md:justify-between text-white py-2 px-4 rounded-md cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <label>Type</label>
              <FaAngleDown className="" />
            </div>
            {showDropdown && (
              <div className="absolute top-10 left-0 right-0 bg-white shadow-md rounded-md p-1 z-20">
                <div
                  className={`cursor-pointer p-2 text-secondary-dark border-b border-gray-300 text-sm ${
                    selectedType === "TypeA" ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleTypeSelect("TypeA")}
                >
                  Type A
                </div>
                <div
                  className={`cursor-pointer p-2 text-secondary-dark text-sm ${
                    selectedType === "TypeB" ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleTypeSelect("TypeB")}
                >
                  Type B
                </div>
              </div>
            )}

            {selectedType && (
              <div className="bg-white px-10 py-5  shadow-md mt-2 rounded-md h-[258px] md:h-[267px] w-[256px] md:w-[260px]">
                {selectedType === "TypeA" && (
                  <>
                    <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
                      <FaSyncAlt className="text-green-500 text-xl" /> Morphis
                    </p>

                    <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 ">
                      <PiBookOpenBold className="text-orange-500 text-2xl" />
                      Mantra
                    </p>
                  </>
                )}
                {selectedType === "TypeB" && (
                  <>
                    <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 border-b border-gray-300 pb-3">
                      <FaSyncAlt className="text-green-500 text-2xl" /> ABC
                    </p>
                    <p className="flex items-center gap-5 text-sm md:text-base font-semibold my-3 ">
                      <PiBookOpenBold className="text-orange-500 text-2xl" />
                      DEF
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-center md:justify-between flex-wrap gap-2 ">
              <div
                onClick={() => handleOptionClick("Balance Enquiry")}
                className={`uppercase cursor-pointer text-center text-white w-[150px] md:w-[200px] p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center  transition-all duration-500 ${
                  selectedOption === "Balance Enquiry"
                    ? "bg-secondary-dark"
                    : "bg-secondary"
                }`}
              >
                Balance Enquiry
              </div>
              <div
                onClick={() => handleOptionClick("Mini Statement")}
                className={`uppercase cursor-pointer text-center text-white w-[150px] md:w-[200px]  p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center  transition-all duration-500 ${
                  selectedOption === "Mini Statement"
                    ? "bg-secondary-dark"
                    : "bg-secondary"
                }`}
              >
                Mini Statement
              </div>
              <div
                onClick={() => handleOptionClick("Cash Widthdrawl")}
                className={`uppercase cursor-pointer text-white w-[150px] md:w-[200px] text-center p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center transition-all duration-500 ${
                  selectedOption === "Cash Widthdrawl"
                    ? "bg-secondary-dark"
                    : "bg-secondary"
                }`}
              >
                Cash Withdrawl
              </div>
              <div
                onClick={() => handleOptionClick("Adhar Pay")}
                className={`uppercase cursor-pointer text-white w-[150px] text-center md:w-[200px]  p-[20px] text-base rounded-md bg-custom-image bg-cover bg-center transition-all duration-500 ${
                  selectedOption === "Adhar Pay"
                    ? "bg-secondary-dark"
                    : "bg-secondary"
                }`}
              >
                Adhar Pay
              </div>
            </div>

            <div className="bg-white my-3 p-3 rounder-md shadow-md lg:w-[900px]">
              <div className="mt-2 mx-3 flex gap-3 items-center">
                <div>
                  <button className="px-2 py-1 bg-secondary-light rounded">
                    <IoMdRefresh className="text-xl cursor-pointer text-white " />
                  </button>
                </div>
                <div className=" text-gray-500 flex flex-nowrap justify-between items-center bg-background p-2 rounded-md w-full">
                  <label className="text-base">Select Bank</label>
                  <FaCaretDown className="text-2xl" />
                </div>
              </div>
              <div className=" flex flex-wrap items-center gap-4 mt-3 font-semibold mx-5">
                <p> Recent Banks </p>
                <img src={bank1} className="h-8 w-8 " />
                <img src={bank2} className="h-8 w-8 " />
                <img src={bank3} className="h-8 w-8 " />
                <img src={bank4} className="h-8 w-8 " />
                <img src={bank5} className="h-8 w-8 " />
              </div>
              {/* Toggle Switch */}
              <div className="flex items-center mt-2 mb-4 mx-5">
                <div
                  onClick={handleToggle}
                  className="cursor-pointer text-3xl text-green-500"
                >
                  {isAdhar ? <FaToggleOn /> : <FaToggleOff />}
                </div>
              </div>
              <form action="" className="mt-4 mx-5">
                <div className="relative mb-3">
                  {isAdhar ? (
                    <input
                      type={showAdhar ? "text" : "password"}
                      placeholder="Virtual Aadhaar Number*"
                      className="px-3 py-1 border border-gray-300 rounded-md w-full focus:outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Adhar Number*"
                      className="px-3 py-1  border border-gray-300 rounded-md w-full focus:outline-none"
                    />
                  )}
                  {/* Eye icon for toggling password visibility */}
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showAdhar ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <input
                  type="tel"
                  placeholder="Customer Contact Number*"
                  className="mb-3 px-3 py-1  border border-gray-300 rounded-md w-full focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="mb-3 px-3 py-1  border border-gray-300 rounded-md w-full focus:outline-none"
                />

                {(selectedOption === "Cash Widthdrawl" ||
                  selectedOption === "Adhar Pay") && (
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <input
                      type="text"
                      placeholder="Amount"
                      className="px-3 py-1  border border-gray-300 rounded-md w-full md:w-36   focus:outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 ml-4">
                      <div
                        className="px-2 py-1 bg-primary text-white rounded cursor-pointer hover:bg-primary-light transition-all duration-300"
                        onClick={() => handleAmountClick(10000)}
                      >
                        10000
                      </div>
                      <div
                        className="px-2 py-1 bg-primary text-white rounded cursor-pointer hover:bg-primary-light transition-all duration-300"
                        onClick={() => handleAmountClick(7000)}
                      >
                        7000
                      </div>
                      <div
                        className="px-2 py-1 bg-primary text-white rounded cursor-pointer hover:bg-primary-light transition-all duration-300"
                        onClick={() => handleAmountClick(5000)}
                      >
                        5000
                      </div>
                      <div
                        className="px-2 py-1 bg-primary text-white rounded cursor-pointer hover:bg-primary-light transition-all duration-300"
                        onClick={() => handleAmountClick(3000)}
                      >
                        3000
                      </div>
                      <div
                        className="px-2 py-1 bg-primary text-white rounded cursor-pointer hover:bg-primary-light transition-all duration-300"
                        onClick={() => handleAmountClick(1000)}
                      >
                        1000
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <div className="flex flex-wrap justify-start gap-7 items-center ml-6">
                <div
                  className="flex flex-wrap gap-2 items-center"
                  onClick={toggleCheckbox}
                >
                  {isChecked ? (
                    <FaRegSquareCheck className="text-gray-500" />
                  ) : (
                    <FaRegSquare className="text-gray-500" />
                  )}
                  <p>I agree to the</p>
                  <p>Terms and Policy</p>
                  <HiVolumeUp />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="  px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-light transition-all duration-200"
                >
                  Submit
                </button>
              </div>
              <div className="flex gap-4 items-center justify-start">
                <div className="ml-6 pb-3 flex">
                  <div
                    onClick={() =>
                      setShowLanguageDropdown(!showLanguageDropdown)
                    }
                    className="relative flex justify-between items-center gap-2 p-2 border border-gray-300 rounded cursor-pointer"
                  >
                    <div className="text-sm">Language</div>
                    <div>
                      <FaAngleDown />
                    </div>
                    {showLanguageDropdown && (
                      <div className="absolute bottom-10 left-0 right-0 bg-white shadow-md rounded-md p-1 ">
                        <div
                          className={`cursor-pointer p-2 text-secondary-dark border-b border-gray-300 text-sm hover:bg-gray-200 transition-all duration-300 ${
                            selectedLanguage === "english"
                              ? "bg-gray-200"
                              : "bg-white"
                          }`}
                          onClick={() => handleLanguageChange("english")}
                        >
                          English
                        </div>
                        <div
                          className={`cursor-pointer p-2 text-secondary-dark text-sm hover:bg-gray-200 transition-all duration-300 ${
                            selectedLanguage === "hindi"
                              ? "bg-gray-200"
                              : "bg-white"
                          }`}
                          onClick={() => handleLanguageChange("hindi")}
                        >
                          Hindi
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center mb-4 gap-3 ">
                  {selectedLanguage === "english" && (
                    <div className="flex flex-col items-center">
                      <img src={ukflag} alt="UK Flag" className="h-6 w-6 " />
                      <p className="text-sm">English</p>
                    </div>
                  )}
                  {selectedLanguage === "hindi" && (
                    <div className="flex flex-col items-center">
                      <img
                        src={indiaflag}
                        alt="India Flag"
                        className="h-6 w-6"
                      />
                      <p className="text-sm">Hindi</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <QuickLinks />
        </div>
      </div>
    </>
  );
}
