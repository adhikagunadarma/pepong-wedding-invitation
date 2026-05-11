"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SplashModal = ({ guestName = "Guest" }: { guestName?: string }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isFlyingAway, setIsFlyingAway] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    // Bird "lands" after flying in
    const timer = setTimeout(() => setHasLanded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSplash]);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => setIsVisible(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleOpenInvitation = () => {
    setIsFlyingAway(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes flyIn {
          0% {
            transform: translate(120%, -80%) rotate(15deg) scale(0.5);
            opacity: 0;
          }
          40% {
            transform: translate(-5%, 5%) rotate(-5deg) scale(1.05);
            opacity: 1;
          }
          60% {
            transform: translate(3%, -3%) rotate(3deg) scale(0.98);
            opacity: 1;
          }
          80% {
            transform: translate(-1%, 1%) rotate(-1deg) scale(1.01);
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-6px) rotate(0.5deg);
          }
          75% {
            transform: translateY(4px) rotate(-0.5deg);
          }
        }
        @keyframes flyAway {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          30% {
            transform: translate(0, 10px) rotate(-5deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translate(-150%, -200%) rotate(-20deg) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(68, 50, 42, 0.3);
          }
          50% {
            box-shadow: 0 0 20px 6px rgba(68, 50, 42, 0.15);
          }
        }
        .bird-fly-in {
          animation: flyIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .bird-float {
          animation: gentleFloat 3s ease-in-out infinite;
        }
        .bird-fly-away {
          animation: flyAway 0.8s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }
        .text-fade-in {
          opacity: 0;
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
        .btn-pulse {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
      <div
        className={`fixed inset-0 z-[1000] bg-[#fdfbf0] transition-opacity duration-500 ${
          showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 backdrop-blur-md bg-[#fdfbf0]/80" />

        {/* Modal */}
        <div className="relative z-10 bg-[#fdfbf0] flex items-center justify-center h-full px-4">
          <div className="bg-[#fdfbf0] rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden text-center border border-[#e6e0d6]">
            <div className="px-6 pt-6 bg-[#fdfbf0] relative z-10">
              <p
                className="text-[#44322a] text-sm sm:text-base mb-2 text-fade-in"
                style={{ animationDelay: "1.3s" }}
              >
                Dear <span className="font-semibold">{guestName}</span>,
              </p>
            </div>
            <button
              onClick={handleOpenInvitation}
              className={`cursor-pointer ${
                isFlyingAway
                  ? "bird-fly-away"
                  : hasLanded
                  ? "bird-float"
                  : "bird-fly-in"
              }`}
              aria-label="Open Invitation"
            >
              <Image
                src={`${basePath}/images/opening.png`}
                alt="Bird carrying a love letter — tap to open"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              {hasLanded && !isFlyingAway && (
                <p
                  className="text-xs text-[#9f9389] mt-1 text-fade-in animate-pulse"
                  style={{ animationDelay: "1.4s" }}
                >
                  Tap the bird to open
                </p>
              )}
            </button>
            <div className="px-6 -mt-20 pb-8 bg-[#fdfbf0] relative z-10">
              <h1
                className="text-sm sm:text-base md:text-lg font-light tracking-widest text-[#9f9389] uppercase mb-2 text-fade-in"
                style={{ animationDelay: "1.5s" }}
              >
                The Wedding of
              </h1>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-script text-[#44322a] mb-6 text-fade-in"
                style={{ animationDelay: "1.7s" }}
              >
                Adhika & Josephine
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashModal;
