import React from "react";

/**
 * BrandIcon Component
 * Reusable 3-shape brand motif (1 circle + 2 semicircles).
 *
 * @param {string} className - Optional CSS class
 * @param {number|string} size - Width of the icon (height calculated from 212:100 aspect ratio)
 * @param {number|string} height - Explicit height override
 * @param {string} circleColor - Fill color of the circle (default: #18181b)
 * @param {string} semicircleColor - Fill color of both semicircles (default: #fe9f0a)
 * @param {object} style - Custom inline styles
 */
const BrandIcon = ({
  className = "",
  size = 36,
  height,
  circleColor = "#18181b",
  semicircleColor = "#fe9f0a",
  style = {},
  ...props
}) => {
  const widthStyle = typeof size === "number" ? `${size}px` : size;
  const heightStyle = height
    ? typeof height === "number"
      ? `${height}px`
      : height
    : "auto";

  return (
    <svg
      viewBox="0 0 212 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: widthStyle,
        height: heightStyle,
        display: "block",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {/* Primary Circle */}
      <circle cx="50" cy="50" r="50" fill={circleColor} />
      {/* First Semicircle */}
      <path d="M 106 0 A 50 50 0 0 1 106 100 Z" fill={semicircleColor} />
      {/* Second Semicircle */}
      <path d="M 162 0 A 50 50 0 0 1 162 100 Z" fill={semicircleColor} />
    </svg>
  );
};

export default BrandIcon;
