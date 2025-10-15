import React from "react";
import logo from "../assets/vedaPixelLogo.png";
import { motion } from "framer-motion";
import "../CSS/Menu.css";

const Menu = () => {
  const textDelay = 1.5;
  return (
    <>
      <div className="menu-sticky mt-10 flex justify-between px-20  py-3 sticky top-0 ">
        <div className=" flex place-items-end gap-2">
          <img src={logo} className="h-14" />
          <p className="company-name text-white text-2xl">VedaPixel</p>
        </div>
        <div className="nav-links text-white  place-items-center  flex gap-10 ">
          <p>Home</p>
          <p>Projects</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay + 0.4 }} // Added a delay for animation
            className="contact-button  border-2 py-2 px-3 rounded-md cursor-pointer inline-block"
          >
            Contact Us
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Menu;
