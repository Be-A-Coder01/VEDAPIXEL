import React from "react";
import pic1 from "../assets/appDevelopment.png";

const Services = () => {
  const services = [
    {
      title: "Mobile Applications",
      desc: "Crafting seamless iOS and Android apps that engage users.",
      img: pic1,
    },
    {
      title: "Web Development",
      desc: "Building dynamic, responsive websites for every need.",
      img: pic1,
    },
    {
      title: "Gaming App Development",
      desc: "Creating immersive, high-quality games across all platforms.",
      img: pic1,
    },
    {
      title: "AR/VR",
      desc: "Delivering lifelike AR and VR experiences for learning and innovation.",
      img: pic1,
    },
    {
      title: "ERP",
      desc: " Streamlining operations with intelligent, all-in-one ERP systems.",
      img: pic1,
    },
    {
      title: "Chatbot Development",
      desc: "Designing AI chatbots that simplify support and engagement.",
      img: pic1,
    },
    {
      title: "AL/ML",
      desc: "Empowering automation and insights through advanced AI and ML.",
      img: pic1,
    },
    {
      title: "CRM",
      desc: "Enhancing relationships through efficient, customized CRM solutions.",
      img: pic1,
    },
    {
      title: "Cloud & DevOps Services",
      desc: "Driving efficiency with seamless cloud and DevOps tools.",
      img: pic1,
    },
    {
      title: "Maintenance & Support",
      desc: "Ensuring software stays secure, reliable, and up to date.",
      img: pic1,
    },
  ];

  return (
    <div className="flex flex-col gap-10 mt-20 px-6 sm:px-10 md:px-16 lg:px-28">
      <p className="text-4xl md:text-5xl font-semibold text-white text-center md:text-left">
        Our Services
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full sm:w-[80%] md:w-[90%] lg:w-[23vw] h-auto border border-[#F2F2F2] flex flex-col gap-3 rounded-xl p-6 hover:bg-[#141414] transition-all duration-300"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-contain"
            />
            <p className="text-xl md:text-2xl text-white font-semibold">
              {service.title}
            </p>
            <p className="text-sm md:text-base text-[#C8C1C1] leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
