"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const storyMoments = [
  {
    eyebrow: "The beginning",
    title: "Friends first",
    body:
      "We started as junior high and high school friends, quietly passing through the same chapters without knowing we would one day become each other’s favorite story.",
  },
  {
    eyebrow: "The contrast",
    title: "Steady meets chaotic",
    body:
      "Dika was quiet, steady, and probably enjoying life in grandpa mode. Meanwhile, Jojo was random, chaotic, and occasionally too much to handle.",
  },
  {
    eyebrow: "The middle",
    title: "Somewhere along the way",
    body:
      "But life has its funny routes. What started as familiar faces slowly became comfortable conversations, shared laughter, weekend rides, and a feeling of home. After a few turns and unexpected climbs, we found balance — and a pace that feels just right.",
  },
  {
    eyebrow: "The nicknames",
    title: "How Pepe met Pong",
    body:
      "Adhika was usually called Dika, but somewhere along the way, he became Pong. It started with his love for skipping, his go-to sport because, as he said, it is cheap and convenient. So, Dika the Skippong became Pong. And Pepe? The name somehow travelled from Josephine to José, and from José to Pepe — which, as it turns out, is actually a real Spanish nickname. And yes, the frog reference is not entirely denied.",
  },
];

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

          <div className="mt-12 px-4 max-w-4xl mx-auto">
            <p className="text-sm md:text-base font-sans leading-relaxed text-foreground text-center max-w-2xl mx-auto">
              A few of our favorite moments together — the ones we keep coming back to.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 text-left">
              {storyMoments.map((moment, index) => (
                <motion.div
                  key={moment.title}
                  className="rounded-[1.75rem] border border-border bg-[#F7F2EA] px-6 py-7 md:px-7 md:py-8 shadow-sm"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#9CBA7F] font-semibold mb-3">
                    {moment.eyebrow}
                  </p>
                  <h3 className="font-script text-3xl md:text-4xl text-foreground mb-3 leading-none">
                    {moment.title}
                  </h3>
                  <p className="text-sm md:text-base font-sans leading-relaxed text-foreground/90">
                    {moment.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
