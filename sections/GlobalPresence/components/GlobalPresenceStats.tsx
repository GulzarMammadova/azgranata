"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../GlobalPresence.module.scss";

import { globalPresenceStats } from "../data/globalPresence";

interface CounterProps {
  value: string;
}

function Counter({ value }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const target = parseInt(value.replace(/\D/g, ""), 10);

    if (Number.isNaN(target)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;

        const duration = 1800;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth ease-out
          const easedProgress =
            1 - Math.pow(1 - progress, 3);

          const currentValue = Math.round(
            target * easedProgress
          );

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(animate);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  const suffix = value.replace(/[0-9]/g, "");

  return (
    <span
      ref={ref}
      className={styles.statValue}
    >
      {count}
      {suffix}
    </span>
  );
}

export default function GlobalPresenceStats() {
  return (
    <div className={styles.stats}>
      {globalPresenceStats.map((stat) => (
        <div
          key={stat.label}
          className={styles.stat}
        >
          <Counter value={stat.value} />

          <span className={styles.statLabel}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}