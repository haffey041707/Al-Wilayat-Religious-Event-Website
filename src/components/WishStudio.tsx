"use client";

import { GhadirScene } from "@/components/GhadirScene";
import { GhadirSlides } from "@/components/GhadirSlides";
import {
  themeVars,
  type ThemeKey
} from "@/lib/content";

export function WishStudio() {
  const theme: ThemeKey = "radiant";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080816]" style={themeVars(theme)}>
      <section className="relative min-h-[92vh] overflow-hidden">
        <GhadirScene theme={theme} />
      </section>

      <GhadirSlides />
    </main>
  );
}
