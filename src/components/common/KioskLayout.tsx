import type { ReactNode } from "react";
import leafBackground from "../../assets/leaf-background.png";

interface KioskLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function KioskLayout({
  children,
  className = "",
}: KioskLayoutProps) {
  return (
    <div
      className={`relative min-h-screen bg-[#F7F3E9] text-[#173F35] ${className}`}
    >
      {/* ================================================================ */}
      {/* LEAF BACKGROUND                                                   */}
      {/* ================================================================ */}

      <img
        src={leafBackground}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-30
          h-screen
          w-screen
          object-cover
          opacity-50
          mix-blend-multiply
        "
      />

      {/* ================================================================ */}
      {/* PAGE CONTENT                                                       */}
      {/* ================================================================ */}

      <div className="relative z-40">
        {children}
      </div>
    </div>
  );
}