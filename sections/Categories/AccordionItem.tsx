"use client";

import Image from "next/image";
import styles from "./AccordionItem.module.scss";
import type { Category } from "./data";
import Link from "next/link";

interface AccordionItemProps {
  category: Category;
  opened: boolean;
  onClick: () => void;
}

export default function AccordionItem({
  category,
  opened,
  onClick,
}: AccordionItemProps) {
  return (
    <article
      className={`${styles.item} ${opened ? styles.open : ""}`}
    >
      {/* ================= HEADER ================= */}

      <button
        type="button"
        className={styles.header}
        onClick={onClick}
      >
        <div className={styles.headerLeft}>
          <span className={styles.number}>
            {category.number}
          </span>

          <h3 className={styles.title}>
            {category.title}
          </h3>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.counter}>
            {category.brands.length} BRANDS
          </span>

          <span
            className={`${styles.icon} ${
              opened ? styles.iconOpen : ""
            }`}
          >
            +
          </span>
        </div>
      </button>

      {/* ================= CONTENT ================= */}

      <div
        className={`${styles.content} ${
          opened ? styles.contentOpen : ""
        }`}
      >
        <div className={styles.contentInner}>
          {/* Intro */}

          <div className={styles.intro}>
            <div className={styles.introLeft}>
              <h4>{category.subtitle}</h4>
            </div>

            <div className={styles.introRight}>
              <p>{category.description}</p>
            </div>
          </div>

          {/* Gallery */}

          <div className={styles.gallery}>
            {category.brands.map((brand) => (
              <article
                key={brand.id}
                className={styles.brand}
              >
                <div className={styles.photo}>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className={styles.image}
                  />
                </div>

                <div className={styles.info}>
                  <span>{brand.category}</span>

                  <h5>{brand.name}</h5>
                </div>
              </article>
            ))}
          </div>

          {/* Footer */}
<div className={styles.footer}>
  <Link
  href={`/categories/${
    category.id === "softdrinks"
      ? "juices"
      : category.id
  }`}
  className={styles.more}
>
  SEE ALL
  <span>→</span>
</Link>
</div>
        </div>
      </div>
    </article>
  );
}