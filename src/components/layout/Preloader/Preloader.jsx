"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrandIcon from "@/components/common/BrandIcon";
import styles from "./Preloader.module.scss";

export default function Preloader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);
  const amberCurtainRef = useRef(null);
  const shuttersRef = useRef([]);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const contentRef = useRef(null);
  const statusRef = useRef(null);
  const techBadgeRef = useRef(null);
  const cornerTelemetryRef = useRef(null);

  // 5 vertical columns for the architectural shutter wave
  const columns = [0, 1, 2, 3, 4];

  useEffect(() => {
    // Check prefers-reduced-motion for accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      setIsFinished(true);
      return;
    }

    // Lock body scrolling during preloader playback
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const countObj = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
        setIsFinished(true);
      },
    });

    // 1. Initial State Setup
    tl.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
    tl.set(shuttersRef.current, { yPercent: 0 });
    tl.set(amberCurtainRef.current, { yPercent: 0 });

    // 2. Counter Animation (00% -> 100%) with developer milestones (~1.65s)
    tl.to(countObj, {
      val: 100,
      duration: 1.65,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(countObj.val);
        const formatted = rounded < 10 ? `0${rounded}` : `${rounded}`;

        if (counterRef.current) {
          counterRef.current.textContent = `${formatted}%`;
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${countObj.val / 100})`;
        }

        if (statusRef.current) {
          if (rounded >= 95) {
            statusRef.current.textContent = "04 // DOM READY · COMPILATION SUCCESS";
            if (techBadgeRef.current) techBadgeRef.current.textContent = "STATUS: ONLINE";
          } else if (rounded >= 68) {
            statusRef.current.textContent = "03 // INITIALIZING AI CORE & WEBRTC NODES...";
            if (techBadgeRef.current) techBadgeRef.current.textContent = "AI_ENGINE: ACTIVE";
          } else if (rounded >= 34) {
            statusRef.current.textContent = "02 // HYDRATING REACT 19 & MOTION TOKENS...";
            if (techBadgeRef.current) techBadgeRef.current.textContent = "REACT: HYDRATING";
          } else {
            statusRef.current.textContent = "01 // COMPILING ASSETS & SYSTEM KERNEL...";
            if (techBadgeRef.current) techBadgeRef.current.textContent = "KERNEL: BOOTING";
          }
        }
      },
    });

    // 3. Short celebration hold at 100%
    tl.to({}, { duration: 0.18 });

    // 4. Staggered Content & Corner Telemetry Exit
    tl.to(
      [contentRef.current, cornerTelemetryRef.current],
      {
        y: -30,
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
      }
    );

    // 5. Architectural 5-Column Patterned Shutter Wave Wipe
    // Each column carries its own grid pattern and lifts in a cascading wave
    tl.to(
      shuttersRef.current,
      {
        yPercent: -102,
        duration: 0.9,
        stagger: {
          each: 0.055,
          from: "start",
        },
        ease: "power4.inOut",
        onStart: () => {
          if (onComplete) onComplete();
        },
      },
      "-=0.08"
    );

    // 6. Amber Curtain Blade lifts in close trail to cast a golden rim highlight
    tl.to(
      amberCurtainRef.current,
      {
        yPercent: -102,
        duration: 0.82,
        ease: "power4.inOut",
      },
      "<+=0.08"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className={styles.preloaderOverlay}
      role="status"
      aria-label="Portfolio Loading"
    >
      {/* Underlying Amber Flash Blade */}
      <div ref={amberCurtainRef} className={styles.amberCurtain} />

      {/* 5-Column Architectural Shutter Layer (Pattern is embedded inside each column) */}
      <div className={styles.shuttersContainer}>
        {columns.map((colIndex) => (
          <div
            key={colIndex}
            ref={(el) => {
              if (el) shuttersRef.current[colIndex] = el;
            }}
            className={styles.shutterColumn}
            style={{
              left: `${colIndex * 20}%`,
            }}
          >
            {/* Technical grid matrix pattern embedded directly in this column */}
            <div className={styles.columnGridPattern} />

            {/* Glowing vertical seam dividing line */}
            <div className={styles.columnSeam} />

            {/* Glowing amber laser bottom lip */}
            <div className={styles.shutterLip} />
          </div>
        ))}
      </div>

      {/* Corner Technical Crosshairs & Telemetry */}
      <div ref={cornerTelemetryRef} className={styles.cornerTelemetry}>
        {/* Top-Left: Coordinate Crosshair */}
        <div className={`${styles.cornerBox} ${styles.topLeft}`}>
          <span className={styles.crosshair}>+</span>
          <span className={styles.cornerText}>LOC // 25.68° N, 85.21° E</span>
        </div>

        {/* Top-Right: System Environment */}
        <div className={`${styles.cornerBox} ${styles.topRight}`}>
          <span ref={techBadgeRef} className={styles.cornerTextHighlight}>
            KERNEL: BOOTING
          </span>
          <span className={styles.crosshair}>+</span>
        </div>

        {/* Bottom-Left: Engineering Stack */}
        <div className={`${styles.cornerBox} ${styles.bottomLeft}`}>
          <span className={styles.crosshair}>+</span>
          <span className={styles.cornerText}>
            STACK // NEXT.JS 16 · REACT 19 · GSAP
          </span>
        </div>

        {/* Bottom-Right: Latency & Edition */}
        <div className={`${styles.cornerBox} ${styles.bottomRight}`}>
          <span className={styles.cornerText}>EDITION &apos;26 · TLS 1.3</span>
          <span className={styles.crosshair}>+</span>
        </div>
      </div>

      {/* Central Stage: Metadata, Brand & Precision Odometer */}
      <div ref={contentRef} className={styles.contentStage}>
        {/* Top Central Pill Badge */}
        <div className={styles.topMetaRow}>
          <div className={styles.metaBadge}>
            <span className={styles.pulseDot} />
            <span className={styles.metaText}>SYSTEM // INITIALIZING</span>
          </div>
        </div>

        {/* Center Brand Identity with Technical Ring */}
        <div className={styles.centerBrand}>
          <div className={styles.iconRing}>
            <BrandIcon
              size={46}
              circleColor="#fe9f0a"
              semicircleColor="#ffffff"
              className={styles.brandIcon}
            />
          </div>

          <div className={styles.brandTitles}>
            <h1 className={styles.brandName}>SUDHANSHU GHOSH</h1>
            <div className={styles.brandSubtitle}>
              <span>FULL STACK DEVELOPER</span>
              <span className={styles.sep}>·</span>
              <span className={styles.highlight}>AI INTEGRATION</span>
            </div>
          </div>
        </div>

        {/* Bottom Stage: Developer Milestones & Huge Tabular Odometer */}
        <div className={styles.bottomStage}>
          <div className={styles.odometerRow}>
            <div className={styles.statusCol}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.statusLabel} ref={statusRef}>
                01 // COMPILING ASSETS & SYSTEM KERNEL...
              </span>
            </div>

            <div className={styles.counterWrapper}>
              <span className={styles.counterText} ref={counterRef}>
                00%
              </span>
            </div>
          </div>

          {/* Precision illuminated progress bar */}
          <div className={styles.progressBarTrack}>
            <div ref={progressBarRef} className={styles.progressBarFill} />
          </div>
        </div>
      </div>
    </div>
  );
}
