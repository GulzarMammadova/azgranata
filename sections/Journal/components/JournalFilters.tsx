"use client";

import { useState } from "react";

import styles from "../Journal.module.scss";

const filters = [
  "ALL",
  "HARVEST",
  "INNOVATION",
  "AWARDS",
  "PEOPLE",
  "EVENTS",
  "EXPORT",
];

export default function JournalFilters() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <nav className={styles.filters} aria-label="Journal categories">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`${styles.filter} ${
            activeFilter === filter ? styles.filterActive : ""
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
}