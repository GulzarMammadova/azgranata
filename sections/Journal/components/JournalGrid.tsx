import Link from "next/link";
import styles from "../Journal.module.scss";

export default function JournalGrid() {
  return (
    <section className={styles.journalGrid}>
      {/* =========================================
          TOP
      ========================================= */}

      <div className={styles.topGrid}>
        {/* FEATURED */}

        <article className={styles.featuredArticle}>
          <Link
            href="/journal/the-last-days-of-october"
            className={styles.articleLink}
          >
            <div className={styles.featuredImage}>
              <img
                src="/images/journal/harvest.jpg"
                alt="The Last Days of October"
              />

              <div className={styles.featuredOverlay} />

              <div className={styles.featuredContent}>
                <span className={styles.category}>
                  HARVEST — 12 MIN READ
                </span>

                <h2>
                  The Last
                  <br />
                  Days of October
                </h2>

                <p>
                  Inside the final harvest of Azerbaijan&apos;s most celebrated
                  vineyard season — where tradition meets the weight of
                  expectation.
                </p>

                <time>OCTOBER 2024</time>
              </div>
            </div>
          </Link>
        </article>

        {/* INNOVATION */}

        <article className={styles.innovationArticle}>
          <Link
            href="/journal/how-we-reinvented-pomegranate-processing"
            className={styles.articleLink}
          >
            <div className={styles.innovationImage}>
              <img
                src="/images/journal/pomegranate-processing.jpg"
                alt="Pomegranate processing"
              />
            </div>

            <div className={styles.articleInfo}>
              <span className={styles.category}>
                INNOVATION — 8 MIN
              </span>

              <h3>
                How We Reinvented Pomegranate Processing
              </h3>

              <time>September 2024</time>
            </div>
          </Link>
        </article>
      </div>

      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className={styles.bottomGrid}>
        {/* AWARDS */}

        <article className={styles.awardArticle}>
          <Link
            href="/journal/reserve-wins-international-gold"
            className={styles.articleLink}
          >
            <div className={styles.awardImage}>
              <img
                src="/images/journal/reserve-wine.jpg"
                alt="Reserve wine"
              />
            </div>

            <div className={styles.articleInfo}>
              <span className={styles.category}>
                AWARDS — 5 MIN
              </span>

              <h3>
                Reserve Wins International Gold at Decanter
              </h3>

              <time>August 2024</time>
            </div>
          </Link>
        </article>

        {/* QUOTE */}

        <article className={styles.quoteBlock}>
          <div className={styles.quoteInner}>
            <span className={styles.quoteMark}>
              &quot;
            </span>

            <blockquote>
              The harvest is not an event. It is the sum of an entire year.
            </blockquote>

            <cite>
              — RAUF ALIYEV
            </cite>
          </div>
        </article>

        {/* PEOPLE */}

        <article className={styles.peopleArticle}>
          <Link
            href="/journal/portrait-the-winemaker"
            className={styles.articleLink}
          >
            <div className={styles.peopleImage}>
              <img
                src="/images/journal/winemaker.jpg"
                alt="The Winemaker"
              />
            </div>

            <div className={styles.articleInfo}>
              <span className={styles.category}>
                PEOPLE — 10 MIN
              </span>

              <h3>
                Portrait: The Winemaker Behind Our Finest Vintage
              </h3>

              <time>July 2024</time>
            </div>
          </Link>
        </article>
      </div>
    </section>
  );
}