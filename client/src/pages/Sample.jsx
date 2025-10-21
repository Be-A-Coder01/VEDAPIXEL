{
  /* --- Our Aim --- */
}
<section
  id="about"
  ref={aboutRef}
  className="flex flex-col gap-[12px] mt-[7vw]"
>
  {isMobile && (
    <motion.p
      ref={aimTitleRef}
      animate={{
        opacity: aimVisible ? 1 : 0,
        y: aimVisible ? 0 : 25,
        scale: aimVisible ? 1 : 0.97,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
        bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
        bg-clip-text text-transparent inline-block"
    >
      Our Aim
      <motion.span
        className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] w-[25%]
       bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: false, amount: 0.4 }}
      />
    </motion.p>
  )}

  {/* ✅ Animated text transition (slides upward) */}
  <p className="text-white text-[20px] md:text-[28px] lg:text-[3rem] leading-[1.3]">
    We bridge innovation and execution with user-centric, future-ready systems
    that <br />
    <span
      id="tag"
      className="relative inline-block text-[#b19cd9] font-semibold min-h-[1em] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="block"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  </p>

  <p className="about-card-desc text-[#C8C1C1] text-[12px] md:text-[16px] lg:text-[1.5rem]">
    We offer future-ready solutions to streamline your business, drive
    <br />
    growth, and put your processes in place. Explore our range of
    <br />
    solutions below.
  </p>

  <div className="relative inline-block">
    <button className="rotating-btn relative text-[#b19cd9] font-garota text-[1.2rem] md:text-[1.5rem] rounded-md px-6 py-3 overflow-hidden">
      Know More
    </button>
  </div>
</section>;
