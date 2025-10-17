import React from "react";
import "../CSS/AnimatedGridBackground.css";

/**
 * Pure-CSS, GPU-accelerated infinite drifting grid.
 * - Crisp 1px white lines (both directions)
 * - Subtle glow & pulse
 * - Dots aligned to the grid, softly pulsing with staggered phases
 * - No DOM loops, no performance hit on large screens
 */
const AnimatedGridBackground = () => {
  return <div className="vedapixel-grid-bg" aria-hidden="true" />;
};

export default AnimatedGridBackground;
