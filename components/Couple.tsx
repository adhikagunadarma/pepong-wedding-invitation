"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
        Meet the couple
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-end max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Bride */}
        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <img
            src={`${basePath}/images/artboard-2-copy.png`}
            alt="Josephine"
            className="h-[380px] md:h-[460px] w-auto object-contain"
          />
          <div className="w-[300px] mt-2">
            <p className="text-xs text-center font-sans tracking-tight leading-relaxed px-4">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
        </motion.div>

        {/* Groom */}
        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <img
            src={`${basePath}/images/artboard-2.png`}
            alt="Adhika Gunadarma"
            className="h-[380px] md:h-[460px] w-auto object-contain"
          />
          <div className="w-[300px] mt-2">
            <p className="text-xs text-center font-sans tracking-tight leading-relaxed px-4">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Couple;
