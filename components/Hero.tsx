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
      </div>

      <div className="text-center px-8 py-12 bg-background w-full">
        <p className="text-sm md:text-base text-foreground max-w-lg mx-auto font-sans leading-relaxed">
          Two souls, one heart, a lifetime of love. We joyfully invite you to share in our happiness as we unite in marriage and begin this beautiful new chapter of our lives together.
        </p>
      </div>
    </section>
  );
};

export default Hero;
