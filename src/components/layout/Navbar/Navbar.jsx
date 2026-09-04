"use client";

import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Portfolio<span>.</span>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
          <li>
            <Link href="#experience">Experience</Link>
          </li>
          <li>
            <Link href="#contact" className={styles.ctaButton}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
