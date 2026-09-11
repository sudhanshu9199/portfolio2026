import React from "react";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import { skillsData } from "@/data/skillsData";
import SkillCard from "./SkillCard";
import styles from "./SkillsProficiency.module.scss";

const SkillsProficiency = () => {
  return (
    <section className={styles.skillsProficiency} id="skills">
      <div className={styles.container}>
        {/* Centered Category Label */}
        <div className={styles.smallLabel}>
          <BrandIcon
            size={34}
            circleColor="#18181b"
            semicircleColor="#fe9f0a"
          />
          <span className={styles.labelText}>My Tech Stack</span>
        </div>

        {/* Centered Main Heading */}
        <h2 className={styles.heading}>
          <span className={styles.accentRow}>
            The Technology
            <LeafAccent className={styles.headingLeaf} color="#18181b" />
          </span>
          <span className={styles.darkRow}>Behind My Builds</span>
        </h2>

        {/* 9-Card Grid (3x3 Layout) */}
        <div className={styles.cardGrid}>
          {skillsData.map((card) => (
            <SkillCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsProficiency;
