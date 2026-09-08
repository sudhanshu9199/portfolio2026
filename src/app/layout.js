import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.scss";

export const metadata = {
  title: "Portfolio 2026",
  description: "Modern portfolio built with Next.js, React, Sass, and GSAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
