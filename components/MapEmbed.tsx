"use client";
import { motion } from "framer-motion";

const MapEmbed = () => {
  return (
    <motion.section
      className="w-full flex flex-col items-center bg-background"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-sm rounded-[1rem] overflow-hidden border border-border shadow-sm bg-white p-2 relative mt-4">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 font-script text-2xl text-primary -rotate-2 z-10 border border-border rounded-lg">
          Location
        </div>
        <div className="w-full h-48 rounded-lg overflow-hidden border border-border mt-3">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.797096622821!2d107.6080306749964!3d-6.914846293084707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6309a9f3bd5%3A0x59751be8b7eb9772!2sSaint%20Peter%20Cathedral%20Bandung!5e0!3m2!1sen!2sid!4v1776827274435!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) contrast(120%)" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
};

export default MapEmbed;
