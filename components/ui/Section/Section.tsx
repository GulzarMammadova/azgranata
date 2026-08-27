import { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Section.module.scss";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section className={clsx(styles.section, className)}>
      {children}
    </section>
  );
}