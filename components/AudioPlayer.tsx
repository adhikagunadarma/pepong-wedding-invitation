"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music2 } from "lucide-react";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Try autoplay muted on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true; // force muted
      audio
        .play()
        .then(() => {
          console.log("Muted autoplay started");
        })
        .catch(err => {
          console.warn("Muted autoplay blocked:", err);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false; // unmute on user action
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
