"use client";
import { useFunMode } from "./FunModeProvider";

export default function DragonWrapper() {
  const { funMode } = useFunMode();
  if (!funMode) return null;
  return <div className="parchment-overlay" />;
}
