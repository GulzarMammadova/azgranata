import styles from "../../Journal.module.scss";

export default function JournalHeader() {
  return (
    <header className={styles.journalHeader}>
      <div className={styles.journalHeaderTop}>
        <span className={styles.journalNumber}>06</span>

        <span className={styles.journalLine} />

        <span className={styles.journalName}>
          JOURNAL
        </span>
      </div>

      <div className={styles.headerMain}>
        <h1 className={styles.journalTitle}>
          <span>The</span>
          <em className={styles.journalTitleAccent}>
            Journal
          </em>
        </h1>
      </div>
    </header>
  );
}