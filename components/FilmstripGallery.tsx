"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";

const filmPhotos = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
];

const FilmstripGallery = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const offsetRef = useRef(0);
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);
  const isPausedRef = useRef(false);
  const lastTouchXRef = useRef<number | null>(null);
  const lastTouchTimeRef = useRef<number>(0);
  const singleSetWidthRef = useRef(0);
  const [isHolding, setIsHolding] = useState(false);

  // Duplicate photos for seamless infinite scroll
  const photos = [...filmPhotos, ...filmPhotos, ...filmPhotos];

  const autoScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;

    if (!isPausedRef.current) {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      offsetRef.current -= speedRef.current;
    }

    // Seamless loop
    const sw = singleSetWidthRef.current;
    if (sw > 0) {
      if (offsetRef.current <= -sw * 2) {
        offsetRef.current += sw;
      } else if (offsetRef.current >= 0) {
        offsetRef.current -= sw;
      }
    }

    // Gradually return to base speed
    if (Math.abs(targetSpeedRef.current - 0.5) > 0.01) {
      targetSpeedRef.current += (0.5 - targetSpeedRef.current) * 0.02;
    } else {
      targetSpeedRef.current = 0.5;
    }

    el.style.transform = `translateX(${offsetRef.current}px)`;
    animationRef.current = requestAnimationFrame(autoScroll);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    // Measure single set width after images render
    const measure = () => {
      const totalWidth = el.scrollWidth;
      singleSetWidthRef.current = totalWidth / 3;
      offsetRef.current = -singleSetWidthRef.current;
      el.style.transform = `translateX(${offsetRef.current}px)`;
    };

    // Wait for layout
    requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });

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
    const touchX = e.touches[0].clientX;
    const now = Date.now();

    if (lastTouchXRef.current !== null) {
      const delta = lastTouchXRef.current - touchX;
      const dt = Math.max(now - lastTouchTimeRef.current, 1);
      const velocity = delta / dt;

      // Directly move while dragging
      offsetRef.current -= delta;

      // Set fling speed based on swipe velocity
      targetSpeedRef.current = velocity * 15;
    }

    lastTouchXRef.current = touchX;
    lastTouchTimeRef.current = now;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPausedRef.current) return;
    const mouseX = e.clientX;
    const now = Date.now();

    if (lastTouchXRef.current !== null) {
      const delta = lastTouchXRef.current - mouseX;
      const dt = Math.max(now - lastTouchTimeRef.current, 1);
      const velocity = delta / dt;

      offsetRef.current -= delta;
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

        {/* Scrollable photos — using transform instead of scrollLeft for iOS compatibility */}
        <div
          style={{ overflow: "hidden" }}
        >
          <div
            ref={stripRef}
            className="flex gap-1 px-1"
            style={{ willChange: "transform" }}
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
          ))}          </div>        </div>

        {/* Bottom perforations */}
        <div className="relative h-6 md:h-7 flex items-center overflow-hidden">
          <Perforations />
        </div>
      </div>
    </section>
  );
};

export default FilmstripGallery;
