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
        className="w-[1220px] h-[396px] ml-[150px] p-10 mt-32 "
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }} // triggers each time visible
      >
        <motion.div className="flex py-10 px-2" variants={container}>
          {/* Left Section - Company Info */}
          <motion.div className=" footer-company-info w-[40vw]" variants={item}>
            <img src={logo} alt="" className="w-[79px] h-[80px]" />
            <p className="footer-company-name text-white text-[37px] leading-12">
              VedaPixel
            </p>
            <p className="footer-company-desc text-[8px] leading-0.5 text-white">
              Innovation in every Pixel
            </p>
            <div className="flex flex-col gap-[5px] mt-8">
              <div className="footer-email text-[#F8F9FA] text-[16px]">
                &copy; 2025 VedaPixel Tech Solution Pvt. Ltd. All Rights
                Reserved.
              </div>
              <div className="flex gap-[10px] place-items-center">
                <div className="flex gap-2 text-white">
                  <img src={email} className="h-[20px]" />
                  <span className="footer-email text-[#E4E3E3] text-[16px]">
                    info@vedapixel.com
                  </span>
                </div>
                <span className="text-white">|</span>
                <div className="flex gap-2 text-white place-items-center">
                  <img src={phone} className="h-[20px]" />
                  <span className="footer-email text-[#E4E3E3] text-[16px]">
                    +91 9036354261
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle + Right Sections */}
          <motion.div className="flex gap-[180px] pl-20" variants={container}>
            {/* Footer Navigation */}
            <motion.div
              className="footer-nav w-[143px] flex flex-col gap-[12px] h-fit"
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
              className="h-fit flex flex-col gap-[20px]"
              variants={item}
            >
              <div>
                <p className="footer-email text-[#C8C1C1] text-[16px] mb-2">
                  Let's Get in touch
                </p>
                <div className="flex place-items-center">
                  <input
                    type="text"
                    placeholder="Your Email Id"
                    className="footer-email text-[#818181] w-[214px] h-[42px] text-[16px] rounded-[10px] border-[0.84px] border-[#F2F2F7] px-[8px]"
                  />
                  <motion.img
                    src={icon}
                    alt=""
                    className="h-[31px] w-[31px] rotate-45 ml-2"
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
                  className="h-[25px] w-[25px] cursor-pointer"
                  whileHover={{ scale: 1.2, y: -3 }}
                />
                <motion.img
                  src={Instagram}
                  alt=""
                  className="h-[25px] w-[25px] cursor-pointer"
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
