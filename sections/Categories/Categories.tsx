"use client";

import { useState } from "react";
import styles from "./Categories.module.scss";
import { categories } from "./data";
import AccordionItem from "./AccordionItem";

export default function Categories() {
const [opened, setOpened] = useState<number | null>(null);

  return (
    <section
      id="categories"
      className={styles.categories}
    >
      <div className={styles.container}>

        {/* Section Header */}

        <div className={styles.sectionHeader}>

          <span className={styles.number}>03</span>

          <span className={styles.line} />

          <span className={styles.label}>
            THE HOUSE OF AZGRANATA
          </span>

        </div>

        {/* Intro */}
<div className={styles.intro}>

  <div className={styles.heading}>

    <h2 className={styles.title}>
      Three Worlds.
    </h2>

    <div className={styles.subtitle}>
      One Vision.
    </div>

  </div>

  <div className={styles.introText}>
    <p>
      Explore every category and discover the brands
      that define The House of AZGRANATA.
    </p>
  </div>
        </div>

        {/* Accordion */}

        <div className={styles.accordion}>

          {categories.map((category, index) => (

<AccordionItem
  key={category.id}
  category={category}
  opened={opened === index}
  onClick={() =>
    setOpened(opened === index ? null : index)
  }
/>

          ))}

        </div>

      </div>
    </section>
  );
}