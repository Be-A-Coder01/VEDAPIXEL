import React from "react";
import logo from "../assets/vedaPixelLogo.png";
import { motion } from "framer-motion";
import "../CSS/Menu.css";

const Menu = () => {
  const textDelay = 1.5;
  return (
    <>
      <div className="menu-sticky pt-[40px] pr-[116px] z-10   flex justify-between pl-[132px]  sticky top-0 ">
        <div className=" flex place-items-end w-[200px] h-[64.21px] ">
          <img src={logo} className="h-[64px] w-[64px]" />
          <p className="company-name text-white text-[24.5px]">VedaPixel</p>
        </div>
        <div className="nav-links   w-[834px] h-[72px] text-white  place-items-center justify-end  flex gap-10 ">
          <p className="px-[4px] py-[8px] text-[24px] body-nav">Home</p>
          <p className="px-[4px] py-[8px] text-[24px] body-nav">Projects</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay + 0.4 }} // Added a delay for animation
            className=" contact-button body-nav text-[24px] h-[52px] w-[149px] border-2 px-[8px] py-[8px] rounded-md cursor-pointer inline-block"
          >
            Contact Us
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Menu;
