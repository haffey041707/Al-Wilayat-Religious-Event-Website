"use client";

import Link from "next/link";
import { GhadirScene } from "@/components/GhadirScene";
import { GhadirSlides } from "@/components/GhadirSlides";
import {
  LANGUAGE_COPY,
  themeVars,
  type Language,
  type ThemeKey
} from "@/lib/content";

type SharedWishProps = {
  slug: string;
  name: string;
  recipient: string;
  message: string;
  language: Language;
  theme: ThemeKey;
};

export function SharedWish({
  slug,
  language,
  theme
}: SharedWishProps) {
  const copy = LANGUAGE_COPY[language];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080816]" style={themeVars(theme)}>
      <section className="relative min-h-[58vh] overflow-hidden">
        <GhadirScene theme={theme} compact />
        <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl items-end px-4 py-8 md:px-8">
          <div className="max-w-3xl pb-5">
            <p className="text-sm font-bold uppercase text-white/72">ghadirwish.com/wish/{slug}</p>
            <h1 className="mt-3 text-[clamp(2.4rem,8vw,6rem)] font-black leading-none text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.34)]">
              {copy.title}
            </h1>
          </div>
        </div>
      </section>

      <GhadirSlides />

      <div className="px-4 pb-10 md:px-8">
        <Link className="primary-button mx-auto flex max-w-xs px-4" href="/">
          Create Your Wish
        </Link>
      </div>
    </main>
  );
}
