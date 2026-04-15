// components/GuestNameProvider.tsx
"use client";

import { useSearchParams } from "next/navigation";
import SplashModal from "./SplashModal";

export default function GuestNameProvider() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Guest";

  return <SplashModal guestName={guestName} />;
}
