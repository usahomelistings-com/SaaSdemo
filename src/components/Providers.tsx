"use client";

import { BusinessTypeProvider } from "@/context/BusinessTypeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BusinessTypeProvider>{children}</BusinessTypeProvider>;
}
