"use client";
import { motion } from "framer-motion";

const EventDetails = () => {
  return (
    <section className="w-full bg-background flex flex-col items-center max-w-sm mx-auto">
      <motion.div
        className="w-full border border-border rounded-[1rem] p-6 text-center shadow-sm relative mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 font-script text-3xl text-primary -rotate-3">
          Ceremony
        </div>

        <h3 className="text-xl font-bold tracking-tighter text-foreground mt-4 uppercase">Holy Matrimony</h3>
        <p className="text-foreground mt-2 font-medium tracking-tight">4 October 2025 • 12:30 PM</p>
        <p className="text-foreground/80 mt-1 text-sm uppercase tracking-widest">Santo Laurensius Catholic Church</p>
      </motion.div>

      <motion.div
        className="w-full border border-border rounded-[1rem] p-6 text-center shadow-sm relative mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 font-script text-3xl text-primary rotate-2">
          Dress Code
        </div>

        <h3 className="text-xl font-bold tracking-tighter text-foreground mt-4 uppercase">Our Palette</h3>
        <p className="text-foreground mt-2 font-medium tracking-tight">Wear your best & comfy outfit</p>
        
        {/* Color Palette Balls */}
        <div className="flex justify-center gap-3 mt-4">
          <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: "#F4E3D7" }}></div>
          <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: "#D8C3A5" }}></div>
          <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: "#8E8D8A" }}></div>
          <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: "#E98074" }}></div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
