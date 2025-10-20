import React, { useEffect, useState } from "react";
import logo from "../assets/vedaPixelLogo.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "../CSS/Menu.css";
import email from "../assets/email.png";
import phone from "../assets/phone.png";

const Menu = () => {
  const controls = useAnimation();
  const [navPopup, setNavPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // 🔹 Animate on scroll (header fade)
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

  // 🔹 Handle window resize (auto-close popup if desktop)
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setNavPopup(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="menu-sticky py-10 place-items-center sticky top-0 z-20 
        flex justify-between items-center 
        px-[7%] md:px-[8%] md:py-[clamp(0.8rem,1.5vw,2rem)]
        w-full backdrop-blur-[6px]"
      >
        {/* --- Logo + Company Name --- */}
        <div className="flex mt-5 md:mt-0 place-items-end">
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

        {/* --- Navigation Links (Desktop) --- */}
        {isMobile ? (
          <i
            className="fa-solid fa-bars text-2xl mt-5 text-white cursor-pointer"
            onClick={() => setNavPopup(!navPopup)}
          ></i>
        ) : (
          <div
            className="nav-links 
            flex flex-wrap place-items-end justify-end 
            gap-[clamp(10px,3vw,3rem)] 
            text-white"
          >
            <Link to="/">
              <p
                className="body-nav md:px-[clamp(4px,0.6vw,8px)] md:py-[6px] text-[12px]
              md:text-[clamp(14px,1.4vw,22px)] cursor-pointer"
              >
                Home
              </p>
            </Link>

            <Link to="/about">
              <p
                className="body-nav text-[12px] md:px-[clamp(4px,0.6vw,8px)] md:py-[6px] 
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
        )}

        {/* --- Animated Mobile Menu Popup --- */}
        <AnimatePresence>
          {navPopup && (
            <motion.div
              key="menu-popup"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                x: 100,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="menuBar fixed top-0 right-0 w-[70%] h-[100vh]
                         flex flex-col text-[20px] 
                         px-8 py-10 text-white gap-6
                         border-l border-white/15 shadow-2xl
                         backdrop-blur-[25px] bg-[rgba(20,20,30,0.45)]
                         bg-gradient-to-b from-[rgba(50,50,80,0.35)] via-[rgba(30,30,50,0.25)] to-[rgba(10,10,20,0.2)]
                         rounded-l-2xl z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <p className="text-[1.4rem] font-semibold tracking-wide">
                  Menu
                </p>
                <i
                  className="fa-solid fa-xmark text-xl cursor-pointer hover:text-[#C7B9F6] transition"
                  onClick={() => setNavPopup(false)}
                ></i>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-5"
              >
                <motion.p
                  whileHover={{ color: "#C7B9F6", x: 5 }}
                  className="cursor-pointer transition"
                  onClick={() => setNavPopup(false)}
                >
                  Home
                </motion.p>
                <motion.p
                  whileHover={{ color: "#C7B9F6", x: 5 }}
                  className="cursor-pointer transition"
                  onClick={() => setNavPopup(false)}
                >
                  About Us
                </motion.p>
                <motion.p
                  whileHover={{ color: "#C7B9F6", x: 5 }}
                  className="cursor-pointer transition"
                  onClick={() => setNavPopup(false)}
                >
                  Contact Us
                </motion.p>
              </motion.div>

              <div className="border-t border-white/10 mt-6 pt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={email}
                    alt="email"
                    className="h-[18px] sm:h-[20px]"
                  />
                  <span className="text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)]">
                    info@vedapixel.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={phone}
                    alt="phone"
                    className="h-[18px] sm:h-[20px]"
                  />
                  <span className="text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)]">
                    +91 9036354261
                  </span>
                </div>
              </div>

              <p className="text-[#F8F9FA]/80 text-[12px] mt-auto">
                &copy; 2025 VedaPixel Tech Solution Pvt. Ltd.
                <br />
                All Rights Reserved.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Menu;
