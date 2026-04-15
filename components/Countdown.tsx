"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2025-10-04T12:30:00"); // <- defined outside


// image gif buat cincin sama tanggal nikah

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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(calculateTimeLeft(TARGET_DATE));
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []); // ✅ Empty dependency array

  if (!timeLeft) return null; // or return a loading state

  return (
    <section className="py-16 bg-[#fefbf6] text-center">

            {/* 🖼️ Fade + Zoom on scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={`${basePath}/images/header.png`}
          alt="Counting the Days Illustration"
          width={450}
          height={300}
          className="mx-auto mb-6"
        />
      </motion.div>

      {/* 💬 Quote: fade + slide up on scroll */}
      <motion.div
        className="max-w-3xl mx-auto px-4 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <p className="text-sm md:textlg text-[#7e6c5f] italic font-light leading-relaxed">
          "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. 
          It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. 
          Love does not delight in evil but rejoices with the truth. 
          It always protects, always trusts, always hopes, always perseveres. <span className="text-lg md:text-xl "><b>Love never fails.</b></span>" <br />

        </p>
          <span className="text-sm block mt-2 text-[#7e6c5f] font-light leading-relaxed">- 1 Corinthians 13:4-8</span>
      </motion.div>

      {/* 📢 Title: fade in */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-[cinzel] text-[#44322a] mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Counting the Days
      </motion.h2>

      {/* 🖼️ Fade + Zoom on scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={`${basePath}/images/ring 2.png`}
          alt="Counting the Days Illustration"
          width={450}
          height={300}
          className="mx-auto mb-6"
        />
      </motion.div>

      {/* 📣 Subtext: fade + slide up */}
      <motion.p
        className="text-[#9f9389] mb-8 font-light"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Until we say &nbsp; <span className="text-xl md:text-2xl ">"I do"</span>
      </motion.p>

      {/* ⏱️ Countdown: staggered fade + slide up */}
      <motion.div
        className="flex justify-center items-center gap-6 md:gap-12 text-[#44322a] font-[cinzel]"
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
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl md:text-5xl font-bold">
              {value.toString().padStart(2, "0")}
            </div>
            <span className="text-sm md:text-base tracking-widest mt-2">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Countdown;
