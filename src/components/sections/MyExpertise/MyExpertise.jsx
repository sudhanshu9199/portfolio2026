"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import { expertiseData } from "@/data/expertiseData";
import ExpertiseCard from "./ExpertiseCard";
import styles from "./MyExpertise.module.scss";

const MyExpertise = () => {
  // Card 01 is default expanded as requested
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleToggleCard = (index) => {
    setActiveCardIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.MyExpertise} id="skills">
      <div className={styles.smallLabel}>
        <BrandIcon size={44} circleColor="#18181b" semicircleColor="#fe9f0a" />
        <p className={styles.label}>My expertise</p>
      </div>

      <div className={styles.headerRow}>
        <h2 className={styles.mainHeading}>
          How I build{" "}
          <span className={styles.accentText}>
            digital products
            <LeafAccent className={styles.headingLeaf} />
          </span>
        </h2>

        <Link href="#projects" className={styles.exploreBtn}>
          <span className={styles.exploreText}>Explore My Work</span>
          <span className={styles.exploreArrowCircle}>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>

      <div className={styles.cardsWrapper}>
        {expertiseData.map((card, idx) => (
          <ExpertiseCard
            key={card.id}
            card={card}
            isActive={activeCardIndex === idx}
            onToggle={() => handleToggleCard(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyExpertise;
