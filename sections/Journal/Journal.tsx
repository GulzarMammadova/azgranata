import styles from "./Journal.module.scss";

import JournalHeader from "./components/JournalHeader/JournalHeader";
import JournalFeatured from "./components/JournalFeatured/JournalFeatured";
import JournalEditorial from "./components/JournalEditorial";

import { journalArticles } from "./data/journal.data";

export default function Journal() {
  const featuredArticles = journalArticles.filter(
    (article) => article.position === "featured"
  );

  const editorialArticles = journalArticles.filter(
    (article) => article.position === "editorial"
  );

  return (
    <section className={styles.journal}>
      <div className={styles.container}>
        <JournalHeader />

        <JournalFeatured articles={featuredArticles} />

        <JournalEditorial articles={editorialArticles} />
      </div>
    </section>
  );
}