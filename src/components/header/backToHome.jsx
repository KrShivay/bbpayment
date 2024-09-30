import React from "react";
import {FaHome} from "react-icons/fa";
import {IoMdQrScanner} from "react-icons/io";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function BackToHome() {
  const navigate = useNavigate();
  const {redirectUrl} = useSelector((state) => state.bbpsSlice);
  const redirectHome = () => {
    navigate(redirectUrl || "/");
  };

  const handleFullscreen = () => {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
  };

  return (
    <nav className="bg-white container-fluid flex items-center justify-between h-[70px] shadow-md px-4">
      <img src={logo} className="h-12 cursor-pointer" onClick={redirectHome} />
      <div className="flex justify-center items-center gap-7 ">
        {/* <IoMdQrScanner className="text-xl cursor-pointer hover:text-blue-500" onClick={handleFullscreen} title="Full Screen" /> */}
        <div
          className="flex items-center p-2 bg-transparent border border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:text-primary transition-all duration-300"
          onClick={handleFullscreen}
        >
          <IoMdQrScanner className="text-xl mr-2" title="Full Screen" />
          <span className="text-sm">Full Screen</span>
        </div>

        <div
          className="flex items-center p-2 bg-transparent border border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:text-primary transition-all duration-300"
          onClick={redirectHome}
        >
          <FaHome className="text-xl mr-2" title="Home" />
          <span className="text-sm">Home</span>
        </div>
      </div>
    </nav>
  );
}
