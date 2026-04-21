"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Gallery = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="py-16 w-full flex flex-col items-center bg-background">
      <div className="w-full max-w-screen-lg mx-auto px-4 text-center flex flex-col items-center">
        <motion.h2
          className="text-5xl md:text-7xl font-script text-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          story
        </motion.h2>

        <motion.div
           className="relative w-full"
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={`${basePath}/images/artboard-3.png`}
            alt="Our Story Collage"
            width={1000}
            height={1400}
            sizes="100vw"
            className="w-full h-auto object-contain"
          />
          
          <div className="mt-12 text-center px-4 max-w-lg mx-auto">
            <p className="text-sm md:text-base font-sans leading-relaxed text-foreground">
              Every picture tells a story, and you are all an essential part of ours. From the small moments to the grand adventures, our love story continues to grow. 
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
