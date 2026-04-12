import type { Metadata } from "next";
import ManuscriptClient from "./ManuscriptClient";

export const metadata: Metadata = {
  title: "The Chronicle — Divyansh Chawla",
  description: "An illuminated manuscript of craft and code.",
};

export default function ManuscriptPage() {
  return <ManuscriptClient />;
}
