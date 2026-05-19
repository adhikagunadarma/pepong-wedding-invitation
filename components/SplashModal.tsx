"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Ordered by section appearance: Hero → Countdown → Couple → Gallery → FilmstripGallery → EventDetails → RSVPForm → WeddingGift → Footer
const PRELOAD_IMAGES = [
  "/images/artboard-1.png",      // Hero
  "/images/artboard-8.png",      // Countdown (scratch card cover)
  "/images/artboard-2.png",      // Couple (groom)
  "/images/artboard-2-copy.png", // Couple (bride)
  "/images/artboard-3.png",      // Gallery
  "/images/gallery-1.jpg",       // Filmstrip
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
  "/images/gallery-11.jpg",
  "/images/gallery-12.jpg",
  "/images/gallery-13.jpg",
  "/images/artboard-4.png",      // EventDetails
  "/images/artboard-7.png",      // RSVPForm
  "/images/artboard-5.png",      // WeddingGift
  "/images/artboard-6.png",      // Footer
];

const SplashModal = ({ guestName = "Guest" }: { guestName?: string }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [showTapHint, setShowTapHint] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Fade in card after mount
  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Show "Tap to open" after animation settles (2.5s)
  useEffect(() => {
    const t = setTimeout(() => setShowTapHint(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Preload assets sequentially in section order during splash animation
  useEffect(() => {
    let cancelled = false;
    const loadInOrder = async () => {
      for (const src of PRELOAD_IMAGES) {
        if (cancelled) break;
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // skip failed, continue loading
          img.src = `${basePath}${src}`;
        });
      }
    };
    loadInOrder();
    return () => { cancelled = true; };
  }, [basePath]);

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showSplash]);

  const handleOpenInvitation = () => {
    setFadeOut(true);
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setIsVisible(false), 600);
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "#fdfbf0",
        opacity: showSplash ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: showSplash ? "auto" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#fdfbf0",
            borderRadius: "1rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            maxWidth: "32rem",
            width: "100%",
            overflow: "hidden",
            textAlign: "center",
            border: "1px solid #e6e0d6",
            opacity: fadeOut ? 0 : fadeIn ? 1 : 0,
            transform: fadeOut ? "scale(0.95)" : fadeIn ? "scale(1)" : "scale(0.95)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Guest name */}
          <div style={{ padding: "1.5rem 1.5rem 0", position: "relative", zIndex: 10 }}>
            <p
              style={{
                color: "#44322a",
                fontSize: "0.95rem",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-sans)",
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.8s ease 0.3s",
              }}
            >
              Dear <span style={{ fontWeight: 600 }}>{guestName}</span>,
            </p>
          </div>

          {/* Bird image */}
          <button
            onClick={handleOpenInvitation}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              width: "100%",
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
            aria-label="Open Invitation"
          >
            <Image
              src={`${basePath}/images/opening.png`}
              alt="Bird carrying a love letter — tap to open"
              width={800}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority
            />
          </button>

          {/* Tap hint — always visible so users know what to do */}
          <p
            style={{
              fontSize: "0.8rem",
              color: "#9f9389",
              padding: "0.5rem 0 1.5rem",
              opacity: fadeIn && !fadeOut ? 1 : 0,
              transition: "opacity 1s ease 1.5s",
              letterSpacing: "0.05em",
            }}
          >
            👆 Tap to open the invitation
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashModal;
