"use client";

import styles from "./Brands.module.scss";

import { useBrands } from "./hooks/useBrands";

import {
  BrandsHeader,
  BrandTabs,
  BrandSlider,
  BrandPreviewRail,
  BrandNavigation,
} from "./components";

export default function Brands() {
  const {
    categories,
    activeCategory,
    activeBrand,
    currentBrands,
    activeIndex,
    direction,
    changeCategory,
    previousBrand,
    nextBrand,
    selectBrand,
  } = useBrands();

  if (!activeBrand) return null;

  return (
    <section className={styles.brands}>
      <div className={styles.container}>

        <BrandsHeader />

        <BrandTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={changeCategory}
        />

        <BrandSlider
          brands={currentBrands}
          activeIndex={activeIndex}
          direction={direction}
        />

        <BrandNavigation
          activeIndex={activeIndex}
          total={currentBrands.length}
          onPrevious={previousBrand}
          onNext={nextBrand}
        />

        <BrandPreviewRail
          brands={currentBrands}
          activeIndex={activeIndex}
          onSelect={selectBrand}
        />

      </div>
    </section>
  );
}