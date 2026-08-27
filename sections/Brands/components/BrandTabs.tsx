"use client";

import styles from "../Brands.module.scss";
import { BrandCategory } from "../types";

interface BrandTabsProps {
  categories: {
    id: BrandCategory;
    label: string;
  }[];

  activeCategory: BrandCategory;

  onChange: (category: BrandCategory) => void;
}

export default function BrandTabs({
  categories,
  activeCategory,
  onChange,
}: BrandTabsProps) {
  return (
    <div className={styles.tabs}>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={
            activeCategory === category.id
              ? styles.activeTab
              : ""
          }
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}