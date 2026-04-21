"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const EventDetails = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="w-full bg-background flex flex-col items-center mt-8">
      <motion.h2
        className="text-5xl md:text-7xl font-script text-foreground mb-12 mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Event Details
      </motion.h2>

      <motion.div
        className="w-full md:max-w-4xl border-y md:border border-border flex flex-col md:flex-row bg-[#E5DFC5] md:rounded-xl overflow-hidden mb-8 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left column - Church Image */}
        <div className="w-full md:w-1/2 relative min-h-[400px] border-b md:border-b-0 md:border-r border-border">
          <Image
            src={`${basePath}/images/artboard-4.png`}
            alt="Church"
            fill
            className="object-cover"
          />
        </div>

        {/* Right column - Text Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-sm font-sans leading-relaxed text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse 
              ultrices gravida. Risus commodo viverra maecenas
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold font-sans text-sm mb-2 uppercase tracking-wide">Location:</h3>
            <p className="text-sm font-sans leading-relaxed text-foreground">
              Santo Laurensius Catholic Church
            </p>
          </div>

          <div className="w-full mt-4">
            <h3 className="font-bold font-sans text-sm mb-2 uppercase tracking-wide">Maps:</h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-border mt-3 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63458.74075248456!2d106.61729558578413!3d-6.2411416992178745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbc0ca3c7539%3A0x6fe1ad1d96d0fa85!2sSaint%20Lawrence%20Catholic%20Church%2C%20Alam%20Sutera!5e0!3m2!1sen!2sid!4v1755696834020!5m2!1sen!2sid" 
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(120%)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
