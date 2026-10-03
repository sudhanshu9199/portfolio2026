"use client";

import React, { useState } from "react";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import { faqData } from "@/data/seoData";
import styles from "./FAQSection.module.scss";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      className={styles.faqSection}
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-labelledby="faqHeading"
    >
      <div className={styles.container}>
        {/* Category Label Pill */}
        <div className={styles.smallLabel}>
          <BrandIcon
            size={34}
            circleColor="#18181b"
            semicircleColor="#fe9f0a"
          />
          <span className={styles.labelText}>Direct Answers & Insights</span>
        </div>

        {/* Section Heading */}
        <h2 className={styles.heading} id="faqHeading">
          <span className={styles.accentRow}>
            Frequently Asked
            <LeafAccent className={styles.headingLeaf} color="#fe9f0a" />
          </span>
          <span className={styles.darkRow}>Questions & Engineering Bio</span>
        </h2>

        <p className={styles.subtitle}>
          Direct answers to key inquiries regarding my full-stack engineering,
          real-time AI integrations, and availability for high-impact roles.
        </p>

        {/* Accordion List */}
        <div className={styles.accordionList}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ""}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className={styles.questionIndex}>
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className={styles.questionText} itemProp="name">
                    {item.question}
                  </span>
                  <span className={styles.iconWrapper} aria-hidden="true">
                    <svg
                      className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`${styles.answerContainer} ${isOpen ? styles.answerVisible : ""}`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className={styles.answerContent}>
                    <p className={styles.answerText} itemProp="text">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
