"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type DragonPos = {
  x: number; // screen left of dragon element
  y: number; // screen top of dragon element
  width: number;
  height: number;
};

type FunModeContextType = {
  funMode: boolean;
  toggle: () => void;
  dragonPos: DragonPos;
  setDragonPos: (pos: DragonPos) => void;
};

const DEFAULT_DRAGON: DragonPos = { x: 0, y: 0, width: 120, height: 120 };

const FunModeContext = createContext<FunModeContextType>({
  funMode: false,
  toggle: () => {},
  dragonPos: DEFAULT_DRAGON,
  setDragonPos: () => {},
});

export function FunModeProvider({ children }: { children: React.ReactNode }) {
  const [funMode, setFunMode] = useState(false);
  const [dragonPos, setDragonPos] = useState<DragonPos>(DEFAULT_DRAGON);

  useEffect(() => {
    const stored = localStorage.getItem("funMode");
    if (stored === "true") {
      setFunMode(true);
      document.documentElement.setAttribute("data-fun", "true");
    }
  }, []);

  const toggle = useCallback(() => {
    setFunMode((prev) => {
      const next = !prev;
      document.documentElement.setAttribute("data-fun", next ? "true" : "false");
      localStorage.setItem("funMode", String(next));
      return next;
    });
  }, []);

  return (
    <FunModeContext.Provider value={{ funMode, toggle, dragonPos, setDragonPos }}>
      {children}
    </FunModeContext.Provider>
  );
}

export const useFunMode = () => useContext(FunModeContext);
