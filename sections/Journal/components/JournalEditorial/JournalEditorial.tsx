import styles from "../../Journal.module.scss";

import type { JournalArticle } from "../../types";

import JournalArticleCard from "./JournalArticleCard";
import JournalQuote from "./JournalQuote";

interface JournalEditorialProps {
  articles: JournalArticle[];
}

export default function JournalEditorial({
  articles,
}: JournalEditorialProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className={styles.editorial}>
      <div className={styles.editorialGrid}>
        {articles[0] && (
          <JournalArticleCard
            article={articles[0]}
            variant="left"
          />
        )}

        <JournalQuote />

        {articles[1] && (
          <JournalArticleCard
            article={articles[1]}
            variant="right"
          />
        )}
      </div>
    </section>
  );
}