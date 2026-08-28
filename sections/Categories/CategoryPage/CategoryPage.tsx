"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import {
  categoryPageSlugs,
  type CategoryPageData,
  type CategoryPageProduct,
} from "./categoryPage.data";

import styles from "./CategoryPage.module.scss";

interface StoryProps {
  product: CategoryPageProduct;
  accent: string;
  reverse: boolean;
}

function Story({
  product,
  accent,
  reverse,
}: StoryProps) {
  return (
    <section
      className={`${styles.story} ${
        reverse ? styles.storyReverse : ""
      }`}
    >
      <div className={styles.storyImage}>
<Image
  src={product.atmosphereImage}
  alt={product.atmosphereAlt}
  fill
  sizes="50vw"
  className={styles.storyAtmosphereImage}
/>

        <div className={styles.storyOverlay} />

        <div className={styles.productVisual}>
<Image
  src={product.image}
  alt={product.name}
  width={800}
  height={1100}
  className={styles.productImage}
/>
        </div>

        <span
          className={styles.typeBadge}
          style={{
            backgroundColor: accent,
          }}
        >
          {product.type}
        </span>
      </div>

      <div className={styles.storyCopy}>
        <span
          className={styles.meta}
          style={{
            color: accent,
          }}
        >
          {product.meta}
        </span>

        <h2>{product.headline}</h2>

        <span
          className={styles.shortLine}
          style={{
            backgroundColor: accent,
          }}
        />

        <p>{product.description}</p>

        <Link
          className={styles.productLink}
          href={`/products/${product.slug}`}
        >
          {product.name}

          <span
            style={{
              backgroundColor: accent,
            }}
          />
        </Link>
      </div>
    </section>
  );
}

export default function CategoryPage({
  data,
}: {
  data: CategoryPageData;
}) {
  const [filter, setFilter] =
    useState("All");

  const featured = data.products.filter(
    (product) => product.featured
  );

  const filtered = useMemo(() => {
    if (filter === "All") {
      return data.products;
    }

    return data.products.filter(
      (product) => product.type === filter
    );
  }, [data.products, filter]);

  const pageStyle = {
    "--accent": data.accent,
    "--accent-light": data.accentLight,
    "--accent-text": data.accentText,
  } as CSSProperties;

  return (
    <main
      className={styles.page}
      style={pageStyle}
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.ghost}>
          {data.title.toUpperCase()}
        </div>

        <div className={styles.heroImage}>
<Image
  src={data.heroImage}
  alt={data.heroAlt}
  fill
  priority
  sizes="(max-width: 680px) 78vw, 52vw"
  className={styles.heroImageElement}
/>

          <span />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.categoryMarker}>
            <span />

            CATEGORY {data.number}
          </div>

          <div className={styles.heroBottom}>
            <div className={styles.heroCopy}>
              <p className={styles.tagline}>
                {data.tagline}
              </p>

              <p className={styles.description}>
                {data.description}
              </p>
            </div>

            <div className={styles.heroActions}>
              <a href="#stories">
                DISCOVER

                <i />
              </a>

              <a href="#catalogue">
                JUMP TO FULL CATALOGUE ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <section className={styles.atmosphere}>
<Image
  src={data.atmosphereImage}
  alt={data.atmosphereAlt}
  fill
  sizes="100vw"
  className={styles.atmosphereImage}
/>

        <div className={styles.atmosphereShade} />

        <div className={styles.atmosphereLabels}>
          {data.atmosphereLabels.map(
            (label, index) => (
              <span key={label}>
                <i
                  style={{
                    backgroundColor:
                      index === 0
                        ? data.accent
                        : undefined,
                  }}
                />

                {label}
              </span>
            )
          )}
        </div>

        <strong>{data.number}</strong>
      </section>

      {/* =====================================================
          STORIES
      ===================================================== */}

      <div id="stories">
        {featured.map(
          (product, index) => (
            <Story
              key={product.id}
              product={product}
              accent={data.accent}
              reverse={index % 2 === 1}
            />
          )
        )}
      </div>

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className={styles.statement}>
        <div>
          <span
            className={styles.meta}
            style={{
              color: data.accent,
            }}
          >
            {data.eyebrow}
          </span>

          <blockquote>
            “{data.statement}”
          </blockquote>
        </div>

        <div>
          <p>{data.editorialText}</p>

          <span
            className={styles.signature}
          >
            <i
              style={{
                backgroundColor:
                  data.accent,
              }}
            />

            AZGRANATA {data.title}
          </span>
        </div>
      </section>

      {/* =====================================================
          COMPLETE COLLECTION
      ===================================================== */}

      <section
        id="catalogue"
        className={styles.catalogue}
      >
        <div
          className={styles.catalogueHead}
        >
          <div>
            <span
              className={styles.meta}
            >
              COMPLETE COLLECTION
            </span>

            <h2>
              All {data.title}
            </h2>
          </div>

          <span>
            {data.products.length} PRODUCTS
          </span>
        </div>

        <div className={styles.filters}>
          {data.filters.map((item) => (
            <button
              key={item}
              type="button"
              className={
                filter === item
                  ? styles.activeFilter
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div
          className={styles.productGrid}
        >
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={styles.card}
            >
              <div
                className={
                  styles.cardImage
                }
              >
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
  className={styles.cardImageElement}
/>

                <span>
                  VIEW PRODUCT
                </span>
              </div>

              <div
                className={
                  styles.cardType
                }
                style={{
                  color: data.accent,
                }}
              >
                {product.type}
              </div>

              <h3>{product.name}</h3>

              <p>{product.meta}</p>

              <i
                style={{
                  backgroundColor:
                    data.accent,
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          OTHER CATEGORIES
      ===================================================== */}

      <section className={styles.crossNav}>
        <span className={styles.meta}>
          EXPLORE OTHER CATEGORIES
        </span>

        <div>
          {categoryPageSlugs
            .filter(
              (slug) => slug !== data.slug
            )
            .map((slug) => {
              const title =
                slug === "juices"
                  ? "Juices"
                  : slug[0].toUpperCase() +
                    slug.slice(1);

              return (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                >
                  <small>→</small>

                  {title}
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}