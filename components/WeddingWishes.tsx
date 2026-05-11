"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useGuestName } from "./GuestNameProvider";

interface Wish {
  name: string;
  message: string;
  created_at?: string;
}

const WeddingWishes = () => {
  const guestName = useGuestName();
  const defaultName = guestName !== "Guest" ? guestName : "";
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(defaultName);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWishes = async () => {
       // Graceful degradation if env not setup
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

      const { data, error } = await supabase
        .from("pepong_wish_wedding")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) {
        setWishes(data as Wish[]);
      }
    };
    fetchWishes();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [wishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const newWish: Wish = {
      name: name.trim() || "Anonymous",
      message: message.trim(),
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase
        .from("pepong_wish_wedding")
        .insert(newWish);

      if (!error) {
        setWishes((prev) => [...prev, newWish]);
        setName("");
        setMessage("");
      }
    } else {
        setWishes((prev) => [...prev, newWish]);
        setName("");
        setMessage("");
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-[#F2EBE1] flex flex-col items-center pb-16">
      
      {/* FAQ */}
      <div className="w-full max-w-sm mb-20 text-center">
        <motion.h2
          className="text-6xl md:text-8xl font-script text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>
        <div className="flex flex-col gap-4 text-left px-6">
          {[
            {
              q: "When and where is the ceremony?",
              a: "The ceremony will be held on June 20, 2026 at Katedral Santo Petrus, Jl. Merdeka No.14, Bandung. Doors open at 12:00 PM.",
            },
            {
              q: "Is there a dress code?",
              a: "Semi-formal attire is suggested. We'd love for guests to wear earth tones or pastels, but feel free to dress comfortably.",
            },
            {
              q: "Can I bring a plus one?",
              a: "Due to limited seating, we kindly ask that only those named in the invitation attend. Please check your RSVP for guest count details.",
            },
            {
              q: "Is parking available?",
              a: "Yes, there is parking available near the venue. We'll share more details closer to the date.",
            },
            {
              q: "Will the event be indoors or outdoors?",
              a: "The ceremony will be indoors at the cathedral. Please plan accordingly.",
            },
            {
              q: "Who do I contact if I have more questions?",
              a: "Feel free to reach out to us directly via WhatsApp or message us on Instagram. We're happy to help!",
            },
          ].map((item, idx) => (
            <details
              key={idx}
              className="group border border-border rounded-lg bg-[#E5DFC5] overflow-hidden"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-bold font-sans tracking-wide text-foreground flex items-center justify-between">
                {item.q}
                <span className="ml-2 text-xs transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="px-4 pb-3 text-sm font-sans leading-relaxed text-foreground/80">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <motion.h2
        className="text-6xl md:text-8xl font-script text-foreground mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Wishes
      </motion.h2>

      <div className="w-full max-w-md bg-[#E5DFC5] rounded-[1rem] p-6 shadow-sm border border-border">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 text-left w-full"
        >
          <input
            type="text"
            placeholder="Your Name..."
            className="w-full border-b border-border bg-transparent px-2 py-2 text-foreground focus:outline-none font-sans"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write a message..."
            className="w-full border-b border-border bg-transparent px-2 py-2 text-foreground focus:outline-none resize-none h-20 font-sans"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#9CBA7F] text-white uppercase tracking-widest font-bold py-3 rounded-md shadow-sm hover:bg-[#8CA872] transition-colors"
          >
            {loading ? "Sending..." : "Send Wish"}
          </button>
        </form>

        <div
          ref={scrollRef}
          className="marginTop-6 max-h-[300px] overflow-y-auto text-left flex flex-col gap-4 px-2 custom-scrollbar mt-6"
        >
          {wishes.map((wish, idx) => (
            <div key={idx} className="border-b border-border/30 pb-3">
              <p className="font-bold text-sm tracking-wide font-sans text-foreground">{wish.name}</p>
              <p className="text-foreground/90 font-sans leading-relaxed text-sm mt-1">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingWishes;
