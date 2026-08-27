import styles from "./Actions.module.scss";

type Props = {
  dark?: boolean;
};

export default function Actions({ dark }: Props) {
  return (
    <div className={styles.actions}>
      <button className={`${styles.lang} ${dark ? styles.dark : styles.light}`}>
        AZ
      </button>

      <button className={`${styles.lang} ${dark ? styles.dark : styles.light}`}>
        EN
      </button>

      <button className={`${styles.lang} ${dark ? styles.dark : styles.light}`}>
        RU
      </button>
    </div>
  );
}