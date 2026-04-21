"use client";
import { useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  width: number;
  height: number;
  revealedContent: React.ReactNode;
  coverImageSrc?: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, revealedContent, coverImageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

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
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div
      style={{ width, height }}
      className="relative mx-auto rounded-lg bg-transparent flex items-center justify-center p-0 overflow-visible"
    >
      <div className="absolute inset-0 flex items-center justify-center text-center">
        {revealedContent}
      </div>

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
        className="absolute top-0 left-0 w-full h-full cursor-crosshair z-10 touch-none drop-shadow-md"
        style={{ pointerEvents: isRevealed ? "none" : "auto" }}
      />
    </div>
  );
};

export default ScratchCard;
