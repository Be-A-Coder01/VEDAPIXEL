import React from "react";
import logo from "../assets/vedaPixelLogo.png";
import "../CSS/Footer.css";
import icon from "../assets/send.png";
import linkedin from "../assets/linkedin.png";
import Instagram from "../assets/instagram.png";
import email from "../assets/email.png";
import phone from "../assets/phone.png";
import { motion } from "framer-motion";

const Footer = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        className=" md:w-full   lg:w-[99vw]  pl-10 py-10 lg:px-[9rem] mt-32 "
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }} // triggers each time visible
      >
        <motion.div className="flex  py-10 lg:px-2  " variants={container}>
          {/* Left Section - Company Info */}
          <motion.div className="  footer-company-info w-2/6 " variants={item}>
            <img src={logo} alt="" className="lg:w-[5vw] l" />
            <p className="footer-company-name text-[20px] text-white lg:text-[2.3rem] leading-10 lg:leading-12">
              VedaPixel
            </p>
            <p className="footer-company-desc text-[8px] lg:text-[0.5rem] leading-0.5 lg:leading-0.5 text-white">
              Innovation in every Pixel
            </p>
            <div className="flex flex-col gap-[4px] lg:gap-[5px] mt-7">
              <div className="footer-email text-[#F8F9FA] text-[10px] lg:text-[0.8rem]">
                &copy; 2025 VedaPixel Tech Solution Pvt. Ltd. All Rights
                Reserved.
              </div>
              <div className="flex gap-[10px] place-items-center">
                <div className="flex gap-2 text-white">
                  <img src={email} className="h-[3vh]" />
                  <span className="footer-email text-[#E4E3E3] text-[12px] lg:text-[1rem]">
                    info@vedapixel.com
                  </span>
                </div>
                <span className="text-white">|</span>
                <div className="flex gap-2 text-white place-items-center">
                  <img src={phone} className="h-[3vh]" />
                  <span className="footer-email text-[#E4E3E3] text-[12px] lg:text-[1rem]">
                    +91 9036354261
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle + Right Sections */}
          <motion.div
            className="flex  justify-between  w-4/6 "
            variants={container}
          >
            {/* Footer Navigation */}
            <motion.div
              className="footer-nav text-[14px]   lg:text-[16px] w-1/3  flex flex-col gap-[12px] h-fit pl-[10%]"
              variants={item}
            >
              <p className="footer-nav-links" id="footer-navlinks1">
                Our Company
              </p>
              <p className="footer-nav-links" id="footer-navlinks2">
                Privacy Policy
              </p>
              <p className="footer-nav-links" id="footer-navlinks3">
                FAQs
              </p>
              <p className="footer-nav-links" id="footer-navlinks4">
                Our Team
              </p>
              <p className="footer-nav-links" id="footer-navlinks5">
                Career
              </p>
            </motion.div>

            {/* Contact / Social Section */}
            <motion.div
              className="h-fit  w-2/3  flex flex-col pl-[25%]  gap-[20px] "
              variants={item}
            >
              <div className="">
                <p className="footer-email text-[#C8C1C1] text-[16px] mb-2">
                  Let's Get in touch
                </p>
                <div className="flex place-items-center ">
                  <input
                    type="text"
                    placeholder="Your Email Id"
                    className="footer-email text-[#818181] md:w-[160px] md:h-[32px] lg:w-[20vw] lg:h-[42px] text-[12px] lg:text-[16px] rounded-[10px] border-[0.84px] border-[#F2F2F7] px-[8px]"
                  />
                  <motion.img
                    src={icon}
                    alt=""
                    className="md:w-[29px]  lg:w-[2vw] rotate-45 ml-2"
                    whileHover={{ scale: 1.2, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex gap-4 place-items-baseline">
                <p className="footer-email text-[#C8C1C1] text-[16px]">
                  Follow us on
                </p>
                <motion.img
                  src={linkedin}
                  alt=""
                  className="w-[2vw] cursor-pointer"
                  whileHover={{ scale: 1.2, y: -3 }}
                />
                <motion.img
                  src={Instagram}
                  alt=""
                  className=" w-[2vw] cursor-pointer"
                  whileHover={{ scale: 1.2, y: -3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Footer;
