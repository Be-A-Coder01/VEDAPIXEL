<AnimatePresence>
  {showTeamPopup && (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-[8px] flex justify-center items-center z-[200] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative w-full max-w-[90vw] sm:max-w-[650px] md:max-w-[800px] lg:max-w-[85vw]
                   max-h-[90vh] overflow-y-auto flex flex-col gap-8 sm:gap-10 rounded-[30px] sm:rounded-[40px]
                   border border-white/20 bg-white/10 backdrop-blur-[20px]
                   shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 sm:p-8 lg:p-10"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-6 text-white text-[22px] sm:text-[24px] md:text-[28px] hover:text-[#b19cd9] transition-all"
          onClick={() => setShowTeamPopup(false)}
        >
          ✕
        </button>

        {/* Title */}
        <p className="popup-teamCard-title text-white text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.6rem] font-semibold text-center sm:text-left">
          Meet Our Team
        </p>

        {/* Team Cards */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 pb-4">
          {[
            { name: "Sunil MB", role: "Co-Founder - MD / CEO" },
            { name: "Nithin MB", role: "Co-Founder - MD" },
            { name: "Nisarga M", role: "Head of Operations" },
            { name: "Abhishek", role: "HR" },
          ].map((member, i) => (
            <motion.div
              key={i}
              className="relative flex items-center justify-start
                         w-full sm:w-[300px] md:w-[320px] lg:w-[35vw]
                         h-[120px] sm:h-[140px] md:h-[160px] lg:h-[24vh]
                         rounded-t-[40px] sm:rounded-t-[50px] lg:rounded-t-[66px]
                         rounded-br-[40px] sm:rounded-br-[50px] lg:rounded-br-[66px]
                         bg-[#9C90BD]/90 overflow-hidden border border-white/20
                         shadow-[0_8px_25px_rgba(156,144,189,0.4)] 
                         backdrop-blur-[6px] hover:shadow-[0_12px_30px_rgba(156,144,189,0.7)]
                         transition-all duration-500"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={profileImg}
                alt="Profile"
                className="absolute bottom-0 left-0 h-[110px] sm:h-[130px] md:h-[150px] lg:h-[35vh] object-cover"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] sm:w-[50%] md:w-[45%] flex flex-col justify-center items-start pr-3 sm:pr-4">
                <p className="text-white font-bold text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] leading-tight">
                  {member.name}
                </p>
                <p className="text-[#E4E3E3] text-[0.7rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>;
