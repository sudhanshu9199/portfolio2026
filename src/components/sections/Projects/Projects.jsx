"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import { projectsData } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.scss";

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const btnRef = useRef(null);
  const arrowIconRef = useRef(null);
  const arrowDiscRef = useRef(null);
  const leafRef = useRef(null);
  const cardsListRef = useRef(null);

  // GSAP 2026 Entrance & Micro-interactions
  const { contextSafe } = useGSAP(
    () => {
      // Intersection Observer for viewport trigger
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
              });

              // 1. Label Reveal
              if (labelRef.current) {
                tl.fromTo(
                  labelRef.current,
                  { y: -18, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.7 }
                );
              }

              // 2. Heading Stagger Reveal
              if (headingRef.current) {
                const lines = headingRef.current.querySelectorAll(
                  `.${styles.headingLine}`
                );
                tl.fromTo(
                  lines,
                  { y: 35, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 },
                  "-=0.4"
                );
              }

              // 3. Leaf spring bounce
              if (leafRef.current) {
                tl.fromTo(
                  leafRef.current,
                  { scale: 0, rotate: -25, opacity: 0 },
                  {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(2)",
                  },
                  "-=0.5"
                );
              }

              // 4. CTA Button Entrance
              if (ctaRef.current) {
                tl.fromTo(
                  ctaRef.current,
                  { x: 30, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                  "-=0.6"
                );
              }

              // 5. Stagger Cards Entrance
              if (cardsListRef.current) {
                const cards = cardsListRef.current.querySelectorAll(
                  `.${styles.projectCardWrapper}`
                );
                tl.fromTo(
                  cards,
                  { y: 50, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.22,
                    ease: "power3.out",
                  },
                  "-=0.3"
                );
              }

              observer.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );

  // 2026 Magnetic CTA Physics
  const handleMouseMove = contextSafe((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle magnetic attraction
    gsap.to(btnRef.current, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.35,
      ease: "power2.out",
    });

    if (arrowIconRef.current) {
      gsap.to(arrowIconRef.current, {
        x: 4,
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (arrowDiscRef.current) {
      gsap.to(arrowDiscRef.current, {
        scale: 1.06,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: "elastic.out(1.1, 0.4)",
    });

    if (arrowIconRef.current) {
      gsap.to(arrowIconRef.current, {
        x: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (arrowDiscRef.current) {
      gsap.to(arrowDiscRef.current, {
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  });

  // Interactive Leaf Burst on hover
  const handleLeafHover = contextSafe(() => {
    if (!leafRef.current) return;
    gsap.to(leafRef.current, {
      rotate: 15,
      scale: 1.25,
      duration: 0.25,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  });

  return (
    <section className={styles.projectsSection} id="projects" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Header Row */}
        <div className={styles.topHeader} ref={headerRef}>
          {/* Left Column: Category Label + Main Heading */}
          <div className={styles.headerLeft}>
            {/* Small Brand Label: "Featured Projects" */}
            <div className={styles.smallLabel} ref={labelRef}>
              <BrandIcon
                size={34}
                circleColor="#ffffff"
                semicircleColor="#fe9f0a"
                className={styles.brandIcon}
              />
              <span className={styles.labelText}>Featured Projects</span>
            </div>

            {/* Main Heading: "Things I've Built" with "Built" in orange */}
            <h2 className={styles.heading} ref={headingRef}>
              <div className={styles.headingLine}>
                <span className={styles.whiteText}>Things I’ve </span>
                <span
                  className={styles.accentWord}
                  onMouseEnter={handleLeafHover}
                >
                  <span className={styles.accentText}>Built</span>
                  <span ref={leafRef} className={styles.leafWrapper}>
                    <LeafAccent
                      size="0.52em"
                      className={styles.headingLeaf}
                      color="#ffffff"
                    />
                  </span>
                </span>
              </div>
            </h2>
          </div>

          {/* Right Column: 2026 Trendy Magnetic CTA Button */}
          <div className={styles.headerRight} ref={ctaRef}>
            <a
              href="#all-projects"
              className={styles.viewAllBtn}
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              aria-label="View All Projects"
            >
              {/* Inner Dark Pill Container with "View All Projects" */}
              <div className={styles.btnContent}>
                <span className={styles.btnText}>View All Projects</span>
                <span className={styles.shimmerEffect} aria-hidden="true" />
              </div>

              {/* White Circular Arrow Disc resting on the Orange Capsule */}
              <div className={styles.arrowCircle} ref={arrowDiscRef}>
                <svg
                  ref={arrowIconRef}
                  className={styles.arrowIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#14100c"
                  strokeWidth="2.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* 3 Project Cards with Alternating Order & Outer Chamfered Tech Design */}
        <div className={styles.projectsList} ref={cardsListRef}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
