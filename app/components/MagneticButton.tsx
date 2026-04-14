"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  as?: "button" | "a";
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  as = "button",
  style,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    onMouseEnter?.(e);
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 15,
    mass: 0.5,
  };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={className}
        style={style}
        animate={{ x: position.x, y: position.y }}
        transition={springTransition}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      className={className}
      style={style}
      animate={{ x: position.x, y: position.y }}
      transition={springTransition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
