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
          Story
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
          
          <div className="mt-12 px-4 max-w-3xl mx-auto">
            <p className="text-sm md:text-base font-sans leading-relaxed text-foreground text-center">
              A few of our favorite moments together — the ones we keep coming back to.
            </p>

            <div className="mt-8 space-y-5 text-sm md:text-base font-sans leading-relaxed text-foreground text-left bg-[#F7F2EA] border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <p>
                We started as junior high and high school friends, quietly passing through the same chapters without knowing we would one day become each other&apos;s favorite story.
              </p>
              <p>
                Dika was quiet, steady, and probably enjoying life in grandpa mode. Meanwhile, Jojo was random, chaotic, and occasionally too much to handle.
              </p>
              <p>
                But life has its funny routes. What started as familiar faces slowly became comfortable conversations, shared laughter, weekend rides, and a feeling of home. After a few turns and unexpected climbs, we found balance — and a pace that feels just right.
              </p>
              <p>
                As for the nicknames, Adhika was usually called Dika, but somewhere along the way, he became Pong. It started with his love for skipping, his go-to sport because, as he said, it is cheap and convenient. So, Dika the Skippong became Pong.
              </p>
              <p>
                And Pepe? The name somehow travelled from Josephine to José, and from José to Pepe — which, as it turns out, is actually a real Spanish nickname. And yes, the frog reference is not entirely denied.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
