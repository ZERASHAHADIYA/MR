"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  separator = ",",
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration)
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatValue = useCallback(
    (latest) => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      };

      const formattedNumber = Intl.NumberFormat("en-US", options).format(Math.round(latest));
      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(from);
    }
  }, [from, formatValue]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}