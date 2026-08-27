"use client";

import styles from "../Brands.module.scss";

interface Props {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function BrandNavigation({
  activeIndex,
  total,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className={styles.navigation}>

      <div className={styles.progress}>
        <span className={styles.progressLine} />

        <span className={styles.progressText}>
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.arrows}>

        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous brand"
        >
          ←
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next brand"
        >
          →
        </button>

      </div>

    </div>
  );
}