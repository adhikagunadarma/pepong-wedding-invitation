"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Wish {
  name: string;
  message: string;
  created_at?: string;
}

const WeddingWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWishes = async () => {
       // Graceful degradation if env not setup
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

      const { data, error } = await supabase
        .from("arya_lizzy_wish_wedding")
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
        .from("arya_lizzy_wish_wedding")
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
      
      {/* FAQ Placeholder */}
      <div className="w-full max-w-sm mb-20 text-center">
        <motion.h2
          className="text-6xl md:text-8xl font-script text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Faq?
        </motion.h2>
        <p className="text-sm font-sans leading-relaxed text-foreground text-left px-8">
          Have an inquiry about the wedding details? Feel free to reach out to our team, and we will be delighted to assist you with everything you need.
        </p>
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
