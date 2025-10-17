import React from "react";
import "../CSS/Contact.css";
// import "../CSS/Body.css";
const Contact = () => {
  return (
    <>
      <div className="w-[1120px] h-[427px]   mx-auto">
        <div
          className="w-[772px] p-[36px] rounded-tl-[80px] rounded-b-[80px] h-full border border-white flex flex-col gap-[16px]"
          style={{
            background:
              "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
            backdropFilter: "blur(10px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <p className="contact-box-title text-[#C8C1C1] text-[24px]">
            Find Your Way Forward, we're here to support.
          </p>
          <form
            action=""
            className="  h-[215px] w-[700px] flex flex-col gap-[26px]"
          >
            <div className="flex flex-wrap gap-[26px]">
              <input
                type="text"
                placeholder="Name *"
                className="border border-[#989BA1] text-[#818181] w-[329px] bg-transparent p-[8px] rounded-[10px]"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[329px] h-[42px] bg-transparent p-[8px] rounded-[10px]"
                placeholder="Company Name *"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[329px] h-[42px] bg-transparent p-[8px] rounded-[10px]"
                placeholder="Email Id *"
              />
              <input
                type="text"
                className="border border-[#989BA1] text-[#818181] w-[329px] h-[42px] bg-transparent p-[8px] rounded-[10px]"
                placeholder="Contact no. *"
              />
            </div>
            <textarea
              name=""
              className="w-[700px] bg-transparent border-[#989BA1] border h-[99px] p-[8px] text-[#818181]"
              placeholder="Project Idea *"
            ></textarea>
          </form>
          <button className="begin-card-button border-[#B1A2DF] mx-auto mt-[20px] border rounded-[8px] contact-box-title w-[372px] text-white h-[52px]">
            Get in Touch
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
