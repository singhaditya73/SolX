"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[47rem] w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="absolute top-6 left-6 z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
        Sol X
      </h1>
        <p></p>
        
      </div>
      <BackgroundBeams />
    </div>
  );
}
