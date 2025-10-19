import React from "react";
import "../CSS/Contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <div className=" lg:w-full    h-[327px] mt-[20vh]   lg:h-[60vh]  flex  justify-center">
        {/* Contact Form Section */}
        <div
          className="w-[600px]  lg:w-[50vw] p-[30px] lg:p-[30px] rounded-tl-[80px] rounded-b-[80px] h-full  flex flex-col gap-[16px]"
          style={{
            background:
              "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
            backdropFilter: "blur(10px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <p className="contact-box-title text-[16px] text-[#C8C1C1] lg:text-[1.5rem]">
            Find Your Way Forward, we're here to support.
          </p>

          <form
            action=""
            className=" w-full h-[175px] lg:h-[215px] lg:w-[45vw] flex flex-col gap-[20px] lg:gap-[26px]"
          >
            <div className="flex flex-wrap gap-[20px] lg:gap-[26px]">
              <input
                type="text"
                placeholder="Name *"
                className="border border-[#989BA1] text-[#818181] w-[185px] h-[30px] lg:w-[21.5vw] lg:h-[6vh] bg-transparent p-[5px] lg:p-[8px] rounded-[4px] lg:rounded-[10px]"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[185px] h-[30px] lg:w-[21.5vw] lg:h-[6vh] bg-transparent p-[5px] lg:p-[8px] rounded-[4px] lg:rounded-[10px]"
                placeholder="Company Name *"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[185px] h-[30px] lg:w-[21.5vw] lg:h-[6vh] bg-transparent p-[5px] lg:p-[8px] rounded-[4px] lg:rounded-[10px]"
                placeholder="Email Id *"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[185px] h-[30px] lg:w-[21.5vw] lg:h-[6vh] bg-transparent p-[5px] lg:p-[8px] rounded-[4px] lg:rounded-[10px]"
                placeholder="Contact no. *"
              />
            </div>

            <textarea
              className="w-[390px] lg:w-full rounded-[10px] bg-transparent border-[#989BA1] border  p-[8px] text-[#818181] h-full"
              placeholder="Project Idea *"
            ></textarea>
          </form>

          <button className="begin-card-button border-[#B1A2DF] mx-auto lg:mt-[20px] border rounded-[8px] contact-box-title w-[300px] h-[42px] lg:w-[24vw] text-white lg:h-[7vh] hover:bg-[#B1A2DF]/10 transition">
            Get in Touch
          </button>
        </div>

        {/* Text Section — same animation, triggers every time */}
        <div className="w-[25vw]">
          <motion.p
            className="text-[45px] lg:text-[4rem] contact-title leading-14 lg:leading-15 bg-gradient-to-r from-[#BBABEB] to-[#6A6185] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }} // starts below and invisible
            whileInView={{ opacity: 1, y: 0 }} // animates when visible
            transition={{ duration: 1.2, ease: "easeOut" }} // smooth animation
            viewport={{ once: false, amount: 0.6 }} // 🔥 replays every time in view
          >
            Want to explore the possibilities?
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Contact;
