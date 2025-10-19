import React, { useEffect } from "react";
import logo from "../assets/vedaPixelLogo.png";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "../CSS/Menu.css";

const Menu = () => {
  const textDelay = 1.5;
  const controls = useAnimation();

  // 🟢 Scroll listener to detect when sticky menu hits top (top=0)
  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector(".menu-sticky");
      if (!menu) return;

      const rect = menu.getBoundingClientRect();

      if (rect.top <= 0) {
        // Menu has reached the top → trigger fade-in
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
      } else {
        // Before reaching top → keep hidden/dim
        controls.start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount in case page starts scrolled
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <>
      <div className="menu-sticky pt-[40px]  z-10 flex justify-between mx-32 sticky top-0">
        <div className="flex place-items-end w-[200px] h-[64.21px]">
          <img
            src={logo}
            className="md:h-[55px] md:w-[55px] lg:h-[64px] lg:w-[64px]"
            alt="VedaPixel Logo"
          />
          <p className="company-name text-white md:text-[20px] lg:text-[24.5px]">
            VedaPixel
          </p>
        </div>

        <div className="nav-links  lg:w-[834px] h-[72px] text-white place-items-center justify-end flex gap-10">
          <Link to="/">
            <p className="md:px-[3px] lg:px-[4px] py-[8px] md:text-[20px] lg:text-[24px] body-nav">
              Home
            </p>
          </Link>

          <Link to="/about">
            <p className="md:px-[3px] lg:px-[4px] py-[8px] md:text-[20px] lg:text-[24px] body-nav">
              About Us
            </p>
          </Link>

          {/* 🟣 Contact Us — animated only when menu reaches top */}
          <Link to="/contactus">
            <motion.p
              // initial={{ opacity: 0, y: 20 }}
              // animate={controls}
              className="contact-button body-nav md:text-[18px]  lg:text-[24px] md:h-[45px] md:-w-[142px] lg:h-[52px] lg:w-[149px] border-2 px-[8px] py-[8px] rounded-md cursor-pointer inline-block"
            >
              Contact Us
            </motion.p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
