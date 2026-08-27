import styles from "../../Journal.module.scss";

interface JournalQuoteProps {
  quote?: string;
  author?: string;
}

export default function JournalQuote({
  quote = "The harvest is not an event. It is the sum of an entire year.",
  author = "RAUF ALIYEV",
}: JournalQuoteProps) {
  return (
    <aside className={styles.editorialQuote}>
      <div className={styles.quoteMark} aria-hidden="true">
        “
      </div>

      <blockquote>{quote}</blockquote>

      <div className={styles.quoteAuthor}>
        <span className={styles.quoteLine} />
        {author}
      </div>
    </aside>
  );
}