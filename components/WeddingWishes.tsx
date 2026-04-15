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

    const { error } = await supabase
      .from("arya_lizzy_wish_wedding")
      .insert(newWish);

    if (!error) {
      setWishes((prev) => [...prev, newWish]);
      setName("");
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-background flex flex-col items-center mb-16">
      <div className="w-full max-w-sm rounded-[1rem] border border-border p-6 text-center shadow-sm relative mt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-3 font-script text-3xl text-primary rotate-3">
          Guestbook
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4 text-left"
        >
          <input
            type="text"
            placeholder="Your Name..."
            className="w-full border-b border-border bg-transparent px-2 py-2 text-foreground focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write a message..."
            className="w-full border-b border-border bg-transparent px-2 py-2 text-foreground focus:outline-none resize-none h-20"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 border border-border bg-white text-foreground uppercase tracking-widest font-bold py-2 rounded-lg shadow-sm hover:bg-muted"
          >
            {loading ? "Sending..." : "Send Wish"}
          </button>
        </form>

        <div
          ref={scrollRef}
          className="mt-6 max-h-[300px] overflow-y-auto text-left flex flex-col gap-4 px-2"
        >
          {wishes.map((wish, idx) => (
            <div key={idx} className="border-b border-border/30 pb-3">
              <p className="font-bold text-sm uppercase tracking-tighter text-foreground">{wish.name}</p>
              <p className="text-foreground/80 font-light text-sm mt-1">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingWishes;
