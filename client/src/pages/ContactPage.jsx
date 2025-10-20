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

  // ✅ Show nav only when collaborate section is visible
  useEffect(() => {
    if (!collaborateRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(collaborateRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine which section is *most visible*
  useEffect(() => {
    const elements = [
      { id: "banner", ref: bannerRef },
      { id: "collaborate", ref: collaborateRef },
      { id: "career", ref: careerRef },
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target._lastRatio = entry.intersectionRatio;
        });

        let best = { id: "banner", ratio: 0 };
        elements.forEach((el) => {
          const node = el.ref.current;
          const ratio =
            node && typeof node._lastRatio === "number" ? node._lastRatio : 0;
          if (ratio > best.ratio) {
            best = { id: el.id, ratio };
          }
        });

        if (best.ratio > 0) {
          setActiveSection(best.id);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1] }
    );

    elements.forEach((el) => {
      if (el.ref.current) obs.observe(el.ref.current);
    });

    return () => obs.disconnect();
  }, []);

  // Banner hide/show observer
  useEffect(() => {
    if (!bannerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setBannerVisible(entry.intersectionRatio > 0.05),
      { threshold: [0, 0.05, 0.15, 0.3] }
    );
    obs.observe(bannerRef.current);
    return () => obs.disconnect();
  }, []);

  // Nav item renderer
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
        className="contact-page-content relative h-fit w-[99vw] pb-[40px] flex"
      >
        {/* Sticky nav (hidden on mobile) */}
        <AnimatePresence>
          {showNav && (
            <motion.nav
              className="
                hidden sm:flex
                text-white
                w-[15vw]
                flex-col
                gap-[10px]
              "
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

        {/* Main content area */}
        <div className="flex flex-col pt-[54px] w-full">
          {/* Banner */}
          <div
            ref={bannerRef}
            className="self-center px-[4vw] w-full flex justify-center"
          >
            <AnimatePresence>
              {bannerVisible && (
                <motion.img
                  key="banner"
                  src={banner}
                  alt="Banner"
                  id="banner"
                  className="
                    w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] xl:w-[40vw]
                    h-[22vh] sm:h-[25vh] md:h-[28vh] lg:h-[32vh] xl:h-[36vh]
                    mb-10 object-contain
                  "
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-20 pl-0 sm:pl-[25vw] lg:pl-[30vw] items-center sm:items-start">
            {/* Collaborate Section */}
            <section id="collaborate" ref={collaborateRef} className="flex">
              <motion.div
                className="w-[90vw] sm:w-[80%] md:w-[70%] lg:w-[50vw]
                  border-2 border-white
                  p-[clamp(20px,3vw,40px)]
                  rounded-xl
                  flex flex-col 
                  gap-[clamp(14px,2vw,22px)]
                  h-auto"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                }}
                animate={{
                  opacity: activeSection === "collaborate" ? 1 : 0.35,
                  y: activeSection === "collaborate" ? 0 : -8,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <p className="contact-box-title text-[#C8C1C1] text-[clamp(0.9rem,2vw,1.5rem)] text-center lg:text-left">
                  Find Your Way Forward, we're here to support.
                </p>

                <form className="w-full flex flex-col gap-[clamp(18px,3vw,28px)] h-auto">
                  <div className="flex flex-wrap justify-between gap-[clamp(15px,2vw,26px)]">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(30px,6vh,55px)]"
                    />
                    <input
                      type="text"
                      placeholder="Company Name *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                    <input
                      type="email"
                      placeholder="Email Id *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                    <input
                      type="number"
                      placeholder="Contact No. *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                  </div>

                  <textarea
                    className="w-full rounded-[clamp(6px,1vw,10px)] bg-transparent border border-[#989BA1] p-[clamp(8px,1vw,12px)] text-[#818181] h-[clamp(100px,5vh,160px)] resize-none"
                    placeholder="Project Idea *"
                  ></textarea>
                </form>

                <button className="border border-[#B1A2DF] rounded-[8px] text-white font-medium w-[clamp(200px,60vw,300px)] h-[clamp(40px,5vh,60px)] md:w-[clamp(500px,60vw,300px)] mx-auto mt-[clamp(10px,2vw,20px)] hover:bg-[#B1A2DF]/10 transition text-[clamp(0.9rem,1.5vw,1.3rem)]">
                  Submit
                </button>
              </motion.div>
            </section>

            {/* Career Section */}
            <section id="career" ref={careerRef} className="flex mb-36">
              <motion.div
                className="w-[90vw] sm:w-[80%] md:w-[70%] lg:w-[50vw]
                  border-2 border-white
                  p-[clamp(20px,3vw,40px)]
                  rounded-xl
                  flex flex-col 
                  gap-[clamp(14px,2vw,22px)]
                  h-auto"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                }}
                animate={{
                  opacity: activeSection === "collaborate" ? 1 : 0.35,
                  y: activeSection === "collaborate" ? 0 : -8,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <p className="contact-box-title text-[#C8C1C1] text-[clamp(0.9rem,2vw,1.5rem)] text-center lg:text-left">
                  Tell us about yourself
                </p>

                <form className="w-full flex flex-col gap-[clamp(18px,3vw,28px)] h-auto">
                  <div className="flex flex-wrap justify-between gap-[clamp(15px,2vw,26px)]">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(30px,6vh,55px)]"
                    />
                    <input
                      type="email"
                      placeholder="Email Id *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                    <input
                      type="number"
                      placeholder="Contact no. *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                    <input
                      type="file"
                      placeholder="Resume *"
                      className="border border-[#989BA1] text-[#818181] bg-transparent p-[clamp(6px,1vw,10px)] rounded-[clamp(4px,1vw,10px)] w-[46%] md:w-[42%] lg:w-[21vw] md:h-[clamp(35px,6vh,55px)]"
                    />
                  </div>

                  <textarea
                    className="w-full rounded-[clamp(6px,1vw,10px)] bg-transparent border border-[#989BA1] p-[clamp(8px,1vw,12px)] text-[#818181] h-[clamp(100px,5vh,160px)] resize-none"
                    placeholder="Any message *"
                  ></textarea>
                </form>

                <button className="border border-[#B1A2DF] rounded-[8px] text-white font-medium w-[clamp(200px,60vw,300px)] h-[clamp(40px,5vh,60px)] md:w-[clamp(500px,60vw,300px)] mx-auto mt-[clamp(10px,2vw,20px)] hover:bg-[#B1A2DF]/10 transition text-[clamp(0.9rem,1.5vw,1.3rem)]">
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
