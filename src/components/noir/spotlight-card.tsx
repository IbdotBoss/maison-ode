"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, type Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";

type SpotlightCardProps = {
  title?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  radius?: number;
  className?: string;
  children?: ReactNode;
};

const variationAccent = "0 20px 60px -15px rgba(0,0,0,0.75)";

const springTransition = {
  type: "spring",
  bounce: 0,
  duration: 0.45,
} as const;

function getSpotlightBackground(radius: number, x: number, y: number) {
  return `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(201,169,110,0.18), transparent 40%)`;
}

export function SpotlightCard({
  title,
  description,
  href,
  hrefLabel = "View",
  radius = 180,
  className,
  children,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const [mouseState, setMouseState] = useState<{
    x: number;
    y: number;
    active: number;
  }>({ x: 0, y: 0, active: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerEnter = useCallback(() => {
    mouseRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
    setMouseState((prev) => ({ ...prev, active: 1 }));
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMouseState({ x: 0, y: 0, active: 0 });
  }, []);

  useEffect(() => {
    const tick = () => {
      const { x, y } = mouseRef.current;
      setMouseState((prev) => {
        if (prev.active === 1 && (x !== 0 || y !== 0)) {
          const dx = prev.x - x;
          const dy = prev.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0.18) {
            return { x, y, active: 1 };
          }
        }
        return prev;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spotlightOpacity = mouseState.active ? 1 : 0;
  const background =
    mouseState.x !== 0 || mouseState.y !== 0
      ? getSpotlightBackground(radius, mouseState.x, mouseState.y)
      : undefined;

  const classNames = clsx(
    "group relative rounded-2xl border border-[#111111] bg-[#060606] p-7 text-left",
    `shadow-[${variationAccent}]`,
    className
  );

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="press"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      variants={cardVariants}
      transition={springTransition}
      ref={containerRef}
    >
      <div className={classNames} style={{ "--card-radius": `${radius}px` } as React.CSSProperties}>
        <Spotlight mouseX={mouseState.x} mouseY={mouseState.y} opacity={spotlightOpacity} radius={radius} />

        <div className="relative z-10">
          {title ? (
            <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-xl font-semibold text-[#e8e0d4]">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-[#b8ad9a]">{description}</p>
          ) : null}
          {href ? (
            <a
              href={href}
              aria-label={hrefLabel}
              className="mt-5 inline-flex items-center text-xs font-medium uppercase tracking-widest text-[#c9a96e] transition-colors duration-300 hover:text-[#e3c47d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/60"
            >
              {hrefLabel}
              <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          ) : null}
        </div>

        <div className="relative z-10 mt-0">{children}</div>
      </div>
    </motion.div>
  );
}

type SpotlightProps = {
  mouseX?: number;
  mouseY?: number;
  opacity: number;
  radius: number;
};

function Spotlight({ mouseX, mouseY, opacity, radius }: SpotlightProps) {
  const background =
    mouseX != null && mouseY != null
      ? getSpotlightBackground(radius, mouseX, mouseY)
      : getSpotlightBackground(radius, 50, 50);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      variants={spotlightVariants}
      transition={{ type: "tween", ease: "easeOut", duration: 0.18 }}
      style={{ background, opacity } as React.CSSProperties}
    />
  );
}

const cardVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.012 },
  press: { scale: 0.992 },
};

const spotlightVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export { cn, type ClassValue };

export default SpotlightCard;
