"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramProfiles = {
  bride: {
    label: "@fransisca.josephine",
    url: "https://www.instagram.com/fransisca.josephine/",
  },
  groom: {
    label: "@adhikagunadarma",
    url: "https://www.instagram.com/adhikagunadarma/",
  },
};

const Couple = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="w-full py-16 bg-background flex flex-col items-center">
      <motion.h2
        className="text-5xl md:text-7xl font-script text-foreground mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Meet The Couple
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-start max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Groom */}
        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <img
            src={`${basePath}/images/artboard-2-copy.png`}
            alt="Adhika"
            className="h-[380px] md:h-[460px] w-auto object-contain"
          />
          <div className="w-[300px] mt-2">
            <p className="text-xs text-center font-sans tracking-tight leading-relaxed px-4">
              Quiet, steady, and dependable, with a dry sense of humor and a knack for making even ordinary days feel a little lighter.
            </p>
            <a
              href={instagramProfiles.groom.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs font-sans tracking-wide text-foreground/80 hover:text-[#9CBA7F] transition-colors"
              aria-label="Open Adhika's Instagram profile"
            >
              <Instagram className="h-3.5 w-3.5" />
              {instagramProfiles.groom.label}
            </a>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <img
            src={`${basePath}/images/artboard-2.png`}
            alt="Josephine"
            className="h-[380px] md:h-[460px] w-auto object-contain"
          />
          <div className="w-[300px] mt-2">
            <p className="text-xs text-center font-sans tracking-tight leading-relaxed px-4">
              Warm, thoughtful, and a little unpredictable in the best way. She finds joy in the little things and makes everyone around her feel at home.
            </p>
            <a
              href={instagramProfiles.bride.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs font-sans tracking-wide text-foreground/80 hover:text-[#9CBA7F] transition-colors"
              aria-label="Open Josephine's Instagram profile"
            >
              <Instagram className="h-3.5 w-3.5" />
              {instagramProfiles.bride.label}
            </a>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Couple;
