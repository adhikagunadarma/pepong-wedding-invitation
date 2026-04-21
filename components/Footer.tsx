"use client";
import Image from "next/image";

const Footer = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return(
    <footer className="w-full bg-background flex flex-col justify-between items-center text-center overflow-hidden mb-8 md:mb-16">
      
      {/* Paragraph between WeddingGift and Footer */}
      <div className="w-full max-w-2xl px-4 py-8 md:py-16 mx-auto text-center">
         <p className="text-sm md:text-base font-sans leading-relaxed text-foreground">
           Thank you for being part of our journey. We can&apos;t wait to celebrate this special day with you!
         </p>
      </div>

      <div className="relative w-full max-w-screen-xl aspect-[4/3] sm:aspect-video mx-auto">
        <Image
          src={`${basePath}/images/artboard-6.png`}
          alt="See you!"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </footer>
  );
};

export default Footer;