import { Inter } from "next/font/google";
import React from "react";
import Navbar from "../ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-100">
      <style jsx global>{`
      html {
        font-family: ${inter.style.fontFamily};
      `}</style>
      <Navbar />
      {children}
    </div>
  );
}
