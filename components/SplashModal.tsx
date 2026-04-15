"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SplashModal = ({ guestName = "Guest" }: { guestName?: string }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";


  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSplash]);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => setIsVisible(false), 500); // delay unmount
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleOpenInvitation = () => {
    setShowSplash(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-[#fdfbf0] transition-opacity duration-500 ${
        showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 🔲 Blurry Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-[#fdfbf0]/80" />

      {/* 📩 Modal */}
      <div className="relative z-10 bg-[#fdfbf0] flex items-center justify-center h-full px-4">
        <div className="bg-[#fdfbf0] rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden text-center border border-[#e6e0d6]">
          <Image
            src={`${basePath}/images/home.gif`}
            alt="Wedding background"
            width={800} // set your actual width
            height={400} // set your actual height
            className="w-full h-auto object-cover"
          />
        <div className="px-6 -mt-20 pb-8 bg-[#fdfbf0] relative z-10">
          <h1 className="text-sm sm:text-base md:text-lg font-light tracking-widest text-[#9f9389] uppercase mb-2">
            The Wedding of
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-[#44322a] mb-6">
            Lizzy & Arya
          </h2>
          <div className="h-6" /> {/* spacer with fixed height */}
          <h3 className="text-sm sm:text-base md:text-lg font-light tracking-widest text-[#9f9389] uppercase mb-2">
            SAVE THE DATE
          </h3>
          <h4 className="text-xs sm:text-sm md:text-base font-light tracking-widest text-[#9f9389] uppercase mb-2">
            04.10.2025
          </h4>
          <div className="h-6" /> {/* spacer with fixed height */}
          <p className="text-[#44322a] text-sm sm:text-base mb-4">
            Dear <span className="font-semibold">{guestName}</span>,
          </p>
          <button
            onClick={handleOpenInvitation}
            className="px-6 py-3 bg-[#44322a] text-white rounded-full shadow-md hover:bg-[#2f231c] transition"
          >
            Open Invitation
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SplashModal;
