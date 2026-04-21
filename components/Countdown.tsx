"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScratchCard from "./ScratchCard";

const TARGET_DATE = new Date("2026-06-20T12:30:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(calculateTimeLeft(TARGET_DATE));
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <section className="py-16 bg-background text-center w-full flex flex-col items-center">
      {/* Scratch Card Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-16 -mt-8"
      >
        <div className="rotate-2 drop-shadow-lg scale-90 sm:scale-100">
          <ScratchCard 
            width={340} 
            height={240} 
            coverImageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/artboard-8.png`}
            revealedContent={
              <div className="flex flex-col items-center justify-center -rotate-2">
                <span className="text-4xl font-sans font-bold tracking-widest text-[#253247]">04 . 10 . 2026</span>
                <span className="text-xl mt-4 text-[#DEBA29] uppercase tracking-widest font-sans font-bold">Save the date</span>
              </div>
            } 
          />
        </div>
      </motion.div>

      {/* Countdown Section */}
      <motion.h2
        className="text-6xl md:text-8xl font-script text-foreground mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Countdown
      </motion.h2>

      <motion.div
        className="flex justify-center items-center gap-4 sm:gap-8 text-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.4,
            },
          },
        }}
      >
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINUTES", value: timeLeft.minutes },
          { label: "SECONDS", value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center w-16 sm:w-20"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl md:text-5xl font-light tracking-widest">
              {value.toString().padStart(2, "0")}
            </div>
            <span className="text-[10px] sm:text-xs tracking-widest mt-2 uppercase font-semibold">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Countdown;
