import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import EventDetails from "@/components/EventDetails";
import MapEmbed from "@/components/MapEmbed";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import WeddingWishes from "@/components/WeddingWishes";
import WeddingGift from "@/components/WeddingGift";
import Footer from "@/components/Footer";
import GuestNameProvider from "@/components/GuestNameProvider";
import Divider from "@/components/Divider";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full items-center">
      <div className="w-full sm:max-w-md md:max-w-xl lg:max-w-2xl px-4 sm:px-8 py-10 bg-background min-h-screen relative overflow-hidden flex flex-col items-center">
        <Suspense fallback={null}>
          <GuestNameProvider />
        </Suspense>
        
        <Hero />
        <Divider />
        <Couple />
        <Divider />
        <EventDetails />
        <Divider />
        <MapEmbed />
        <Divider />
        <Gallery />
        <Divider />
        <RSVPForm />
        <Divider />
        <WeddingGift />
        <Divider />
        <WeddingWishes />
        <Footer />
      </div>
    </main>
  );
}
