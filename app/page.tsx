import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Couple from "@/components/Couple";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import WeddingWishes from "@/components/WeddingWishes";
import WeddingGift from "@/components/WeddingGift";
import Footer from "@/components/Footer";
import GuestNameProvider from "@/components/GuestNameProvider";
import Divider from "@/components/Divider";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full items-center">
      <div className="w-full max-w-screen-xl mx-auto bg-background min-h-screen relative overflow-hidden flex flex-col items-center">
        <Suspense fallback={null}>
          <GuestNameProvider />
        </Suspense>
        
        <Hero />
        <Countdown />
        <Couple />
        
        <Divider />
        <Gallery />
        
        <Divider />
        <EventDetails />
        
        <PhotoPlaceholder />
        <VideoPlaceholder />

        <Divider />
        <RSVPForm />
        
        <Divider />
        <WeddingWishes />
        
        <Divider />
        <WeddingGift />

        <Footer />
      </div>
    </main>
  );
}
