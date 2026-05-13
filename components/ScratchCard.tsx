"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface ScratchCardProps {
  width: number;
  height: number;
  revealedContent: React.ReactNode;
  revealedAction?: React.ReactNode;
  coverImageSrc?: string;
  onReveal?: () => void;
}

// Continuous scratch sound using Web Audio API
class ScratchAudio {
  private ctx: AudioContext | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying = false;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return;
    }
  }

  start() {
    if (!this.ctx || this.isPlaying) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    // Create 2 seconds of noise, looped
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    this.noiseSource = this.ctx.createBufferSource();
    this.noiseSource.buffer = buffer;
    this.noiseSource.loop = true;

    // Bandpass filter for scratch texture
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "bandpass";
    this.filter.frequency.value = 4000;
    this.filter.Q.value = 0.8;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 0.12;

    this.noiseSource.connect(this.filter);
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.noiseSource.start();
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) return;
    // Fade out quickly to avoid click
    this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
    const source = this.noiseSource;
    setTimeout(() => {
      try { source?.stop(); } catch { /* already stopped */ }
    }, 100);
    this.noiseSource = null;
    this.gainNode = null;
    this.filter = null;
    this.isPlaying = false;
  }
}

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, revealedContent, revealedAction, coverImageSrc, onReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchAudioRef = useRef<ScratchAudio | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const checkRevealPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percent = transparent / (pixels.length / 4);
    if (percent > 0.65) {
      setIsRevealed(true);
      onReveal?.();
    }
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (coverImageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = coverImageSrc;
      img.onload = () => {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, 0, 0, width, height);
        ctx.globalCompositeOperation = "destination-out";
      };
      img.onerror = () => {
        // Fallback
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#F9F9F9";
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "destination-out";
      };
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#F9F9F9";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "destination-out";
    }
  }, [width, height, coverImageSrc]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    scratch(x, y);
    if (!scratchAudioRef.current) {
      scratchAudioRef.current = new ScratchAudio();
      scratchAudioRef.current.init();
    }
    scratchAudioRef.current.start();
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    scratchAudioRef.current?.stop();
    checkRevealPercentage();
  };

  return (
    <div
      style={{ width, height }}
      className="relative mx-auto rounded-lg bg-transparent flex items-center justify-center p-0 overflow-visible"
    >
      {/* Content always visible behind canvas */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-0">
        {revealedContent}
      </div>

      {/* Canvas on top covers content until scratched */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="absolute top-0 left-0 w-full h-full z-10 touch-none drop-shadow-md cursor-crosshair"
      />

      {/* Once revealed, overlay just the action button above the canvas */}
      {isRevealed && revealedAction && (
        <div
          className="absolute inset-0 flex items-end justify-center pb-6 z-20 pointer-events-none"
        >
          <div
            className="pointer-events-auto"
            style={{
              opacity: 0,
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            {revealedAction}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default ScratchCard;
