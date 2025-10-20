import React from "react";
import "../CSS/Contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <div
        className="
          w-full 
          flex flex-col-reverse md:flex-row 
          justify-center items-center 
          mt-[10vh] lg:mt-[20vh]
          pb-5
          gap-[5vw] 
          px-[4vw]
        "
      >
        {/* ✅ Contact Form Section */}
        <div
          className="
            w-full border-2 border-white sm:w-[90%] md:w-[80%] lg:w-[50vw]
            p-[clamp(20px,3vw,40px)]
            rounded-tl-[clamp(40px,6vw,80px)] 
            rounded-b-[clamp(40px,6vw,80px)]
            flex flex-col 
            gap-[clamp(14px,2vw,22px)]
            h-auto
          "
          style={{
            background:
              "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
            backdropFilter: "blur(10px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <p
            className="
              contact-box-title 
              text-[#C8C1C1] 
              text-[clamp(0.9rem,2vw,1.5rem)] 
              text-center lg:text-left
            "
          >
            Find Your Way Forward, we're here to support.
          </p>

          <form
            className="
              w-full 
              flex flex-col 
              gap-[clamp(18px,3vw,28px)]
              h-auto
            "
          >
            {/* ✅ Flex-wrap inputs (same layout) */}
            <div
              className="
                flex flex-wrap 
                justify-between  
                gap-[clamp(15px,2vw,26px)]
              "
            >
              <input
                type="text"
                placeholder="Name *"
                className="
                  border border-[#989BA1]
                  text-[#818181]
                  bg-transparent
                  p-[clamp(6px,1vw,10px)]
                  rounded-[clamp(4px,1vw,10px)]
                  w-[46%]  md:w-[42%] lg:w-[21vw]
                  h-[clamp(30px,4vh,55px)]
                "
              />
              <input
                type="text"
                placeholder="Company Name *"
                className="
                  border border-[#989BA1]
                  text-[#818181]
                  bg-transparent
                  p-[clamp(6px,1vw,10px)]
                  rounded-[clamp(4px,1vw,10px)]
                  w-[46%] sm:w-[44%] md:w-[42%] lg:w-[21vw]
                  h-[clamp(35px,4vh,55px)]
                "
              />
              <input
                type="email"
                placeholder="Email Id *"
                className="
                  border border-[#989BA1]
                  text-[#818181]
                  bg-transparent
                  p-[clamp(6px,1vw,10px)]
                  rounded-[clamp(4px,1vw,10px)]
                  w-[46%] sm:w-[44%] md:w-[42%] lg:w-[21vw]
                  h-[clamp(35px,4vh,55px)]
                "
              />
              <input
                type="text"
                placeholder="Contact no. *"
                className="
                  border border-[#989BA1]
                  text-[#818181]
                  bg-transparent
                  p-[clamp(6px,1vw,10px)]
                  rounded-[clamp(4px,1vw,10px)]
                  w-[46%] sm:w-[44%] md:w-[42%] lg:w-[21vw]
                  h-[clamp(35px,4vh,55px)]
                "
              />
            </div>

            {/* ✅ Textarea (auto responsive) */}
            <textarea
              className="
                w-full 
                rounded-[clamp(6px,1vw,10px)] 
                bg-transparent 
                border border-[#989BA1] 
                p-[clamp(8px,1vw,12px)] 
                text-[#818181] 
                h-[clamp(100px,5vh,160px)]
                resize-none
              "
              placeholder="Project Idea *"
            ></textarea>
          </form>

          {/* ✅ Button */}
          <button
            className="
              border border-[#B1A2DF]
              rounded-[8px]
              text-white
              font-medium
              w-[clamp(200px,60vw,300px)]
              h-[clamp(40px,5vh,60px)]
              mx-auto
              lg:mx-0
              mt-[clamp(10px,2vw,20px)]
              hover:bg-[#B1A2DF]/10 
              transition
              text-[clamp(0.9rem,1.5vw,1.3rem)]
            "
          >
            Get in Touch
          </button>
        </div>

        {/* ✅ Text Section */}
        <div
          className="
            w-full md:w-[80%] lg:w-[25vw] 
            text-center lg:text-left 
             lg:mb-0
          "
        >
          <motion.p
            className="
              text-[clamp(2rem,4vw,4rem)] 
              leading-[clamp(2rem,10vw,4.5rem)] 
              font-semibold 
              bg-gradient-to-r from-[#BBABEB] to-[#6A6185] 
              bg-clip-text text-transparent 
              px-[2vw]
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
          >
            Want to explore the possibilities?
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Contact;
