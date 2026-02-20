"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type BusinessType = "contractor" | "mover";

interface BusinessTypeContextValue {
  businessType: BusinessType;
  setBusinessType: (bt: BusinessType) => void;
  isMover: boolean;
  isContractor: boolean;
}

const BusinessTypeContext = createContext<BusinessTypeContextValue>({
  businessType: "contractor",
  setBusinessType: () => {},
  isMover: false,
  isContractor: true,
});

export function BusinessTypeProvider({ children }: { children: ReactNode }) {
  const [businessType, setBusinessTypeState] = useState<BusinessType>("contractor");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("uhl_business_type") as BusinessType | null;
    if (stored === "mover" || stored === "contractor") {
      setBusinessTypeState(stored);
    }
    setLoaded(true);
  }, []);

  const setBusinessType = (bt: BusinessType) => {
    setBusinessTypeState(bt);
    localStorage.setItem("uhl_business_type", bt);
  };

  if (!loaded) return null;

  return (
    <BusinessTypeContext.Provider value={{
      businessType,
      setBusinessType,
      isMover: businessType === "mover",
      isContractor: businessType === "contractor",
    }}>
      {children}
    </BusinessTypeContext.Provider>
  );
}

export function useBusinessType() {
  return useContext(BusinessTypeContext);
}
