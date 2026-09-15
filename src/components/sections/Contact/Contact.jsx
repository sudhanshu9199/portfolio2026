"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BrandIcon from "@/components/common/BrandIcon";
import LeafAccent from "@/components/common/LeafAccent";
import styles from "./Contact.module.scss";

const Contact = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const formColRef = useRef(null);
  const cardsColRef = useRef(null);
  const leafRef = useRef(null);
  const successBoxRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    subject: "",
    message: "",
    _honeypot: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [serverError, setServerError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const emailAddress = "shudhanshukumar9713@gmail.com";

  // GSAP 2026 Scroll Entrance
  const { contextSafe } = useGSAP(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
              });

              // 1. Label Reveal
              if (labelRef.current) {
                tl.fromTo(
                  labelRef.current,
                  { y: -18, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.7 },
                );
              }

              // 2. Heading Reveal
              if (headingRef.current) {
                const lines = headingRef.current.querySelectorAll(
                  `.${styles.headingLine}`,
                );
                tl.fromTo(
                  lines,
                  { y: 35, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 },
                  "-=0.4",
                );
              }

              // 3. Leaf spring bounce
              if (leafRef.current) {
                tl.fromTo(
                  leafRef.current,
                  { scale: 0, rotate: -25, opacity: 0 },
                  {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(2)",
                  },
                  "-=0.5",
                );
              }

              // 4. Form and Cards Entrance
              if (formColRef.current && cardsColRef.current) {
                tl.fromTo(
                  formColRef.current,
                  { y: 40, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.85 },
                  "-=0.3",
                );
                tl.fromTo(
                  cardsColRef.current,
                  { x: 35, opacity: 0 },
                  { y: 0, x: 0, opacity: 1, duration: 0.85 },
                  "-=0.6",
                );
              }

              observer.disconnect();
            }
          });
        },
        { threshold: 0.12 },
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    },
    { scope: sectionRef },
  );

  // Interactive Leaf Burst on hover
  const handleLeafHover = contextSafe(() => {
    if (!leafRef.current) return;
    gsap.to(leafRef.current, {
      rotate: 15,
      scale: 1.25,
      duration: 0.25,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  // Client-Side Validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (value.trim().length < 2)
        error = "Name must be at least 2 characters";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value.trim()))
        error = "Please enter a valid email address";
    }
    if (name === "topic") {
      if (!value) error = "Please select a topic";
    }
    if (name === "message") {
      if (!value.trim()) error = "Message is required";
      else if (value.trim().length < 10)
        error = "Message must be at least 10 characters";
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Full-Stack Form Submission Flow
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate all fields
    const currentErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      topic: validateField("topic", formData.topic),
      message: validateField("message", formData.message),
    };

    setErrors(currentErrors);
    setTouched({
      name: true,
      email: true,
      topic: true,
      message: true,
    });

    const hasErrors = Object.values(currentErrors).some((err) => err);
    if (hasErrors) return;

    // 2. Transition to submitting state
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          topic: "",
          subject: "",
          message: "",
          _honeypot: "",
        });
        setTouched({});
        setErrors({});

        // GSAP celebration fade-in for success box
        if (successBoxRef.current) {
          gsap.fromTo(
            successBoxRef.current,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" },
          );
        }
      } else {
        setStatus("error");
        setServerError(
          data.error ||
            "Something went wrong while sending your message. Please try again or email directly.",
        );
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
      setServerError(
        "Network connection error. Please try again or email directly to shudhanshukumar9713@gmail.com.",
      );
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setServerError("");
  };

  return (
    <section className={styles.contactSection} id="contact" ref={sectionRef}>
      <div className={styles.container}>
        {/* Top Centered Header */}
        <div className={styles.topHeader}>
          {/* Small Category Label: "Let's Connect" */}
          <div className={styles.smallLabel} ref={labelRef}>
            <BrandIcon
              size={34}
              circleColor="#18181b"
              semicircleColor="#fe9f0a"
              className={styles.brandIcon}
            />
            <span className={styles.labelText}>Let&apos;s Connect</span>
          </div>

          {/* Main Centered Heading: "Let's Talk About What We Can Build" */}
          <h2 className={styles.heading} ref={headingRef}>
            <div className={styles.headingLine}>
              <span className={styles.orangeText}>Let&apos;s Talk About</span>
              <span
                className={styles.leafWrapper}
                ref={leafRef}
                onMouseEnter={handleLeafHover}
              >
                <LeafAccent
                  size="0.52em"
                  className={styles.headingLeaf}
                  color="#18181b"
                />
              </span>
            </div>
            <div className={styles.headingLine}>
              <span className={styles.darkText}>What We Can Build</span>
            </div>
          </h2>
        </div>

        {/* 2-Column Grid: Left Form with Direct Email, Right Info & Social Cards */}
        <div className={styles.contactGrid}>
          {/* Left Column: Direct Recruiter Email + Interactive Contact Form */}
          <div className={styles.formCol} ref={formColRef}>
            {/* Direct Email Fast-Action Bar (Recruiter Friendly) */}
            <div className={styles.directEmailBar}>
              <div className={styles.directEmailLeft}>
                <span className={styles.emailPulseDot} aria-hidden="true" />
                <span className={styles.directEmailLabel}>Direct Email:</span>
                <a
                  href={`mailto:${emailAddress}`}
                  className={styles.directEmailLink}
                >
                  {emailAddress}
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`${styles.copyEmailBtn} ${
                  isCopied ? styles.copied : ""
                }`}
                aria-label="Copy email address"
              >
                {isCopied ? (
                  <>
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg
                      className={styles.copyIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy email ↗</span>
                  </>
                )}
              </button>
            </div>

            {/* Success State Screen */}
            {status === "success" ? (
              <div
                className={styles.successStateContainer}
                ref={successBoxRef}
                role="alert"
              >
                <div className={styles.successIconCircle}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successMessage}>
                  Message sent! Thanks for reaching out. I&apos;ll get back to
                  you soon.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className={styles.sendAnotherBtn}
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot field (hidden from sighted users, traps bots) */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* Server Error Alert */}
                {status === "error" && (
                  <div className={styles.errorBanner} role="alert">
                    <svg
                      className={styles.errorIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Row 1: Your Name * & Email * */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="name" className={styles.fieldLabel}>
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "submitting"}
                      placeholder="Enter your name"
                      className={`${styles.inputField} ${
                        touched.name && errors.name ? styles.fieldError : ""
                      }`}
                    />
                    {touched.name && errors.name && (
                      <span className={styles.fieldErrorText}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email" className={styles.fieldLabel}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "submitting"}
                      placeholder="you@example.com"
                      className={`${styles.inputField} ${
                        touched.email && errors.email ? styles.fieldError : ""
                      }`}
                    />
                    {touched.email && errors.email && (
                      <span className={styles.fieldErrorText}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: I'm reaching out about * (Dropdown) */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="topic" className={styles.fieldLabel}>
                    I&apos;m reaching out about *
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "submitting"}
                      className={`${styles.selectField} ${
                        touched.topic && errors.topic ? styles.fieldError : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select a topic...
                      </option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Project">Project</option>
                      <option value="Freelance Work">Freelance Work</option>
                      <option value="Other">Other</option>
                    </select>
                    <svg
                      className={styles.selectChevron}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {touched.topic && errors.topic && (
                    <span className={styles.fieldErrorText}>
                      {errors.topic}
                    </span>
                  )}
                </div>

                {/* Row 3: Subject (Optional / Descriptive) */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="subject" className={styles.fieldLabel}>
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    placeholder="What's this about?"
                    className={styles.inputField}
                  />
                </div>

                {/* Row 4: Message * */}
                <div className={styles.fieldGroup}>
                  <div className={styles.messageLabelRow}>
                    <label htmlFor="message" className={styles.fieldLabel}>
                      Message *
                    </label>
                    <span className={styles.charCount}>
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={status === "submitting"}
                    placeholder="Tell me a little about what you're working on..."
                    className={`${styles.textareaField} ${
                      touched.message && errors.message ? styles.fieldError : ""
                    }`}
                  />
                  {touched.message && errors.message && (
                    <span className={styles.fieldErrorText}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button: Send Message → */}
                <div className={styles.submitRow}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`${styles.submitBtn} ${
                      status === "submitting" ? styles.loading : ""
                    }`}
                  >
                    {status === "submitting" ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          className={styles.submitArrow}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Tailored Professional Info Card + Find Me Online Card */}
          <div className={styles.cardsCol} ref={cardsColRef}>
            {/* Top Dark Info Card: Cyber Chamfered Tech Polygon */}
            <div className={styles.infoCard}>
              {/* Header Title */}
              <div className={styles.infoCardHeader}>
                <h3 className={styles.cardMainHeading}>Let&apos;s Connect</h3>
              </div>

              {/* Based in */}
              <div className={styles.infoGroup}>
                <div className={styles.infoHeadingRow}>
                  <span className={styles.infoIcon} aria-hidden="true">
                    📍
                  </span>
                  <h4 className={styles.infoTitle}>Based in</h4>
                </div>
                <p className={styles.infoText}>Hajipur, Bihar, India</p>
              </div>

              {/* Focus */}
              <div className={styles.infoGroup}>
                <div className={styles.infoHeadingRow}>
                  <span className={styles.infoIcon} aria-hidden="true">
                    💻
                  </span>
                  <h4 className={styles.infoTitle}>Focus</h4>
                </div>
                <p className={styles.infoText}>
                  Full Stack Development
                  <br />
                  AI Integration
                </p>
              </div>

              {/* Email */}
              <div className={styles.infoGroup}>
                <div className={styles.infoHeadingRow}>
                  <span className={styles.infoIcon} aria-hidden="true">
                    ✉️
                  </span>
                  <h4 className={styles.infoTitle}>Email</h4>
                </div>
                <a
                  href={`mailto:${emailAddress}`}
                  className={styles.infoEmailLink}
                >
                  {emailAddress}
                </a>
              </div>

              {/* Open to */}
              <div className={styles.infoGroup}>
                <div className={styles.infoHeadingRow}>
                  <span className={styles.infoIcon} aria-hidden="true">
                    🌎
                  </span>
                  <h4 className={styles.infoTitle}>Open to</h4>
                </div>
                <p className={styles.infoTextOpenTo}>
                  IT opportunities · collaborations · projects
                </p>
              </div>
            </div>

            {/* Bottom Vibrant Orange Card: "Find Me Online" */}
            <div className={styles.socialCard}>
              <h4 className={styles.socialTitle}>Find Me Online</h4>

              <div className={styles.socialRow}>
                {/* GitHub */}
                <a
                  href="https://github.com/sudhanshu9199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPillBtn}
                  aria-label="GitHub"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span className={styles.socialPillText}>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/sudhanshu9199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPillBtn}
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
                  <span className={styles.socialPillText}>LinkedIn</span>
                </a>

                {/* Threads */}
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPillBtn}
                  aria-label="Threads"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.001 0C5.372 0 0 5.373 0 12c0 6.626 5.372 12 12.001 12 6.627 0 11.999-5.374 11.999-12 0-6.627-5.372-12-11.999-12zm4.846 14.868c-.378.895-1.025 1.574-1.874 1.966-.848.39-1.84.453-2.868.178-1.503-.404-2.617-1.583-2.909-3.078-.291-1.495.275-3.003 1.474-3.935.932-.725 2.127-.999 3.284-.753.864.184 1.624.629 2.138 1.251l-1.391 1.054c-.313-.377-.768-.646-1.289-.757-.698-.148-1.42.016-1.98.452-.721.56-1.061 1.467-.887 2.365.176.897.844 1.606 1.745 1.849.615.166 1.21.127 1.72-.109.508-.235.897-.643 1.124-1.18.337-.796.347-1.748.028-2.61l1.644-.614c.489 1.319.475 2.772-.039 3.97z" />
                  </svg>
                  <span className={styles.socialPillText}>Threads</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
