"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads Motion's small DOM feature set once. Use `m.*` components (from
 * "motion/react-m"), not `motion.*`, so the full bundle never ships.
 * reducedMotion="user" honours the OS setting for every animation.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
