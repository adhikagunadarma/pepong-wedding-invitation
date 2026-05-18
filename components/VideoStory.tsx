"use client";
import React from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section className="w-full py-16 bg-background flex flex-col items-center">
      <motion.h2
        className="text-5xl md:text-6xl lg:text-7xl font-script text-foreground mb-8 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* A little glimpse into our journey together. */}
      </motion.h2>

      <motion.div
        className="relative w-full max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
          <iframe
            className="w-full h-full absolute top-0 left-0"
            src="https://www.youtube.com/embed/6J3jx5Cafss"
            title="Prewedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
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
