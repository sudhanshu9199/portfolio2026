"use client";

import React, { useState } from "react";
import SkillIcon from "./SkillIcon";
import styles from "./SkillsProficiency.module.scss";

const SkillCard = ({ card }) => {
  const [isTapped, setIsTapped] = useState(false);

  const levelKey = card.level ? `level_${card.level.toLowerCase()}` : "";
  const levelClass = styles[levelKey] || "";

  return (
    <div
      className={`${styles.cardWrapper} ${isTapped ? styles.active : ""}`}
      onClick={() => setIsTapped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsTapped((prev) => !prev);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${card.id} ${card.name} - ${card.level}`}
    >
      <div className={styles.card}>
        <div className={styles.cardInner}>
          {/* Level Badge: fades & slides in at top-right on hover */}
          <div className={`${styles.levelBadge} ${levelClass}`}>
            <span>{card.level}</span>
          </div>

          {/* Circular Logo: starts center-left, glides to top-left and scales down on hover */}
          <div className={styles.logoCircle}>
            <SkillIcon name={card.logoId} size={28} />
          </div>

          {/* Name Pill: starts beside logo in normal state, glides below logo on hover */}
          <div className={styles.namePill}>
            <span className={styles.cardIndex}>{card.id}</span>
            <span className={styles.cardSeparator}>—</span>
            <span className={styles.cardName}>{card.name}</span>
          </div>

          {/* Description Block: fades & slides up below name on hover */}
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>{card.description}</p>
          </div>

          {/* Bottom Accent Line: always present in each card */}
          <div className={styles.bottomLine} />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
