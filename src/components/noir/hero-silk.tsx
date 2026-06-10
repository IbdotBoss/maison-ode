"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";

type HeroSilkProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const DEFAULT_EYEBROW = "The New Collection";
const DEFAULT_TITLE = "Woven in";
const DEFAULT_TITLE_ACCENT = "Silk Shadow";
const DEFAULT_SUBTITLE =
  "Hand-finished silhouettes in noir and bone. Modern heirlooms for the evening ritual.";

const outerWrapper: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.12 },
  },
};

const childReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

function GradientOrb({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute rounded-full blur-[90px] mix-blend-screen",
        "opacity-60",
        className
      )}
    />
  );
}

export function HeroSilk({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  titleAccent = DEFAULT_TITLE_ACCENT,
  subtitle = DEFAULT_SUBTITLE,
  primaryCta,
  secondaryCta,
}: HeroSilkProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: {}, transition: { duration: 0 } }
    : { initial: "hidden", animate: "visible" };

  return (
    <section
      aria-label="Hero"
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-[#060606]"
    >
      {/* Silk motion background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
      >
        <GradientOrb className="h-[520px] w-[520px] -top-24 -left-32 bg-[rgba(201,169,110,0.55)]" />
        <GradientOrb className="h-[640px] w-[640px] top-1/2 -right-48 bg-[rgba(232,224,212,0.32)]" />
        <GradientOrb className="h-[360px] w-[360px] bottom-[-120px] left-[28%] bg-[rgba(227,196,125,0.18)]" />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#060606_62%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,#060606,rgba(6,6,6,0.65),#060606)]"
        />
      </div>

      {/* Content */}
      <motion.div
        {...motionProps}
        variants={outerWrapper}
        className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.p variants={childReveal} className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#c9a96e]">
          {eyebrow}
        </motion.p>

        <motion.div variants={childReveal} className="flex flex-col items-center">
          <h1 className="max-w-4xl font-['Cormorant_Garamond',Georgia,serif] text-5xl font-medium uppercase tracking-wide text-[#060606] sm:text-6xl md:text-7xl">
            <span className="block text-[#b8ad9a]">{title}</span>
            <span className="block text-[#e8e0d4]">{titleAccent}</span>
          </h1>
        </motion.div>

        <motion.p variants={childReveal} className="mt-6 max-w-xl text-base leading-relaxed text-[#b8ad9a]/90 sm:text-lg">
          {subtitle}
        </motion.p>

        <motion.div variants={childReveal} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {primaryCta ? (
            <a
              href={primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#c9a96e]/60 px-7 text-sm font-medium uppercase tracking-widest text-[#e8e0d4] transition-colors duration-300 hover:border-[#e3c47d] hover:text-[#e3c47d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/60"
            >
              {primaryCta.label}
            </a>
          ) : null}
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#b8ad9a]/30 px-7 text-sm font-medium uppercase tracking-widest text-[#b8ad9a] transition-colors duration-300 hover:border-[#b8ad9a] hover:text-[#e8e0d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ad9a]/50"
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </motion.div>
      </motion.div>

      {/* Perforated bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent"
      />
    </section>
  );
}

export default HeroSilk;
