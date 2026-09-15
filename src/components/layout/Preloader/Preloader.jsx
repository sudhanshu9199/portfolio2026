"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrandIcon from "@/components/common/BrandIcon";
import styles from "./Preloader.module.scss";

export default function Preloader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);
  const mainCurtainRef = useRef(null);
  const amberCurtainRef = useRef(null);
  const svgPathRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const contentRef = useRef(null);
  const statusRef = useRef(null);

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

    // 2. Counter Animation (00% -> 100%) with dynamic progress bar
    tl.to(countObj, {
      val: 100,
      duration: 1.05,
      ease: "power3.inOut",
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
          if (rounded > 85) {
            statusRef.current.textContent = "INITIALIZATION COMPLETE // ALL SYSTEMS GO";
          } else if (rounded > 45) {
            statusRef.current.textContent = "SYNCHRONIZING ASSETS & MOTION TOKENS...";
          }
        }
      },
    });

    // 3. Stagger Content Exit (Content gracefully slides up and fades out)
    tl.to(
      contentRef.current,
      {
        y: -32,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      },
      "+=0.08"
    );

    // 4. SVG Curve Morph for Physical Curtain Lift
    // Initial: flat bottom -> Morph: upward parabolic arch -> Ending: flat top
    const initialCurve = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z";
    const midCurve = "M 0 0 L 100 0 L 100 80 Q 50 20 0 80 Z";
    const flatEndCurve = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";

    if (svgPathRef.current) {
      tl.to(
        svgPathRef.current,
        {
          attr: { d: midCurve },
          duration: 0.45,
          ease: "power2.in",
        },
        "-=0.1"
      ).to(svgPathRef.current, {
        attr: { d: flatEndCurve },
        duration: 0.35,
        ease: "power3.out",
      });
    }

    // 5. Dual-Layer Curtain Slide Up (Amber blade follows main charcoal curtain)
    tl.to(
      mainCurtainRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: "expo.inOut",
      },
      "<"
    );

    tl.to(
      amberCurtainRef.current,
      {
        yPercent: -100,
        duration: 0.72,
        ease: "expo.inOut",
        onStart: () => {
          // Hand off to page Hero & Navbar precisely as curtain begins unmasking the screen
          window.dispatchEvent(new CustomEvent("portfolio:unmasked"));
          if (onComplete) onComplete();
        },
      },
      "<+=0.06"
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
      {/* Background Secondary Curtain (Amber Rim Layer) */}
      <div ref={amberCurtainRef} className={styles.amberCurtain} />

      {/* Main Foreground Curtain (Deep Charcoal/Espresso) */}
      <div ref={mainCurtainRef} className={styles.mainCurtain}>
        {/* SVG Curved Bottom Lip */}
        <svg
          className={styles.curveSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={svgPathRef}
            d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
            fill="#12100e"
          />
        </svg>

        {/* Central Stage & Typography */}
        <div ref={contentRef} className={styles.contentStage}>
          {/* Top Metadata Header */}
          <div className={styles.metaRow}>
            <div className={styles.metaBadge}>
              <span className={styles.pulseDot} />
              <span className={styles.metaText}>SYSTEM // INITIALIZING</span>
            </div>
            <div className={styles.metaEdition}>
              EDITION &apos;26 · 25.68° N, 85.21° E
            </div>
          </div>

          {/* Center Brand Identity */}
          <div className={styles.centerBrand}>
            <div className={styles.iconRing}>
              <BrandIcon
                size={44}
                circleColor="#fe9f0a"
                semicircleColor="#ffffff"
                className={styles.brandIcon}
              />
            </div>

            <div className={styles.brandTitles}>
              <h1 className={styles.brandName}>
                SUDHANSHU GHOSH
              </h1>
              <div className={styles.brandSubtitle}>
                <span>FULL STACK DEVELOPER</span>
                <span className={styles.sep}>·</span>
                <span className={styles.highlight}>AI INTEGRATION</span>
              </div>
            </div>
          </div>

          {/* Bottom Precision Odometer & Progress Bar */}
          <div className={styles.bottomStage}>
            <div className={styles.odometerRow}>
              <span className={styles.statusLabel} ref={statusRef}>
                CONNECTING TO CREATIVE ENGINE...
              </span>
              <span className={styles.counterText} ref={counterRef}>
                00%
              </span>
            </div>

            <div className={styles.progressBarTrack}>
              <div
                ref={progressBarRef}
                className={styles.progressBarFill}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
