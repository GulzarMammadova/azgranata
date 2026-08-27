import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";

import styles from "./Navigation.module.scss";

type Props = {
  dark?: boolean;
};

export default function Navigation({ dark }: Props) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {NAVIGATION.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.link} ${
                dark ? styles.dark : styles.light
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}