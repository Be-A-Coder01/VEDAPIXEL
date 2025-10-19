import React, { useEffect } from "react";
import logo from "../assets/vedaPixelLogo.png";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "../CSS/Menu.css";

const Menu = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector(".menu-sticky");
      if (!menu) return;

      const rect = menu.getBoundingClientRect();
      if (rect.top <= 0) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
      } else {
        controls.start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <>
      <div
        className="menu-sticky  sticky top-0 z-10 
        flex justify-between items-center 
        px-[clamp(1rem,6vw,8rem)] py-[clamp(0.8rem,1.5vw,2rem)]
        w-full backdrop-blur-[6px]"
      >
        {/* --- Logo + Company Name --- */}
        <div className="flex place-items-end  ">
          <img
            src={logo}
            alt="VedaPixel Logo"
            className="w-[10vw] md:w-[clamp(40px,5vw,65px)] md:h-[clamp(40px,5vw,65px)] object-contain"
          />
          <p
            className="company-name text-white 
              text-[clamp(16px,2vw,26px)] 
              tracking-tight"
          >
            VedaPixel
          </p>
        </div>

        {/* --- Navigation Links --- */}
        <div
          className="nav-links 
            flex flex-wrap place-items-end  justify-end 
            gap-[clamp(10px,3vw,3rem)] 
            text-white"
        >
          <Link to="/">
            <p
              className="body-nav md:px-[clamp(4px,0.6vw,8px)] py-[6px] text-[12px]
              md:text-[clamp(14px,1.4vw,22px)] cursor-pointer"
            >
              Home
            </p>
          </Link>

          <Link to="/about">
            <p
              className="body-nav text-[12px] md:px-[clamp(4px,0.6vw,8px)] py-[6px] 
              md:text-[clamp(14px,1.4vw,22px)] cursor-pointer"
            >
              About Us
            </p>
          </Link>

          <Link to="/contactus">
            <motion.p
              className="contact-button 
      text-[clamp(10px,2.5vw,14px)] 
      px-[clamp(6px,2vw,10px)] 
      py-[clamp(4px,1.5vw,6px)]
      sm:text-[clamp(11px,2vw,15px)] sm:px-[clamp(8px,2vw,12px)] sm:py-[clamp(5px,1.5vw,7px)]
      md:text-[clamp(13px,1.3vw,20px)] md:px-[clamp(10px,2vw,18px)] md:py-[clamp(6px,1vw,10px)]
      lg:text-[clamp(14px,1.2vw,22px)] lg:px-[clamp(12px,2vw,20px)] lg:py-[clamp(6px,1vw,10px)]
      rounded-md cursor-pointer 
      font-semibold tracking-wide 
      text-[#1a1c22]
      flex items-center justify-center"
            >
              Contact&nbsp;Us
            </motion.p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
