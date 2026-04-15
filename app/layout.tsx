import "./globals.css";
import { Montserrat, Great_Vibes } from "next/font/google";
import AudioPlayer from "@/components/AudioPlayer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
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
      <body className={`${montserrat.variable} ${greatVibes.variable} font-sans bg-[#FAFAFA] text-[#333333] antialiased`}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
