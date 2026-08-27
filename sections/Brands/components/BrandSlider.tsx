"use client";

import styles from "../Brands.module.scss";
import BrandHero from "./BrandHero";
import { Brand } from "../types";

interface Props {
  brands: Brand[];
  activeIndex: number;
  direction: "next" | "previous";
}

export default function BrandSlider({
  brands,
  activeIndex,
  direction,
}: Props) {
  if (!brands.length) return null;

  const total = brands.length;

  const previousIndex =
    (activeIndex - 1 + total) % total;

  const nextIndex =
    (activeIndex + 1) % total;

  return (
    <div className={styles.sliderViewport}>
      <div className={styles.sliderTrack}>

        {/* PREVIOUS */}
        <div
          className={`${styles.slide} ${styles.slidePrevious}`}
        >
          <BrandHero brand={brands[previousIndex]} />
        </div>

        {/* ACTIVE */}
        <div
          key={activeIndex}
          className={`${styles.slide} ${styles.slideActive} ${
            direction === "next"
              ? styles.slideEnterNext
              : styles.slideEnterPrevious
          }`}
        >
          <BrandHero brand={brands[activeIndex]} />
        </div>

        {/* NEXT */}
        <div
          className={`${styles.slide} ${styles.slideNext}`}
        >
          <BrandHero brand={brands[nextIndex]} />
        </div>

      </div>
    </div>
  );
}