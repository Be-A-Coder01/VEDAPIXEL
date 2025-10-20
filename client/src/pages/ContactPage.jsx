import React, { useEffect, useRef, useState } from "react";
import "../CSS/Body.css";
import "../CSS/Contact.css";
import banner from "../assets/contact-banner.png";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");

  const pageRef = useRef(null);
  const bannerRef = useRef(null);
  const collaborateRef = useRef(null);
  const careerRef = useRef(null);

  // Banner visibility (for fade out)
  const [bannerVisible, setBannerVisible] = useState(true);

  // Show nav when the page container is in view (same behavior as before)
  useEffect(() => {
    if (!pageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(entry.intersectionRatio > 0.25),
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
    );
    observer.observe(pageRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine which section is *most visible* (banner / collaborate / career)
  useEffect(() => {
    const elements = [
      { id: "banner", ref: bannerRef },
      { id: "collaborate", ref: collaborateRef },
      { id: "career", ref: careerRef },
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        // combine existing ratios from all targets (we'll compute by querying elements)
        // But entries only includes changed entries; we maintain a map:
        entries.forEach((entry) => {
          // store current ratio on the target element for later reading
          entry.target._lastRatio = entry.intersectionRatio;
        });

        // compute max among tracked elements
        let best = { id: "banner", ratio: 0 };
        elements.forEach((el) => {
          const node = el.ref.current;
          const ratio =
            node && typeof node._lastRatio === "number" ? node._lastRatio : 0;
          if (ratio > best.ratio) {
            best = { id: el.id, ratio };
          }
        });

        // if none visible (all 0), keep previous activeSection; else set best
        if (best.ratio > 0) {
          setActiveSection(best.id);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1] }
    );

    // observe all
    elements.forEach((el) => {
      if (el.ref.current) obs.observe(el.ref.current);
    });

    return () => obs.disconnect();
  }, []);

  // Banner hide/show observer (controls banner fade out when scrolled away)
  useEffect(() => {
    if (!bannerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setBannerVisible(entry.intersectionRatio > 0.05),
      { threshold: [0, 0.05, 0.15, 0.3] }
    );
    obs.observe(bannerRef.current);
    return () => obs.disconnect();
  }, []);

  // Helper to render nav item (keeps styling + animation)
  const navItem = (id, label) => {
    const isActive = activeSection === id;
    return (
      <motion.p
        key={id}
        onClick={() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="relative cursor-pointer pl-2 pr-[12px] h-[42px] text-[28px] flex items-center transition-all duration-300"
        animate={{
          color: isActive ? "#b19cd9" : "#d1d5db",
          x: isActive ? 6 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <motion.span
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#b19cd9] rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isActive ? "100%" : 0,
            width: isActive ? "3px" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
        {label}
      </motion.p>
    );
  };

  return (
    <>
      <div
        ref={pageRef}
        className="contact-page-content relative h-fit  w-[99vw]   pb-[40px] flex "
      >
        {/* Sticky nav (no background) */}
        <AnimatePresence>
          {showNav && (
            <motion.nav
              className="text-white  w-[15vw] flex flex-col gap-[10px]"
              style={{
                position: "fixed",
                left: "132px",
                top: "180px",
                zIndex: 50,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {navItem("collaborate", "Collaborate")}
              {navItem("career", "Career")}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main content area (normal document flow) */}
        <div className="flex flex-col  pt-[54px] w-full">
          {/* Banner (keeps in flow) */}
          <div
            ref={bannerRef}
            className="self-center pl-[12vw] w-fit flex justify-center"
          >
            <AnimatePresence>
              {bannerVisible && (
                <motion.img
                  key="banner"
                  src={banner}
                  alt="Banner"
                  id="banner"
                  className="w-[50vw] h-[30vh] mb-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-20  pl-[30vw]">
            {/* Collaborate Section - stays in flow */}
            {/* <section id="collaborate" ref={collaborateRef} className="flex ">
              <motion.div
                className="w-[50vw]  p-[32px] rounded-[20px] h-full border border-white flex flex-col gap-[16px]"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                }}
                // subtle visual transition depending on which section is most visible
                animate={{
                  opacity: activeSection === "collaborate" ? 1 : 0.35,
                  y: activeSection === "collaborate" ? 0 : -8,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <p className="contact-box-title text-[#C8C1C1] text-[1.5rem]">
                  Find Your Way Forward, we're here to support.
                </p>

                <form className="w-full flex flex-col gap-[26px]">
                  <div className=" w-full   flex justify-between flex-wrap gap-[26px]">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                    />
                    <input
                      type="text"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Company Name *"
                    />
                    <input
                      type="email"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Email Id*"
                    />
                    <input
                      type="number"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Contact No. *"
                    />
                  </div>

                  <textarea
                    className="w-full rounded-[10px] bg-transparent border-[#989BA1] border h-[99px] p-[8px] text-[#818181]"
                    placeholder="Project Idea *"
                  ></textarea>
                </form>

                <button className="begin-card-button border-[#B1A2DF] mx-auto mt-[20px] border-2 rounded-[8px] contact-box-title w-[28vw] text-white h-[52px] hover:bg-[#B1A2DF]/10 transition">
                  Submit
                </button>
              </motion.div>
            </section> */}

            <div
              id="collaborate"
              ref={collaborateRef}
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
                gap-y-[clamp(15px,2vw,26px)]
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

            {/* Career Section - stays in flow */}
            <section id="career" ref={careerRef} className="flex mb-36">
              <motion.div
                className="w-[50vw]  p-[32px] rounded-[20px] h-full border border-white flex flex-col gap-[16px]"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                }}
                animate={{
                  opacity: activeSection === "career" ? 1 : 0.35,
                  y: activeSection === "career" ? 0 : 8,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <p className="contact-box-title text-[#C8C1C1] text-[1.5rem]">
                  Tell us about yourself
                </p>

                <form className=" w-full flex flex-col gap-[26px]">
                  <div className=" w-full flex justify-between flex-wrap gap-[26px]">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                    />
                    <input
                      type="email"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Email Id *"
                    />
                    <input
                      type="number"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Contact no. *"
                    />
                    <input
                      type="file"
                      className="border border-[#989BA1] text-[#818181] w-[21em] bg-transparent p-[8px] rounded-[10px]"
                      placeholder="Upload Your Resume *"
                    />
                  </div>

                  <textarea
                    className="w-full rounded-[10px] bg-transparent border-[#989BA1] border h-[99px] p-[8px] text-[#818181]"
                    placeholder="Any Message *"
                  ></textarea>
                </form>

                <button className="begin-card-button border-[#B1A2DF] mx-auto mt-[20px] border-2 rounded-[8px] contact-box-title w-[28vw] text-white h-[52px] hover:bg-[#B1A2DF]/10 transition">
                  Submit
                </button>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
