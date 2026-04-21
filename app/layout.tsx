import "./globals.css";
import localFont from "next/font/local";
import AudioPlayer from "@/components/AudioPlayer";

const basisGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/BasisGrotesqueArabicPro-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BasisGrotesqueArabicPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BasisGrotesqueArabicPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BasisGrotesqueArabicPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BasisGrotesqueArabicPro-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

const madelyn = localFont({
  src: "../public/fonts/Madelyn-Trial-Regular.ttf",
  variable: "--font-script",
});

export const metadata = {
  title: "The Wedding of Pepe & Pong",
  description: "Join us in celebrating the wedding of Pepe & Pong.",
  icons: {
    icon: "/carry.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${basisGrotesque.variable} ${madelyn.variable} font-sans bg-[#F2EBE1] text-[#333333] antialiased`}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
