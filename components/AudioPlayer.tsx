"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music2 } from "lucide-react";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const handleInvitationOpened = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Fallback: some browsers need a tiny delay
          setTimeout(() => {
            audio
              .play()
              .then(() => setPlaying(true))
              .catch((err) => console.warn("Autoplay blocked:", err));
          }, 100);
        });
    };

    window.addEventListener("invitation-opened", handleInvitationOpened);
    return () => window.removeEventListener("invitation-opened", handleInvitationOpened);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(err => console.warn("Play failed:", err));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-full p-4 hover:bg-pink-100 transition"
        aria-label="Toggle music"
      >
        {playing ? (
          <Music2 className="text-pink-400" />
        ) : (
          <Music className="text-gray-400" />
        )}
      </button>
      <audio ref={audioRef} loop preload="auto">
        <source src={`${basePath}/audio/wedding-song.mp3`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioPlayer;
