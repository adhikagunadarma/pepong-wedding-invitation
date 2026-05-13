"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";

const GALLERY_COUNT = 9;
const filmPhotos = Array.from({ length: GALLERY_COUNT }, (_, i) => `/images/gallery-${i + 1}.jpg`);

const FilmstripGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);
  const isPausedRef = useRef(false);
  const lastTouchXRef = useRef<number | null>(null);
  const lastTouchTimeRef = useRef<number>(0);
  const [isHolding, setIsHolding] = useState(false);

  // Duplicate photos for seamless infinite scroll
  const photos = [...filmPhotos, ...filmPhotos, ...filmPhotos];

  const autoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Smoothly interpolate speed back to base
    if (!isPausedRef.current) {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      el.scrollLeft += speedRef.current;
    }

    // Reset scroll for seamless loop
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
    }

    // Gradually return to base speed
    if (Math.abs(targetSpeedRef.current - 0.5) > 0.01) {
      targetSpeedRef.current += (0.5 - targetSpeedRef.current) * 0.02;
    } else {
      targetSpeedRef.current = 0.5;
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start scroll from the middle set
    el.scrollLeft = el.scrollWidth / 3;

    animationRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [autoScroll]);

  // Hold to pause
  const handlePointerDown = useCallback(() => {
    isPausedRef.current = true;
    setIsHolding(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    isPausedRef.current = false;
    setIsHolding(false);
    lastTouchXRef.current = null;
  }, []);

  // Swipe / drag to fling
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    const touchX = e.touches[0].clientX;
    const now = Date.now();

    if (lastTouchXRef.current !== null) {
      const delta = lastTouchXRef.current - touchX;
      const dt = Math.max(now - lastTouchTimeRef.current, 1);
      const velocity = delta / dt;

      // Directly scroll while dragging
      el.scrollLeft += delta;

      // Set fling speed based on swipe velocity
      targetSpeedRef.current = velocity * 15;
    }

    lastTouchXRef.current = touchX;
    lastTouchTimeRef.current = now;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPausedRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const mouseX = e.clientX;
    const now = Date.now();

    if (lastTouchXRef.current !== null) {
      const delta = lastTouchXRef.current - mouseX;
      const dt = Math.max(now - lastTouchTimeRef.current, 1);
      const velocity = delta / dt;

      el.scrollLeft += delta;
      targetSpeedRef.current = velocity * 15;
    }

    lastTouchXRef.current = mouseX;
    lastTouchTimeRef.current = now;
  }, []);

  // Film perforation holes
  const Perforations = () => (
    <div className="flex items-center gap-[18px] px-2 absolute left-0 right-0 z-10 pointer-events-none"
      style={{ width: "max-content" }}
    >
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-4 md:w-3.5 md:h-5 rounded-sm bg-background/80 shrink-0"
        />
      ))}
    </div>
  );

  return (
    <section className="w-full py-12 bg-background overflow-hidden">
      <div
        className="relative bg-[#2a2420] py-0 mx-auto select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
        style={{ cursor: isHolding ? "grabbing" : "grab", touchAction: "pan-y" }}
      >
        {/* Top perforations */}
        <div className="relative h-6 md:h-7 flex items-center overflow-hidden">
          <Perforations />
        </div>

        {/* Scrollable photos */}
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-hidden px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              className="shrink-0 h-[200px] md:h-[300px] w-[300px] md:w-[450px] bg-[#1a1512]"
            >
              <img
                src={`${basePath}${src}`}
                alt={`Film frame ${(i % filmPhotos.length) + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Bottom perforations */}
        <div className="relative h-6 md:h-7 flex items-center overflow-hidden">
          <Perforations />
        </div>
      </div>
    </section>
  );
};

export default FilmstripGallery;
