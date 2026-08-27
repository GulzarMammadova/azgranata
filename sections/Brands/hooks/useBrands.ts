"use client";

import { useMemo, useState } from "react";

import { brands } from "../data/brands";
import { BrandCategory } from "../types";

export function useBrands() {
  const [activeCategory, setActiveCategory] =
    useState<BrandCategory>("wine");

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [direction, setDirection] =
    useState<"next" | "previous">("next");

  const currentBrands = useMemo(() => {
    return brands[activeCategory];
  }, [activeCategory]);

  const activeBrand = currentBrands[activeIndex];

  function changeCategory(category: BrandCategory) {
    setActiveCategory(category);
    setActiveIndex(0);
    setDirection("next");
  }

  function nextBrand() {
    setDirection("next");

    setActiveIndex((prev) =>
      prev === currentBrands.length - 1
        ? 0
        : prev + 1
    );
  }

  function previousBrand() {
    setDirection("previous");

    setActiveIndex((prev) =>
      prev === 0
        ? currentBrands.length - 1
        : prev - 1
    );
  }

  function selectBrand(index: number) {
    setDirection(
      index > activeIndex
        ? "next"
        : "previous"
    );

    setActiveIndex(index);
  }

  return {
    categories: [
      {
        id: "wine" as const,
        label: "Wine",
      },
      {
        id: "spirits" as const,
        label: "Spirits",
      },
      {
        id: "softDrinks" as const,
        label: "Soft Drinks",
      },
    ],

    activeCategory,
    activeBrand,
    currentBrands,
    activeIndex,
    direction,

    changeCategory,
    previousBrand,
    nextBrand,
    selectBrand,
  };
}