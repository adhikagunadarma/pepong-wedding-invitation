"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const RSVPForm = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full py-16 flex flex-col items-center bg-[#F2EBE1]">
      <motion.h2
        className="text-6xl md:text-8xl font-script text-foreground mb-12 -rotate-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        RSVP
      </motion.h2>

      <motion.div
        className="cursor-pointer relative transition-transform hover:scale-105 active:scale-95 z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={() => setModalOpen(true)}
      >
        <Image
          src={`${basePath}/images/artboard-7.png`}
          alt="RSVP Envelope"
          width={360}
          height={280}
          className="object-contain"
        />
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
               className="w-full max-w-sm rounded-[1rem] border border-border p-8 bg-[#F2EBE1] shadow-xl relative"
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-3xl opacity-50 hover:opacity-100"
              >
                &times;
              </button>
              
              <h3 className="font-script text-6xl text-center mb-6 text-foreground">RSVP</h3>

              {submitted ? (
                <div className="py-8 animate-fadeIn flex flex-col items-center">
                  <h3 className="font-script text-5xl text-[#9CBA7F] mb-4">Thank you!</h3>
                  <p className="text-foreground font-sans text-sm tracking-wide">Your response has been received.</p>
                  <button onClick={() => setModalOpen(false)} className="mt-8 underline text-sm tracking-widest font-bold">CLOSE</button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-sm text-foreground leading-relaxed font-sans text-center">
                    Please RSVP by completing the form below.
                  </p>

                  <iframe name="hidden_iframe" className="hidden" onLoad={() => { if(submitted) { } }}></iframe>

                  <form
                    // action="https://docs.google.com/forms/d/e/1FAIpQLSc6WuSZvXUkJy0Z5ckBbrLve3mqr_Bb_ShnKB8AvzJV3pQVGQ/formResponse"
                    method="POST"
                    target="hidden_iframe"
                    className="flex flex-col gap-4 text-left font-sans"
                    onSubmit={() => {
                        setTimeout(() => setSubmitted(true), 1000);
                    }}
                  >
                    {/* Name Block */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-1">Name</label>
                      <input 
                        type="text" 
                        name="entry.56822025" 
                        required 
                        placeholder="John Doe"
                        className="w-full border border-border bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#9CBA7F]"
                      />
                    </div>

                    {/* Attending Status */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-1">Will you attend?</label>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-md px-4 py-3">
                          <input type="radio" name="entry.650001048" value="Yes!" required className="accent-[#9CBA7F] w-4 h-4" />
                          <span className="text-sm">Yes, gladly!</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-md px-4 py-3">
                          <input type="radio" name="entry.650001048" value="No :(" required className="accent-[#9CBA7F] w-4 h-4" />
                          <span className="text-sm">No, I'm sorry</span>
                        </label>
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-1">Guests count</label>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-md px-4 py-3">
                          <input type="radio" name="entry.1294259475" value="1" required className="accent-[#9CBA7F] w-4 h-4" />
                          <span className="text-sm">1 Person</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-md px-4 py-3">
                          <input type="radio" name="entry.1294259475" value="2" required className="accent-[#9CBA7F] w-4 h-4" />
                          <span className="text-sm">2 People</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full border border-border bg-[#9CBA7F] text-white uppercase tracking-widest font-bold py-4 rounded-md shadow-sm hover:bg-[#8CA872] transition-colors"
                    >
                      Submit RSVP
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RSVPForm;
