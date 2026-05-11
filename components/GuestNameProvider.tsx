// components/GuestNameProvider.tsx
"use client";

import { createContext, useContext } from "react";
import { useSearchParams } from "next/navigation";
import SplashModal from "./SplashModal";

const GuestNameContext = createContext<string>("Guest");

export function useGuestName() {
  return useContext(GuestNameContext);
}

export default function GuestNameProvider({ children }: { children?: React.ReactNode }) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Guest";

  return (
    <GuestNameContext.Provider value={guestName}>
      <SplashModal guestName={guestName} />
      {children}
    </GuestNameContext.Provider>
  );
}
