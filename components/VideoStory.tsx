"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="w-full py-16 bg-background flex flex-col items-center">
      <motion.h2
        className="text-5xl md:text-7xl font-script text-foreground mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our Film
      </motion.h2>

      <motion.div
        className="relative w-full max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
          <video
            ref={videoRef}
            src={`${basePath}/videos/pepong-video.mp4`}
            className="w-full h-full object-contain"
            playsInline
            preload="metadata"
            onEnded={handleVideoEnd}
            controls={isPlaying}
          />

          {/* Play button overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 hover:bg-black/40 cursor-pointer group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#44322a] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>

        <div className="mt-6 text-center px-4 max-w-lg mx-auto">
          <p className="text-sm md:text-base font-sans leading-relaxed text-foreground">
            A little glimpse into our journey together.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
