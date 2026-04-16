"use client";
import dynamic from "next/dynamic";

const HeroFuturistic = dynamic(
  () => import("../components/ui/hero-futuristic").then((m) => m.HeroFuturistic),
  {
    ssr: false,
    loading: () => (
      <div
        id="hero"
        style={{ height: "100svh", backgroundColor: "#000000" }}
      />
    ),
  }
);

export default function Hero() {
  return (
    <div id="hero">
      <HeroFuturistic
        title="DIVYANSH CHAWLA"
        subtitle="I write code that runs in production. Backend mostly. Not only."
      />
    </div>
  );
}
