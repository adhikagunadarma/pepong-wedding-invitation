"use client";
import Image from "next/image";

const Hero = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="w-full flex flex-col items-center text-center mt-6">
      <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden border border-border pb-4 p-2 bg-background shadow-sm">
        <div className="w-full h-[450px] relative rounded-[1.5rem] overflow-hidden grayscale contrast-125 brightness-90">
          <Image
            src={`${basePath}/images/home.gif`}
            alt="Pepe & Pong"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Caption embedded below the photo structurally */}
        <div className="mt-6 flex flex-col items-center z-10 animate-fadeIn">
          <h2 className="text-5xl font-script text-primary mb-2 -rotate-2">
            Love is —
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground uppercase leading-none">
            We're Getting<br/>Married!
          </h1>
          <p className="mt-4 font-bold text-lg text-foreground tracking-widest uppercase">
            Pepe & Pong
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
