import React from "react";
import styles from "./LeafAccent.module.scss";

/**
 * LeafAccent Component
 * Reusable 3-petal leaf burst accent motif used across headings and sections.
 *
 * @param {string} className - Additional CSS classes
 * @param {number|string} size - Size/width of the accent (defaults to 1em for typographic scaling)
 * @param {string} color - Fill color of the leaves (defaults to currentColor)
 * @param {object} style - Custom inline styles
 */
const LeafAccent = ({
  className = "",
  size,
  color = "currentColor",
  style = {},
  ...props
}) => {
  const inlineStyles = {
    ...(size !== undefined
      ? { width: typeof size === "number" ? `${size}px` : size, height: "auto" }
      : {}),
    ...style,
  };

  return (
    <svg
      viewBox="0 0 34 44"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.leafAccent} ${className}`.trim()}
      style={inlineStyles}
      aria-hidden="true"
      {...props}
    >
      {/* Top Petal (nearly vertical, slight clockwise tilt) */}
      <ellipse cx="5" cy="11" rx="4.5" ry="10.4" transform="rotate(5 5 11)" />
      {/* Middle Petal (radiating up-right) */}
      <ellipse
        cx="20.7"
        cy="18.6"
        rx="10.5"
        ry="4.5"
        transform="rotate(-33.5 20.7 18.6)"
      />
      {/* Bottom Petal (radiating down-right) */}
      <ellipse
        cx="22.4"
        cy="37.4"
        rx="10.3"
        ry="4.4"
        transform="rotate(26.2 22.4 37.4)"
      />
    </svg>
  );
};

export default LeafAccent;
