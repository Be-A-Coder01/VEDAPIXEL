import React, { useEffect, useRef, useState } from "react";
import "../CSS/Body.css";
import "../CSS/Contact.css";

import banner from "../assets/contact-banner.png";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const pageRef = useRef(null);
  const bannerRef = useRef(null);
  const collaborateRef = useRef(null);
  const careerRef = useRef(null);

  // NEW: refs + visibility state for mobile titles
  const collabTitleRef = useRef(null);
  const careerTitleRef = useRef(null);
  const [collabTitleVisible, setCollabTitleVisible] = useState(false);
  const [careerTitleVisible, setCareerTitleVisible] = useState(false);

  // Banner visibility (for fade out)
  const [bannerVisible, setBannerVisible] = useState(true);

  // keep isMobile updated on resize / orientation change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Show nav only when collaborate section is visible AND not mobile.
  // Show nav only when collaborate section passes into view (top < 200px) and hide smoothly when above.
  // 🧭 Show nav when collaborate section starts (top <= 200)
  // and keep it visible until the top of career section crosses 200.
  useEffect(() => {
    if (!collaborateRef.current || !careerRef.current) return;

    const handleScroll = () => {
      if (isMobile) {
        setShowNav(false);
        return;
      }

      const collabRect = collaborateRef.current.getBoundingClientRect();
      const careerRect = careerRef.current.getBoundingClientRect();

      // nav visible between these bounds:
      const shouldShow =
        collabRect.top <= 200 && careerRect.top > 100 && collabRect.bottom > 0;

      if (shouldShow && !showNav) setShowNav(true);
      else if (!shouldShow && showNav) setShowNav(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, showNav]);

  // Determine which section is most visible (debounced for stability)
  useEffect(() => {
    const elements = [
      { id: "banner", ref: bannerRef },
      { id: "collaborate", ref: collaborateRef },
      { id: "career", ref: careerRef },
    ];

    let debounceTimer = null;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target._lastRatio = entry.intersectionRatio;
        });

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          let best = { id: "banner", ratio: 0 };
          elements.forEach((el) => {
            const node = el.ref.current;
            const ratio =
              node && typeof node._lastRatio === "number" ? node._lastRatio : 0;
            if (ratio > best.ratio) best = { id: el.id, ratio };
          });
          if (best.ratio > 0) setActiveSection(best.id);
        }, 120);
      },
      {
        threshold: isMobile
          ? [0.1, 0.25, 0.5]
          : [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    elements.forEach((el) => {
      if (el.ref.current) obs.observe(el.ref.current);
    });

    return () => {
      clearTimeout(debounceTimer);
      obs.disconnect();
    };
  }, [isMobile]);

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

  // NEW: Observe mobile section titles when isMobile === true
  useEffect(() => {
    // reset visibility states when not mobile
    if (!isMobile) {
      setCollabTitleVisible(false);
      setCareerTitleVisible(false);
      return;
    }

    const titleEls = [
      { ref: collabTitleRef, setVisible: setCollabTitleVisible },
      { ref: careerTitleRef, setVisible: setCareerTitleVisible },
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // treat as visible if > 20% of the title area is in view
          if (entry.target === collabTitleRef.current) {
            setCollabTitleVisible(entry.intersectionRatio > 0.2);
          } else if (entry.target === careerTitleRef.current) {
            setCareerTitleVisible(entry.intersectionRatio > 0.2);
          }
        });
      },
      { threshold: [0, 0.15, 0.25, 0.5] }
    );

    titleEls.forEach((t) => {
      if (t.ref.current) obs.observe(t.ref.current);
    });

    return () => obs.disconnect();
  }, [isMobile]);

  // nav item renderer
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
        className="relative cursor-pointer pl-2 pr-[12px] h-[42px] text-[18px] sm:text-[20px] md:text-[24px] flex items-center transition-all duration-300"
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
        {/* Sticky nav: show only on non-mobile AND when showNav is true */}
        <AnimatePresence>
          {showNav && !isMobile && (
            <motion.nav
              className="text-white w-[15vw] flex flex-col gap-[10px]"
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
            <section
              id="collaborate"
              ref={collaborateRef}
              className="flex flex-col w-full items-center"
            >
              {/* Mobile title: rendered only on mobile and driven by collabTitleVisible */}
              {isMobile && (
                <motion.p
                  ref={collabTitleRef}
                  className="relative my-[18px] text-center text-[clamp(1.2rem,4vw,1.8rem)] font-semibold
                           bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
                           bg-clip-text text-transparent inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    collabTitleVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  Collaborate
                  <span
                    className="block mt-2 h-[2px] w-[115%] mx-auto rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg,#C7B9F6 0%, #A699D9 50%, #6A6185 100%)",
                      transformOrigin: "center",
                    }}
                  />
                </motion.p>
              )}

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
                  opacity: activeSection === "collaborate" ? 1 : 0.45,
                  scale: activeSection === "collaborate" ? 1 : 0.985,
                  y: activeSection === "collaborate" ? 0 : -4,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
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
            <section
              id="career"
              ref={careerRef}
              className="flex flex-col w-full items-center"
            >
              {/* Mobile title */}
              {isMobile && (
                <motion.p
                  ref={careerTitleRef}
                  className="relative my-[18px] text-center text-[clamp(1.2rem,4vw,1.8rem)] font-semibold
                           bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
                           bg-clip-text text-transparent inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    careerTitleVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  Career
                  <span
                    className="block mt-2 h-[2px] w-[105%] mx-auto rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg,#C7B9F6 0%, #A699D9 50%, #6A6185 100%)",
                      transformOrigin: "center",
                    }}
                  />
                </motion.p>
              )}

              <motion.div
                className="w-[90vw] sm:w-[80%] md:w-[70%] lg:w-[50vw]
    border-2 border-white
    p-[clamp(20px,3vw,40px)]
    rounded-xl
    flex flex-col 
    gap-[clamp(14px,2vw,22px)]
    h-auto mb-36"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(50, 58, 68) -45.69%, rgba(16, 24, 32) 54.7%)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                }}
                animate={{
                  opacity: activeSection === "career" ? 1 : 0.45,
                  scale: activeSection === "career" ? 1 : 0.985,
                  y: activeSection === "career" ? 0 : 4,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
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
