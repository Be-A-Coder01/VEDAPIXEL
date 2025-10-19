import React, { useEffect, useState, useRef } from "react";
import "../CSS/Body.css";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";
import profileImg from "../assets/profileImg.png";

const Body = () => {
  const [showBody, setShowBody] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showTeamPopup, setShowTeamPopup] = useState(false); // 👈 controls popup visibility

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  // Detect visible section for nav highlight
  useEffect(() => {
    const sections = [
      { id: "about", ref: aboutRef },
      { id: "services", ref: servicesRef },
      { id: "team", ref: teamRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Make nav disappear earlier
  useEffect(() => {
    const bodySection = document.querySelector(".body-content");
    if (!bodySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBody(entry.intersectionRatio > 0.3),
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
    );

    observer.observe(bodySection);
    return () => observer.disconnect();
  }, []);

  const navItem = (id, label) => {
    const isActive = activeSection === id;

    return (
      <motion.p
        onClick={() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="relative cursor-pointer pl-2 pr-[12px] h-[42px] text-[28px] flex items-center transition-all duration-300"
        animate={{
          color: isActive ? "#b19cd9" : "#d1d5db",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.span
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#b19cd9] rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isActive ? "100%" : 0,
            width: isActive ? "3px" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {label}
      </motion.p>
    );
  };

  return (
    <>
      {/* ✅ Popup Overlay */}
      <AnimatePresence>
        {showTeamPopup && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="relative bg-[#141221] rounded-[40px] w-[1120px] min-h-[500px] p-10 flex flex-col gap-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-6 text-white text-[28px] hover:text-[#b19cd9] transition-all"
                onClick={() => setShowTeamPopup(false)}
              >
                ✕
              </button>

              <p className="popup-teamCard-title text-white text-[39px] text-center font-semibold">
                Meet Our Team
              </p>

              <div className="flex flex-wrap justify-center gap-10">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="relative flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD] overflow-visible shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                  >
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="absolute bottom-0 left-0 h-[279px] object-cover"
                    />

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
                      <p className="text-white font-bold text-[22px] leading-tight">
                        Akjdfhjhj
                      </p>
                      <p className="text-white font-bold text-[22px] leading-tight">
                        Klkjjjjk
                      </p>
                      <p className="text-[#E4E3E3] text-[14px] mt-1">
                        CEO & Founder
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Main Body */}
      <div
        className={`body-content relative pr-[116px] pl-[132px] pt-[80px] pb-[40px] min-h-screen gap-[20px] flex transition-all duration-700 ease-out w-full`}
      >
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {showBody && (
            <motion.nav
              className="text-white w-[242px] flex flex-col gap-[10px]"
              style={{
                position: "fixed",
                left: "132px",
                top: "180px",
                zIndex: 50,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {navItem("about", "Our Aim")}
              {navItem("services", "Our Services")}
              {navItem("team", "Ready to Begin?")}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col gap-[10rem] pl-[420px] pt-[54px]">
          {/* About Section */}
          <section id="about" ref={aboutRef}>
            <p className="about-card-title text-white text-[48px] leading-[52px]">
              We bridge innovation and execution with
              <br />
              user-centric, future-ready systems that
              <br />
              <span className="text-[#b19cd9] font-semibold">
                streamline operations
              </span>
            </p>
            <p className="about-card-desc text-[#C8C1C1] text-[24px] mt-2">
              We offer future-ready solutions to streamline your business, drive
              growth, and put your processes in place. Explore our range of
              solutions below.
            </p>
            <button className="body-nav h-[52px] w-[149px] text-[24px] rounded-md border border-[#b19cd9] text-[#b19cd9] hover:bg-[#b19cd9] hover:text-black font-garota transition-all duration-300 mt-4">
              Know More
            </button>
          </section>

          {/* Services Section */}
          <section id="services" ref={servicesRef}>
            <div className="flex flex-col gap-4">
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
            </div>
          </section>

          {/* Team Section */}
          <section id="team" ref={teamRef} className="relative min-h-[80vh]">
            <p className="begin-title absolute top-0 left-0 z-20 text-[64px] bg-gradient-to-b from-[#C7B9F6] via-[#A699D9] to-[#6A6185] bg-clip-text text-transparent leading-[1]">
              Hello!
            </p>

            <div
              className="relative w-[755px] h-[311px] p-[36px] ml-[8px] rounded-tr-[80px] rounded-b-[80px] mt-[30px]"
              style={{
                background:
                  "linear-gradient(139.47deg, rgba(47, 54, 64) -45.69%, rgba(16, 24, 32) 54.7%)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              <div className="h-[159px]">
                <p className="begin-card-title text-[48px] text-white leading-13">
                  we are experienced innovators building scalable digital
                  platforms
                </p>
                <p className="begin-card-desc text-[#C8C1C1] text-[24px]">
                  Driving enterprise & consumer innovation
                </p>
                <button
                  // 👈 opens popup
                  className="begin-card-button border-2 border-[#B1A2DF] h-[52px] mt-[25px] w-[149px] text-white py-2 rounded-[8px] hover:bg-[#B1A2DF]/20 transition"
                >
                  Our Team
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Body;

<div className="popup-teamCard border-2 border-red-500 w-[1120px] flex flex-col gap-30">
  <p className="popup-teamCard-title text-white text-[39px]">Meet Our Team</p>
  <div className="flex flex-wrap gap-10">
    <div className="relative border flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD] overflow-visible">
      {/* Image Section */}
      <img
        src={profileImg}
        alt="Profile"
        className="absolute bottom-0 left-0  h-[279px] object-cover"
      />

      {/* Text Section */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
        <p className="text-white font-bold text-[22px] leading-tight">
          Akjdfhjhj
        </p>
        <p className="text-white font-bold text-[22px] leading-tight">
          Klkjjjjk
        </p>
        <p className="text-[#E4E3E3] text-[14px] mt-1">CEO & Founder</p>
      </div>
    </div>
    <div className="relative border flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD] overflow-visible">
      {/* Image Section */}
      <img
        src={profileImg}
        alt="Profile"
        className="absolute bottom-0 left-0  h-[279px] object-cover"
      />

      {/* Text Section */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
        <p className="text-white font-bold text-[22px] leading-tight">
          Akjdfhjhj
        </p>
        <p className="text-white font-bold text-[22px] leading-tight">
          Klkjjjjk
        </p>
        <p className="text-[#E4E3E3] text-[14px] mt-1">CEO & Founder</p>
      </div>
    </div>
    <div className="relative border flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD] overflow-visible">
      {/* Image Section */}
      <img
        src={profileImg}
        alt="Profile"
        className="absolute bottom-0 left-0  h-[279px] object-cover"
      />

      {/* Text Section */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
        <p className="text-white font-bold text-[22px] leading-tight">
          Akjdfhjhj
        </p>
        <p className="text-white font-bold text-[22px] leading-tight">
          Klkjjjjk
        </p>
        <p className="text-[#E4E3E3] text-[14px] mt-1">CEO & Founder</p>
      </div>
    </div>
    <div className="relative border flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD] overflow-visible">
      {/* Image Section */}
      <img
        src={profileImg}
        alt="Profile"
        className="absolute bottom-0 left-0  h-[279px] object-cover"
      />

      {/* Text Section */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
        <p className="text-white font-bold text-[22px] leading-tight">
          Akjdfhjhj
        </p>
        <p className="text-white font-bold text-[22px] leading-tight">
          Klkjjjjk
        </p>
        <p className="text-[#E4E3E3] text-[14px] mt-1">CEO & Founder</p>
      </div>
    </div>
  </div>
</div>;
