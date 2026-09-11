import React from "react";
import Image from "next/image";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import CapsuleJarPhysics from "./CapsuleJarPhysics";
import styles from "./AboutMeSection.module.scss";

const skillsCapsules = [
  {
    id: "react",
    name: "React",
    theme: "dark",
    rotate: "-12deg",
    top: "58%",
    left: "7%",
    zIndex: 11,
  },
  {
    id: "nextjs",
    name: "Next.js",
    theme: "dark",
    rotate: "-8deg",
    top: "56%",
    left: "58%",
    zIndex: 12,
  },
  {
    id: "nodejs",
    name: "Node.js",
    theme: "orange",
    rotate: "-3deg",
    top: "71%",
    left: "59%",
    zIndex: 9,
  },
  {
    id: "aiml",
    name: "AI / ML",
    theme: "orange",
    rotate: "14deg",
    top: "73%",
    left: "3%",
    zIndex: 9,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    theme: "dark",
    rotate: "-17deg",
    top: "72.5%",
    left: "32%",
    zIndex: 10,
  },
  {
    id: "git",
    name: "Git / GitHub",
    theme: "dark",
    rotate: "-14deg",
    top: "84%",
    left: "60%",
    zIndex: 8,
  },
  {
    id: "fullstack",
    name: "Full Stack",
    theme: "orange",
    rotate: "-1deg",
    top: "87%",
    left: "26%",
    zIndex: 7,
  },
];

const statsData = [
  {
    value: "3+",
    title: "Years",
    subtitle: "Learning & Building",
  },
  {
    value: "10+",
    title: "Technologies",
    subtitle: "Explored",
  },
  {
    value: "5+",
    title: "Projects",
    subtitle: "Built",
  },
  {
    value: "∞",
    title: "Ideas",
    subtitle: "to Build",
  },
];

const AboutMeSection = () => {
  return (
    <section className={styles.aboutMeSection} id="about">
      <div className={styles.container}>
        {/* Top 2-Column Grid */}
        <div className={styles.topGrid}>
          {/* Left Column: Portrait & Floating Skill Capsules */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/aboutMe3.png"
                alt="Sudhanshu - Full Stack & AI Developer"
                width={620}
                height={620}
                priority
                className={styles.portraitImg}
              />

              {/* Interactive Physics "Jar" of Skill Capsules */}
              <CapsuleJarPhysics capsules={skillsCapsules} />
            </div>
          </div>

          {/* Right Column: Bio Content & CTA */}
          <div className={styles.contentCol}>
            {/* Small Label Pill */}
            <div className={styles.smallLabel}>
              <BrandIcon
                size={38}
                circleColor="#ffffff"
                semicircleColor="#fe9f0a"
              />
              <span className={styles.labelText}>About Me</span>
            </div>

            {/* Heading with LeafAccent */}
            <h2 className={styles.heading}>
              Who is{" "}
              <span className={styles.accentName}>
                Sudhanshu Ghosh?
                <LeafAccent className={styles.headingLeaf} />
              </span>
            </h2>

            {/* Bio Paragraph */}
            <p className={styles.bioText}>
              I'm Sudhanshu Ghosh — a Full Stack + AI Developer focused on
              building modern web applications and exploring how AI can make
              digital products smarter and more useful. I enjoy working across
              the frontend, backend and AI integration layers, turning ideas
              into practical products.
            </p>

            {/* CTA & Signature Row */}
            <div className={styles.ctaRow}>
              <a
                href="/resume.pdf"
                download
                className={styles.downloadCvBtn}
                aria-label="Download CV"
              >
                <span className={styles.cvText}>Download CV</span>
                <span className={styles.arrowCircle}>
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
              </a>

              <span className={styles.signatureText}>Sudhanshu</span>
            </div>
          </div>
        </div>

        {/* Bottom Metrics / Stats Row */}
        <div className={styles.statsRow}>
          {statsData.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <div className={styles.statTextGroup}>
                  <span className={styles.statTitle}>{stat.title}</span>
                  <span className={styles.statSubtitle}>{stat.subtitle}</span>
                </div>
              </div>

              {idx < statsData.length - 1 && (
                <div className={styles.statDivider} aria-hidden="true">
                  <div className={styles.dividerLine} />
                  <BrandIcon
                    size={55}
                    circleColor="#ffffff"
                    semicircleColor="#fe9f0a"
                    className={styles.dividerIcon}
                  />
                  <div className={styles.dividerLine} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
