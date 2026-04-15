"use client";

import { motion } from "framer-motion";
import Image from "next/image";


const Story = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <motion.section
      className="bg-background text-center px-6 pt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.3 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        {/* Image */}
        <motion.div
          className="w-full object-cover max-h-[500px] md:max-h-[600px] rounded-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={`${basePath}/images/ouat.jpg`}
            alt="ur Story Decoration"
            width={800} // set your actual width
            height={400} // set your actual height
          className="w-full object-cover max-h-[500px] md:max-h-[600px] rounded-md"
          />
          </motion.div>

        {/* "Our Once" */}
        <motion.h2
          className="text-white font-script text-5xl sm:text-6xl md:text-7xl -mt-14 sm:-mt-20 md:-mt-24 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Once
        </motion.h2>

        {/* "Upon a Time" */}
        <motion.h2
          className="text-primary font-script text-5xl sm:text-6xl md:text-7xl mt-3 transform translate-x-14 sm:translate-x-16 md:translate-x-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Upon a Time
        </motion.h2>
      </div>

      {/* Story paragraph */}
      <motion.p
        className="max-w-2xl mx-auto text-foreground/80 font-light leading-relaxed text-base sm:text-lg md:text-xl mt-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Once upon a quiet beginning in 2021, Pepe met Pong—two souls brought together by fate and a shared workplace in F&B World. What began as collaboration soon turned into companionship, as they worked side by side, lifting each other up. A year passed, and love began to stir—softly, sweetly—rooted in shared joys on concerts nights and warm bowls of mie Ayam. Their hearts found rhythm in laughter, comfort in presence, and delight in the little things. Now, with love that has grown deep and true, and under the gentle blessing of God, Pepe and Pong step into forever. A promise sealed not just in vows, but in the quiet magic of a love story still unfolding.

      </motion.p>

      <div className="h-20 sm:h-24 md:h-32"></div>
    </motion.section>
  );
};

export default Story;
