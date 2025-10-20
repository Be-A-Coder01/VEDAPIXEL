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
      <motion.footer
        className="w-full px-6 sm:px-10 lg:px-[13rem] py-10 mt-20 sm:mt-32 bg-transparent"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
      >
        <motion.div
          className="flex  flex-col lg:flex-row justify-between items-start gap-10 lg:gap-0"
          variants={container}
        >
          {/* ✅ Left Section - Company Info */}
          <motion.div
            className="footer-company-info w-full lg:w-3/6 flex flex-col items-start gap-4"
            variants={item}
          >
            <img
              src={logo}
              alt="VedaPixel Logo"
              className="w-[60px] sm:w-[80px] lg:w-[5vw]"
            />

            <div>
              <p className="footer-company-name text-white text-[clamp(1.4rem,4vw,2.3rem)] font-semibold leading-tight lg:leading-10">
                VedaPixel
              </p>
              <p className="footer-company-desc text-white/80 text-[clamp(0.7rem,2vw,1rem)] lg:text-[50%]">
                Innovation in every Pixel
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-[#F8F9FA] text-[clamp(0.6rem,2vw,0.9rem)]">
                &copy; 2025 VedaPixel Tech Solution Pvt. Ltd. All Rights
                Reserved.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={email}
                    alt="email"
                    className="h-[16px] sm:h-[20px]"
                  />
                  <span className="text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)]">
                    info@vedapixel.com
                  </span>
                </div>
                <div className="hidden sm:block text-white">|</div>
                <div className="flex items-center gap-2">
                  <img
                    src={phone}
                    alt="phone"
                    className="h-[16px] sm:h-[20px]"
                  />
                  <span className="text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)]">
                    +91 9036354261
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ✅ Middle + Right Sections */}
          <motion.div
            className="flex  flex-col md:flex-row justify-between w-full lg:w-4/6 gap-10 sm:gap-0"
            variants={container}
          >
            {/* Footer Navigation */}
            <motion.div
              className="footer-nav w-full sm:w-1/2 lg:w-1/3 md:pl-[10%] flex flex-col items-start gap-3"
              variants={item}
            >
              <p className="footer-nav-links text-white text-[clamp(0.9rem,2vw,1.1rem)] font-semibold mb-1">
                Our Company
              </p>
              <p className="footer-nav-links text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)] hover:text-[#b19cd9] transition">
                Privacy Policy
              </p>
              <p className="footer-nav-links text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)] hover:text-[#b19cd9] transition">
                FAQs
              </p>
              <p className="footer-nav-links text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)] hover:text-[#b19cd9] transition">
                Our Team
              </p>
              <p className="footer-nav-links text-[#E4E3E3] text-[clamp(0.8rem,2vw,1rem)] hover:text-[#b19cd9] transition">
                Career
              </p>
            </motion.div>

            {/* Contact / Social Section */}
            <motion.div
              className="h-fit w-full sm:w-1/2 lg:w-fit flex flex-col gap-5"
              variants={item}
            >
              {/* Contact */}
              <div>
                <p className="text-[#C8C1C1] text-[clamp(1rem,2vw,1.2rem)] mb-2 font-medium">
                  Let's Get in Touch
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Your Email Id"
                    className="text-[#818181] w-[70vw] sm:w-[250px] md:w-[200px] lg:w-[18vw]
                               h-[36px] sm:h-[38px] lg:h-[42px] text-[clamp(0.8rem,2vw,1rem)]
                               rounded-[10px] border border-[#F2F2F7] px-3 focus:outline-none"
                  />
                  <motion.img
                    src={icon}
                    alt="send"
                    className="w-[30px] sm:w-[35px] lg:w-[2vw] rotate-45 cursor-pointer"
                    whileHover={{ scale: 1.2, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-[#C8C1C1] text-[clamp(1rem,2vw,1.2rem)]">
                  Follow us on
                </p>
                <div className="flex gap-4">
                  <motion.img
                    src={linkedin}
                    alt="LinkedIn"
                    className="w-[25px] sm:w-[30px] lg:w-[2vw] cursor-pointer"
                    whileHover={{ scale: 1.2, y: -3 }}
                  />
                  <motion.img
                    src={Instagram}
                    alt="Instagram"
                    className="w-[25px] sm:w-[30px] lg:w-[2vw] cursor-pointer"
                    whileHover={{ scale: 1.2, y: -3 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default Footer;
