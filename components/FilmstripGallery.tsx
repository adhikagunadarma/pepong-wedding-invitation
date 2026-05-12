"use client";
import React, { useRef, useEffect } from "react";

const GALLERY_COUNT = 9;
const filmPhotos = Array.from({ length: GALLERY_COUNT }, (_, i) => `/images/gallery-${i + 1}.jpg`);

const FilmstripGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Duplicate photos for seamless infinite scroll
  const photos = [...filmPhotos, ...filmPhotos, ...filmPhotos];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start scroll from the middle set
    el.scrollLeft = el.scrollWidth / 3;

    const autoScroll = () => {
      el.scrollLeft += 0.5;

      // Reset scroll for seamless loop
      const singleSetWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationRef.current);
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
      <div className="relative bg-[#2a2420] py-0 mx-auto select-none">
        {/* Top perforations */}
        <div className="relative h-6 md:h-7 flex items-center overflow-hidden">
          <Perforations />
        </div>

        {/* Scrollable photos */}
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-hidden px-1 pointer-events-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
