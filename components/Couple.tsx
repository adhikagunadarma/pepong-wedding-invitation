"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Couple = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="w-full py-8 bg-background flex flex-col items-center">
      <motion.p
        className="font-script text-4xl text-primary mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        And so the adventure begins...
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row gap-8 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Bride */}
        <motion.div
          className="flex flex-col items-center border border-border p-3 rounded-2xl bg-white shadow-sm"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="w-[200px] h-[250px] relative rounded-xl overflow-hidden grayscale contrast-125">
            <Image
              src={`${basePath}/images/bride.png`}
              alt="Pepe"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 text-center pb-2">
            <h3 className="text-2xl font-bold tracking-tighter text-foreground">PEPE</h3>
            <p className="text-xs uppercase tracking-widest text-foreground mt-1">
              THE BRIDE
            </p>
          </div>
        </motion.div>

        <div className="text-primary font-script text-4xl hidden md:block">&</div>

        {/* Groom */}
        <motion.div
          className="flex flex-col items-center border border-border p-3 rounded-2xl bg-white shadow-sm"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="w-[200px] h-[250px] relative rounded-xl overflow-hidden grayscale contrast-125">
            <Image
              src={`${basePath}/images/groom.png`}
              alt="Pong"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 text-center pb-2">
            <h3 className="text-2xl font-bold tracking-tighter text-foreground">PONG</h3>
            <p className="text-xs uppercase tracking-widest text-foreground mt-1">
              THE GROOM
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Couple;
