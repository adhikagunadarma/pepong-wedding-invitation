// components/Footer.tsx
"use client";
import Image from "next/image";


const Footer = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return(
    <footer className="py-12 text-center px-6 ">

      <Image
        src={`${basePath}/images/footer.png`}
        alt="Thank you for celebrating with us"
        width={450}
        height={250}
        className="mx-auto w-full max-w-[180px] md:max-w-[220px]"
        />
      <p className="text-sm uppercase tracking-widest text-foreground mt-4">&copy; {new Date().getFullYear()} Pepe & Pong.</p>
    </footer>
)};

export default Footer;