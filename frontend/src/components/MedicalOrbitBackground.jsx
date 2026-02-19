"use client";

import { motion } from "framer-motion";

const ORBITS = [
  {
    radius: 160,
    duration: 18,
    icons: ["/images/heart-pulse.svg"],
  },
  {
    radius: 260,
    duration: 24,
    icons: ["/images/stethoscope.svg", "/images/activity.svg"],
  },
  {
    radius: 360,
    duration: 30,
    icons: ["/images/cross.svg", "/images/pill.svg"],
  },
];

export default function MedicalOrbitBackground() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      {ORBITS.map((orbit, orbitIndex) => (
        <motion.div
          key={orbitIndex}
          className="absolute rounded-full"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: orbit.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {orbit.icons.map((src, iconIndex) => {
            const angle = (360 / orbit.icons.length) * iconIndex;

            return (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute w-14 h-14 opacity-90"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `
                    rotate(${angle}deg)
                    translate(${orbit.radius}px)
                    rotate(-${angle}deg)
                  `,
                  filter:
                    "drop-shadow(0 0 12px rgba(34,197,94,0.45))",
                }}
              />
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}
