import Image from "next/image";

import styles from "../../Journal.module.scss";
import type { JournalArticle } from "../../types";

interface JournalFeaturedProps {
  articles: JournalArticle[];
}

export default function JournalFeatured({
  articles,
}: JournalFeaturedProps) {
  const mainArticle = articles[0];
  const secondaryArticle = articles[1];

  if (!mainArticle && !secondaryArticle) {
    return null;
  }

  return (
    <section className={styles.featured}>
      <div className={styles.featuredGrid}>
        {mainArticle && (
          <article className={styles.featuredMain}>
            <div className={styles.featuredMainImage}>
              <Image
                src={mainArticle.image}
                alt={mainArticle.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 62vw"
              />
            </div>

            <div className={styles.featuredOverlay} />

            <div className={styles.featuredMainContent}>
              <div className={styles.articleMeta}>
                {mainArticle.category} — {mainArticle.readTime}
              </div>

              <h2 className={styles.featuredTitle}>
                {mainArticle.title}
              </h2>

              {mainArticle.excerpt && (
                <p className={styles.featuredExcerpt}>
                  {mainArticle.excerpt}
                </p>
              )}

              <div className={styles.articleDate}>
                {mainArticle.date}
              </div>
            </div>
          </article>
        )}

        {secondaryArticle && (
          <article className={styles.featuredSecondary}>
            <div className={styles.featuredSecondaryImage}>
              <Image
                src={secondaryArticle.image}
                alt={secondaryArticle.title}
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
              />
            </div>

            <div className={styles.featuredSecondaryContent}>
              <div className={styles.articleMeta}>
                {secondaryArticle.category} — {secondaryArticle.readTime}
              </div>

              <h3 className={styles.featuredSecondaryTitle}>
                {secondaryArticle.title}
              </h3>

              <div className={styles.articleDate}>
                {secondaryArticle.date}
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}