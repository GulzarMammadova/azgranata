import styles from "../GlobalPresence.module.scss";

export default function GlobalPresenceHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.eyebrow}>
        <span className={styles.number}>0.5</span>

        <span className={styles.eyebrowLine} />

        <span className={styles.eyebrowText}>
          GLOBAL PRESENCE
        </span>
      </div>

      <div className={styles.intro}>
        <h2 className={styles.title}>
          <span>From One Land</span>

          <em>To the World</em>
        </h2>

        <div className={styles.description}>
          <p>
            AZGRANATA reaches over 40 countries across six
            continents. Each seed of our pomegranate has found
            its home in a new territory.
          </p>
        </div>
      </div>
    </header>
  );
}