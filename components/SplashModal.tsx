"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SplashModal = ({ guestName = "Guest" }: { guestName?: string }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"enter" | "idle" | "exit">("enter");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Trigger the fly-in transition after first paint
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
  }, []);

  // Bird enters → lands after 1.2s
  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 1200);
    return () => clearTimeout(t);
  }, []);

  // Floating animation via a second state toggle
  const [floatUp, setFloatUp] = useState(false);
  useEffect(() => {
    if (phase !== "idle") return;
    const interval = setInterval(() => setFloatUp((v) => !v), 1500);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showSplash]);

  const handleOpenInvitation = () => {
    setPhase("exit");
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setIsVisible(false), 600);
    }, 800);
  };

  if (!isVisible) return null;

  // Compute bird transform based on phase
  let birdTransform = "translate(120%, -80%) rotate(15deg) scale(0.5)";
  let birdOpacity = 0;
  let birdTransition = "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease";

  if (phase === "idle") {
    birdTransform = floatUp
      ? "translateY(-6px) rotate(0.5deg)"
      : "translateY(4px) rotate(-0.5deg)";
    birdOpacity = 1;
    birdTransition = "transform 1.5s ease-in-out, opacity 0.4s ease";
  } else if (phase === "enter") {
    if (mounted) {
      // Transition TO landed position
      birdTransform = "translate(0, 0) rotate(0deg) scale(1)";
      birdOpacity = 1;
    }
    // else: stays at initial offscreen position
  } else if (phase === "exit") {
    birdTransform = "translate(-150%, -200%) rotate(-20deg) scale(0.3)";
    birdOpacity = 0;
    birdTransition = "transform 0.8s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.6s ease";
  }

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
                opacity: phase === "enter" ? 0 : 1,
                transform: phase === "enter" ? "translateY(20px)" : "translateY(0)",
                transition: "opacity 0.6s ease 1.3s, transform 0.6s ease 1.3s",
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
              transform: birdTransform,
              opacity: birdOpacity,
              transition: birdTransition,
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

          {/* Tap hint */}
          {phase === "idle" && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9f9389",
                padding: "0.25rem 0 1rem",
                opacity: floatUp ? 0.6 : 1,
                transition: "opacity 1.5s ease",
              }}
            >
              Tap the bird to open
            </p>
          )}

          <div style={{ padding: "0 1.5rem", marginTop: "-5rem", paddingBottom: "2rem", position: "relative", zIndex: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default SplashModal;
