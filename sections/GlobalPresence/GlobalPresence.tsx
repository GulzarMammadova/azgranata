"use client";

import styles from "./GlobalPresence.module.scss";

import {
  GlobalPresenceHeader,
  GlobalPresenceMap,
  GlobalPresenceStats,
} from "./components";

export default function GlobalPresence() {
  return (
    <section className={styles.globalPresence}>
      <div className={styles.container}>
        <GlobalPresenceHeader />

        <GlobalPresenceMap />

        <GlobalPresenceStats />
      </div>
    </section>
  );
}