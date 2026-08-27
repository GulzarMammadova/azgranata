"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";

const navItems = [
  { id: "foundation", title: "Foundation", subtitle: "Our Story" },
  { id: "categories", title: "Categories", subtitle: "The House of Azgranata" },
  { id: "brands", title: "Brands", subtitle: "Portfolio" },
  { id: "global-presence", title: "Global Presence", subtitle: "Worldwide" },
  { id: "sustainability", title: "Sustainability", subtitle: "Responsibility" },
  { id: "journal", title: "Journal", subtitle: "News & Insights" },
  { id: "our-people", title: "Our People", subtitle: "Team" },
  { id: "winery-experience", title: "Winery Experience", subtitle: "Visit Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("foundation");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };
useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [menuOpen]);

useEffect(() => {
  const sections = navItems
    .map(item => document.getElementById(item.id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  sections.forEach(section => observer.observe(section!));

  return () => observer.disconnect();
}, []);

useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 180;

    for (const item of navItems) {
      const section = document.getElementById(item.id);

      if (!section) continue;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        setActiveSection(item.id);
        break;
      }
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Image src="/images/logo-white.png" alt="AZGRANATA" width={90} height={54} priority className={styles.logo} />

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
<button
  key={item.id}
  onClick={() => scrollToSection(item.id)}
  className={
    activeSection === item.id ? styles.active : ""
  }
>
  {item.title}
</button>
            ))}
            <div className={styles.separator} />
            <div className={styles.languages}>
              <button>AZ</button><button>EN</button><button>RU</button>
            </div>
          </nav>

          <button className={`${styles.burger} ${menuOpen ? styles.active : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <aside className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.menuHeader}>
        
        </div>

        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <button key={item.id} className={styles.mobileItem} onClick={() => scrollToSection(item.id)}>
              <span className={styles.mobileTitle}>{item.title}</span>
              <span className={styles.mobileSubtitle}>{item.subtitle}</span>
            </button>
          ))}
        </nav>

        <div className={styles.mobileLanguages}>
          <button>AZ</button><button>EN</button><button>RU</button>
        </div>

        
      </aside>
    </>
  );
}
