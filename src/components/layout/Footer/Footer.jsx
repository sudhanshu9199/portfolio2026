"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top Vibrant Orange Accent Stripe */}
      <div className={styles.topAccentStripe} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Side: Copyright & Attribution */}
        <div className={styles.copyrightBlock}>
          <span>Copyright © {currentYear} </span>
          <span className={styles.nameHighlight}>Sudhanshu.</span>
          <span> All Rights Reserved.</span>
        </div>

        {/* Right Side: Legal & Policy Links */}
        <div className={styles.linksBlock}>
          <Link href="#terms" className={styles.footerLink}>
            User Terms & Conditions
          </Link>
          <span className={styles.divider} aria-hidden="true">
            |
          </span>
          <Link href="#privacy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <span className={styles.divider} aria-hidden="true">
            |
          </span>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            title="LLM Context & AI Agent Documentation"
          >
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
