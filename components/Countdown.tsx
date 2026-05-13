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

const GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Wedding+of+Adhika+%26+Josephine" +
  "&dates=20260620T053000Z/20260620T070000Z" +
  "&details=We+would+be+honored+to+have+you+celebrate+our+special+day+with+us." +
  "&location=Katedral+Santo+Petrus+Bandung%2C+Jl.+Merdeka+No.14%2C+Bandung" +
  "&sf=true&output=xml";

const generateICS = () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "BEGIN:VEVENT",
    "DTSTART:20260620T053000Z",
    "DTEND:20260620T070000Z",
    "SUMMARY:Wedding of Adhika & Josephine",
    "DESCRIPTION:We would be honored to have you celebrate our special day with us.",
    "LOCATION:Katedral Santo Petrus Bandung\, Jl. Merdeka No.14\, Bandung",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-adhika-josephine.ics";
  a.click();
  URL.revokeObjectURL(url);
};

const handleSaveTheDate = () => {
  window.open(GOOGLE_CALENDAR_URL, "_blank", "noopener,noreferrer");
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [dateRevealed, setDateRevealed] = useState(false);

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
            onReveal={() => setDateRevealed(true)}
            revealedContent={
              <div className="flex flex-col items-center justify-center -rotate-2">
                <span className="text-4xl font-sans font-bold tracking-widest text-[#253247]">20 . 06 . 2026</span>
              </div>
            }
            revealedAction={
              <button
                onClick={handleSaveTheDate}
                className="-rotate-2 inline-flex items-center gap-2 bg-[#253247] text-white px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#1a2435] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Save the date
              </button>
            }
          />
        </div>
      </motion.div>

      {/* Countdown Section — revealed after scratch */}
      <div
        style={{
          opacity: dateRevealed ? 1 : 0,
          transform: dateRevealed ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: dateRevealed ? "auto" : "none",
        }}
      >
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
      </div>
    </section>
  );
};

export default Countdown;
