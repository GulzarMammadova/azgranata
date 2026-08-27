"use client";

import Image from "next/image";
import styles from "../Brands.module.scss";
import { Brand } from "../types";

interface Props {
  brands: Brand[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function BrandPreviewRail({
  brands,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <div className={styles.previewRail}>
      {brands.map((brand, index) => (
        <button
          key={brand.id}
          type="button"
          onClick={() => onSelect(index)}
          className={`${styles.previewItem} ${
            activeIndex === index ? styles.previewActive : ""
          }`}
        >
          <Image
            src={brand.thumbnail}
            alt={brand.title}
            fill
            sizes="70px"
          />
        </button>
      ))}
    </div>
  );
}