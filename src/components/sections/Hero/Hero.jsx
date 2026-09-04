"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(
    () => {
      // Clean entrance animation
      gsap.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: heroRef },
  );

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div className={styles.stickyContent}>
        <div ref={headlineRef} className={styles.headlineWrapper}>
          <span className={styles.tagline}>Creative Developer & Designer</span>
          <h1 className={styles.title}>
            Crafting Digital <br />
            <span>Experiences</span>
          </h1>
          <p className={styles.subtext}>
            Scroll down to explore work, interactions, and design experiments.
          </p>
        </div>
      </div>
    </section>
  );
}
