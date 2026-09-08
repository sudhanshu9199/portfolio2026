"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import style from "./Marquee.module.scss";

// Requested Marquee Keywords
const BASE_ITEMS = [
  "FULL STACK DEVELOPMENT",
  "AI & ML",
  "NEXT.JS",
  "BUILD",
  "INNOVATE",
  "SCALE",
];

// Double list per group to guarantee dense coverage on all screens including ultrawide
const GROUP_ITEMS = [...BASE_ITEMS, ...BASE_ITEMS];

// 4-Petal Flower Accent from Image 2 with increased size and wider center gap
const FlowerIcon = () => (
  <span className={style.flowerIcon} aria-hidden="true">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fe9f0a">
      {/* Top Petal */}
      <ellipse cx="12" cy="5.2" rx="2.4" ry="4.8" />
      {/* Bottom Petal */}
      <ellipse cx="12" cy="18.8" rx="2.4" ry="4.8" />
      {/* Left Petal */}
      <ellipse cx="5.2" cy="12" rx="4.8" ry="2.4" />
      {/* Right Petal */}
      <ellipse cx="18.8" cy="12" rx="4.8" ry="2.4" />
    </svg>
  </span>
);

export default function Marquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      // Infinitely move with smooth GSAP linear loop
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });

      const container = containerRef.current;
      if (container) {
        const handleMouseEnter = () => tween.timeScale(0.4); // Smooth slow-down on hover
        const handleMouseLeave = () => tween.timeScale(1);   // Return to normal speed
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={style.marqueeContainer}
      aria-label="Skills and Core Competencies Marquee"
    >
      <div ref={trackRef} className={style.marqueeTrack}>
        {/* Group 1 */}
        <div className={style.marqueeGroup}>
          {GROUP_ITEMS.map((text, idx) => (
            <React.Fragment key={`group1-${idx}`}>
              <span className={style.marqueeText}>{text}</span>
              <FlowerIcon />
            </React.Fragment>
          ))}
        </div>

        {/* Group 2 (Exact duplicate for -50% seamless infinite loop) */}
        <div className={style.marqueeGroup} aria-hidden="true">
          {GROUP_ITEMS.map((text, idx) => (
            <React.Fragment key={`group2-${idx}`}>
              <span className={style.marqueeText}>{text}</span>
              <FlowerIcon />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
