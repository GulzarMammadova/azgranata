import Image from "next/image";
import styles from "../../Journal.module.scss";

import type { JournalArticle } from "../../types";

interface JournalArticleCardProps {
  article: JournalArticle;
  variant: "left" | "right";
}

export default function JournalArticleCard({
  article,
  variant,
}: JournalArticleCardProps) {
  return (
    <article
      className={`${styles.editorialCard} ${
        variant === "left"
          ? styles.editorialCardLeft
          : styles.editorialCardRight
      }`}
    >
      <div className={styles.editorialImage}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.editorialContent}>
        <div className={styles.editorialMeta}>
          {article.category} — {article.readTime}
        </div>

        <h3 className={styles.editorialTitle}>
          {article.title}
        </h3>

        <div className={styles.editorialDate}>
          {article.date}
        </div>
      </div>
    </article>
  );
}