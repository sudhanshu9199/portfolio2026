"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Projects.module.scss";

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const outerRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  // Subtle, ultra-smooth 3D depth tilt on Card (Refined & Non-distracting)
  const handleCardMouseMove = contextSafe((e) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Gentle 2.5-degree maximum inclination for a luxurious subtle feel
    const rotX = -(y / (rect.height / 2)) * 2.5;
    const rotY = (x / (rect.width / 2)) * 2.5;

    gsap.to(outerRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.45,
      ease: "power2.out",
      transformPerspective: 1400,
    });
  });

  const handleCardMouseLeave = contextSafe(() => {
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  const layoutClass =
    project.layout === "content-left"
      ? styles.layoutContentLeft
      : styles.layoutShowcaseLeft;

  const notchClass =
    project.notchPosition === "left"
      ? styles.notchLeft
      : styles.notchRight;

  return (
    <article
      className={`${styles.projectCardWrapper} ${layoutClass} ${notchClass}`}
      ref={cardRef}
    >
      <div
        className={styles.cardOuter}
        ref={outerRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className={styles.cardInner}>
          {/* Showcase Column: Multi-screen mockups */}
          <div className={styles.showcaseColumn}>
            <div className={styles.imageFrame}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 680px"
                className={styles.projectImage}
                priority={index === 0}
              />
              <div className={styles.imageVignette} aria-hidden="true" />
            </div>
          </div>

          {/* Content Column: Tags, Title, Description, Stack, Contribution, CTAs */}
          <div className={styles.contentColumn}>
            {/* Category Tags */}
            <div className={styles.tagList}>
              {project.tags.map((tag, i) => (
                <span key={i} className={styles.tagBadge}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Project Title */}
            <h3 className={styles.projectTitle}>{project.title}</h3>

            {/* Description */}
            <p className={styles.projectDescription}>{project.description}</p>

            {/* Technology Row */}
            <div className={styles.techRow}>
              <span className={styles.techLabel}>Tech Stack:</span>
              <div className={styles.techList}>
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={i}>
                    <span className={styles.techItem}>{tech}</span>
                    {i < project.technologies.length - 1 && (
                      <span className={styles.techDot} aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Contribution / Role Row */}
            <div className={styles.contributionRow}>
              <span className={styles.contributionLabel}>Contribution:</span>
              <span className={styles.contributionValue}>
                {project.contribution}
              </span>
            </div>

            {/* Action Buttons: Live Demo ↗ & GitHub ↗ (Rock-Solid Premium Feel) */}
            <div className={styles.btnRow}>
              {/* Primary: Live Demo */}
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
                aria-label={`Live Demo of ${project.title}`}
              >
                <span className={styles.btnText}>Live Demo</span>
                <svg
                  className={styles.btnArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              {/* Secondary: GitHub */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
                aria-label={`GitHub Repository for ${project.title}`}
              >
                <span className={styles.btnText}>GitHub</span>
                <svg
                  className={styles.btnArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
