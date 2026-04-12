"use client";
import dynamic from "next/dynamic";

const Dragon = dynamic(() => import("./Dragon"), { ssr: false });

export default function DragonLoader() {
  return <Dragon />;
}
