import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghadir Celebration Experience",
  description:
    "An interactive Eid al-Ghadir experience with animated slides, multilingual wish cards, a virtual robot greeting, country flags, and hadith references."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
