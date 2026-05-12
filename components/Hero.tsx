"use client";
import Image from "next/image";

const Hero = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="w-full flex flex-col items-center relative overflow-hidden">
      <div className="relative w-full flex justify-center items-center bg-[#51633F]">
        <Image
          src={`${basePath}/images/artboard-1.png`}
          alt="Adhika & Josephine"
          width={1366}
          height={768}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="text-center px-8 py-12 bg-background w-full">
        <p className="text-sm md:text-base text-foreground max-w-lg mx-auto font-sans leading-relaxed">
          We're getting married and we'd love for you to be there to celebrate with us.
        </p>
      </div>
    </section>
  );
};

export default Hero;
