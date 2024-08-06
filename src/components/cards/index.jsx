import React from "react";

export default function CardComponents({ handleClick, title, selected }) {
  return (
    <div
      onClick={() => handleClick(title)}
      className={`uppercase cursor-pointer text-center text-white text-base rounded-md bg-custom-image bg-cover bg-center  transition-all duration-500 min-w-56 min-h-20 mx-2 ${
        selected === title ? "bg-secondary-dark" : "bg-secondary"
      }`}
    >
      {title}
    </div>
  );
}
