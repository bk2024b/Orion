"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds — use idx * 0.08 in a .map() to stagger a grid/list. */
  delay?: number;
  /** Initial vertical offset in px before the element settles into place. */
  y?: number;
  duration?: number;
  className?: string;
}

/**
 * Fades and slides children into place once they scroll into view.
 * `viewport={{ once: true }}` means it never re-triggers on re-scroll,
 * and elements already on screen at page load (the hero) animate in
 * immediately since useInView reports them as visible on mount.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
