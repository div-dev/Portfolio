import type { Metadata } from "next";
import PitlaneClient from "./PitlaneClient";

export const metadata: Metadata = {
  title: "Pitlane — Divyansh Chawla",
  description: "An F1-themed interactive career dashboard.",
};

export default function PitlanePage() {
  return <PitlaneClient />;
}
