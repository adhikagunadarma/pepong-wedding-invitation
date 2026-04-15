"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const RSVPForm = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full bg-background flex flex-col items-center">
      <div className="w-full max-w-sm rounded-[1rem] border border-border p-6 text-center shadow-sm relative mt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 font-script text-3xl text-primary -rotate-2">
          RSVP
        </div>

        {submitted ? (
          <div className="py-12 animate-fadeIn flex flex-col items-center">
            <h3 className="font-script text-4xl text-primary mb-2">Thank you!</h3>
            <p className="text-foreground font-light text-sm">Your response has been received.</p>
          </div>
        ) : (
          <>
            <p className="mt-4 mb-6 text-sm text-foreground/80 leading-relaxed font-light">
              Please RSVP by completing the form below.
            </p>

            {/* Hidden iframe to block redirecting to Google Forms page */}
            <iframe name="hidden_iframe" className="hidden" onLoad={() => { setSubmitted(true); }}></iframe>

            <form
              action="https://docs.google.com/forms/d/e/1FAIpQLSc6WuSZvXUkJy0Z5ckBbrLve3mqr_Bb_ShnKB8AvzJV3pQVGQ/formResponse"
              method="POST"
              target="hidden_iframe"
              className="flex flex-col gap-5 text-left"
              onSubmit={() => setTimeout(() => setSubmitted(true), 1000)}
            >
              {/* Name Block */}
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-2">Name</label>
                <input 
                  type="text" 
                  name="entry.56822025" 
                  required 
                  placeholder="John Doe"
                  className="w-full border border-border bg-white rounded-lg px-4 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Attending Status */}
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-2">Will you attend?</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-lg px-4 py-2">
                    <input type="radio" name="entry.650001048" value="Yes!" required className="accent-primary" />
                    <span className="text-sm">Yes, gladly!</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-lg px-4 py-2">
                    <input type="radio" name="entry.650001048" value="No :(" required className="accent-primary" />
                    <span className="text-sm">No, I'm sorry</span>
                  </label>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-foreground font-bold ml-2">Guests count</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-lg px-4 py-2">
                    <input type="radio" name="entry.1294259475" value="1" required className="accent-primary" />
                    <span className="text-sm">1 Person</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer border border-border bg-white rounded-lg px-4 py-2">
                    <input type="radio" name="entry.1294259475" value="2" required className="accent-primary" />
                    <span className="text-sm">2 People</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full border border-border bg-foreground text-background uppercase tracking-widest font-bold py-3 rounded-lg shadow-sm hover:bg-foreground/90 transition-colors"
              >
                Submit RSVP
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default RSVPForm;
