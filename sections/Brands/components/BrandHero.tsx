"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "../Brands.module.scss";
import { Brand } from "../types";

interface Props {
  brand: Brand;
}

export default function BrandHero({ brand }: Props) {
  return (
    <article className={styles.hero}>

      {/* IMAGE */}
      <div className={styles.heroImage}>
        <Image
          src={brand.image}
          alt={brand.title}
          fill
          sizes="50vw"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className={styles.heroContent}>

        <span className={styles.category}>
          <span className={styles.categoryDot} />
          {brand.type}
        </span>

        <h2>{brand.title}</h2>

        {brand.subtitle && (
          <h3>{brand.subtitle}</h3>
        )}

        {brand.description && (
          <p>{brand.description}</p>
        )}

        <Link
          href={brand.link}
          className={styles.discover}
        >
          <span>Discover</span>
          <span className={styles.discoverLine} />
        </Link>

      </div>

    </article>
  );
}