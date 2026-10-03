"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Left: Name & Logo */}
        <Link href="/" className={styles.name} onClick={() => setIsOpen(false)}>
          <Image
            src="/assets/pageLogo.png"
            alt="Sudhanshu logo"
            width={58}
            height={58}
            priority
            className={styles.logoImg}
          />
          <span>Sudhanshu</span>
          <span className={styles.dot}>.</span>
        </Link>

        {/* Center: Desktop Navigation Links (Home to Blog) */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#skills">Skills</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
        </ul>

        {/* Right: Desktop Let's Talk CTA */}
        <div className={styles.ctaWrapper}>
          <Link href="#contact" className={styles.ctaButton}>
            {"Let's Talk"}
          </Link>
        </div>

        {/* Mobile: Yellow 3-Line Menu Button */}
        <button
          type="button"
          className={`${styles.menuButton} ${isOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className={styles.linesWrapper}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={`${styles.line} ${styles.lineSmall}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li>
              <Link href="#home" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="#skills" onClick={() => setIsOpen(false)}>
                Skills
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={() => setIsOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link href="#faq" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
            </li>
            <li className={styles.mobileCtaItem}>
              <Link
                href="#contact"
                className={styles.ctaButton}
                onClick={() => setIsOpen(false)}
              >
                {"Let's Talk"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
