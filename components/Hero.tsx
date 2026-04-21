"use client";
import Image from "next/image";

const Hero = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="w-full flex flex-col items-center relative overflow-hidden">
      <div className="relative w-full aspect-[4/3] sm:aspect-video flex justify-center items-center bg-[#51633F]">
        <Image
          src={`${basePath}/images/artboard-1.png`}
          alt="Adhika & Josephine"
          fill
          className="object-cover"
          priority
        />
        
        <div className="absolute top-10 left-6 sm:top-16 sm:left-12 z-10">
          <h1 className="text-6xl md:text-8xl font-script text-[#F2EBE1] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Adhika <span className="text-yellow-400 text-5xl md:text-7xl">&amp;</span>
          </h1>
        </div>
        
        <div className="absolute bottom-16 right-6 sm:bottom-24 sm:right-12 z-10">
          <h1 className="text-6xl md:text-8xl font-script text-[#F2EBE1] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Josephine
          </h1>
        </div>
      </div>

      <div className="text-center px-8 py-12 bg-background w-full">
        <p className="text-sm md:text-base text-foreground max-w-lg mx-auto font-sans leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
          gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>
      </div>
    </section>
  );
};

export default Hero;
