"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const badgeRef = useRef(null);
  const arrowRef = useRef(null);
  const isArrowAnimating = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
        });
      }

      if (headlineRef.current) {
        tl.from(
          headlineRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.4",
        );
      }
    },
    { scope: heroRef },
  );

  const handleArrowHover = contextSafe(() => {
    if (isArrowAnimating.current || !arrowRef.current) return;
    isArrowAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isArrowAnimating.current = false;
      },
    });

    // 1. Move right across center orange bg with car acceleration ease (power2.in)
    // Hidden as it crosses the orange bg edge due to overflow: hidden
    tl.to(arrowRef.current, {
      x: 38,
      duration: 0.22,
      ease: "power2.in",
    })
      // 2. Instantly teleport to left side outside orange bg
      .set(arrowRef.current, {
        x: -38,
      })
      // 3. Enter from left side and decelerate smoothly into same center position (power3.out)
      .to(arrowRef.current, {
        x: 0,
        duration: 0.32,
        ease: "power3.out",
      });
  });

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div className={styles.heroContentWrapper}>
        {/* Top Badge */}
        <div ref={badgeRef} className={styles.topBadge}>
          <div className={styles.badgeIcon}>
            <Image
              src="/assets/devBadge.webp"
              alt="Developer badge"
              width={38}
              height={38}
              priority
              className={styles.logoImg}
            />
          </div>
          <p>AI & Full Stack Developer</p>
        </div>

        {/* Main Hero Row: Headline + Scalloped Circle Badge */}
        <div ref={headlineRef} className={styles.heroMainRow}>
          <div className={styles.heroTextCol}>
            <h1 className={styles.heroTitle}>
              {"I'm "}
              <span className={styles.nameHighlight}>
                Sudhanshu Ghosh
                {/* 3-Petal Leaf Accent */}
                <span className={styles.leafIcon} aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Top Petal: nearly vertical oval */}
                    <ellipse
                      cx="5.5"
                      cy="5.5"
                      rx="2.3"
                      ry="5"
                      transform="rotate(-15 5.5 5.5)"
                    />
                    {/* Middle Petal: diagonal oval pointing up-right */}
                    <ellipse
                      cx="13.5"
                      cy="10.5"
                      rx="5.2"
                      ry="2.3"
                      transform="rotate(-28 13.5 10.5)"
                    />
                    {/* Bottom Petal: diagonal oval pointing down-right */}
                    <ellipse
                      cx="15.5"
                      cy="18"
                      rx="5.4"
                      ry="2.4"
                      transform="rotate(22 15.5 18)"
                    />
                  </svg>
                </span>
              </span>
            </h1>
            <p className={styles.jobTitle}>
              Full Stack Developer based in India
            </p>
          </div>

          {/* Scalloped Circle Badge (Visible on Desktop/Laptop, Hidden on Mobile) */}
          <div className={styles.scallopedBadgeWrapper}>
            <div className={styles.scallopedBadge}>
              {/* Scalloped Circle Base Graphic */}
              <Image
                src="/assets/Scalloped_circle.png"
                alt="Hire Me Scalloped Badge"
                width={154}
                height={154}
                priority
                className={styles.scallopedImg}
              />

              {/* Circular Curved SVG Text */}
              <svg className={styles.circularTextSvg} viewBox="0 0 160 160">
                <path
                  id="hireMeCirclePath"
                  d="M 80, 80 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  fill="none"
                />
                <text className={styles.circleText}>
                  <textPath
                    href="#hireMeCirclePath"
                    textLength="282"
                    lengthAdjust="spacing"
                  >
                    HIRE ME <tspan className={styles.dot}>●</tspan> HIRE ME{" "}
                    <tspan className={styles.dot}>●</tspan>
                  </textPath>
                </text>
              </svg>

              {/* Center Orange Action Circle with Right Arrow */}
              <Link
                href="#contact"
                className={styles.centerArrowBtn}
                aria-label="Hire Me"
                onMouseEnter={handleArrowHover}
              >
                <svg
                  ref={arrowRef}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3.2"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  className={styles.arrowIcon}
                >
                  <path d="M 1 12 H 22.5" />
                  <path d="M 13.6 2.6 C 13.0 6.8, 14.6 10.5, 21 12 C 14.6 13.5, 13.0 17.2, 13.6 21.4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hero2Wrapper}>
        <div className={styles.firstLayer}>
          <Image
            src="/assets/own_try2.png"
            alt="Hero visual"
            width={808}
            height={808}
            className={styles.img}
          />
        </div>
        <div className={styles.secondLayer}>
          {/* Left Column: Socials & Projects Cell */}
          <div className={styles.leftCol}>
            <div className={styles.upper}>
              <p className={styles.followText}>Follow Me On</p>
              <div className={styles.socialMediaIcons}>
                {/* GitHub */}
                <a
                  href="https://github.com/sudhanshu9199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="GitHub"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/sudhanshu-ghosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>

                {/* Threads */}
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="Threads"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Lower Section: Projects & Experiments Highlight Card */}
            <div className={styles.lower}>
              <div className={styles.projectCard}>
                {/* Visual Stack of Category Badges */}
                <div className={styles.avatarStack} aria-hidden="true">
                  <span className={styles.stackItem} title="React & Frontend">
                    ⚛
                  </span>
                  <span className={styles.stackItem} title="AI & Intelligence">
                    ✦
                  </span>
                  <span className={styles.stackItem} title="Full Stack">
                    ⚡
                  </span>
                  <span className={styles.stackItem} title="Web & Cloud">
                    🌐
                  </span>
                </div>
                <h3 className={styles.projectHeading}>
                  <span className={styles.orangeAccent}>Projects &amp;</span>{" "}
                  Experiments
                </h3>
                <p className={styles.projectSubtext}>
                  Full Stack • AI • Web Development
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column: Center Floating Buttons */}
          <div className={styles.middleCol}>
            <div className={styles.buttonsWrapper}>
              <Link href="#projects" className={styles.portfolioBtn}>
                <span>Portfolio</span>
                <div className={styles.arrowCircle}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4.2"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                  >
                    <path d="M 1 12 H 22.5" />
                    <path d="M 13.6 2.6 C 13.0 6.8, 14.6 10.5, 21 12 C 14.6 13.5, 13.0 17.2, 13.6 21.4" />
                  </svg>
                </div>
              </Link>
              <Link href="#contact" className={styles.hireMeBtn}>
                <span>Hire Me</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Quote & Technology Pills */}
          <div className={styles.rightCol}>
            <div className={styles.quoteWrapper}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <p className={styles.quoteText}>
                Creative mind. Technical builder. Turning ideas into intelligent
                digital experiences.
              </p>
            </div>

            <div className={styles.skillsWrapper}>
              <span className={`${styles.skillPill} ${styles.pillDark}`}>
                React
              </span>
              <span className={`${styles.skillPill} ${styles.pillOrange}`}>
                Next.js
              </span>
              <span className={styles.sparkleBadge} aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </span>
              <span className={`${styles.skillPill} ${styles.pillDark}`}>
                Node.js
              </span>
              <span className={`${styles.skillPill} ${styles.pillOrange}`}>
                MongoDB
              </span>
              <span className={`${styles.skillPill} ${styles.pillDark}`}>
                Redux Toolkit
              </span>
              <span className={`${styles.skillPill} ${styles.pillOrange}`}>
                AI / ML
              </span>
              <span className={`${styles.skillPill} ${styles.pillDark}`}>
                Git / GitHub
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
