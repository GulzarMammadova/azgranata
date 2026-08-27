"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./Hero.module.scss";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.from([subtitleRef.current, titleRef.current, buttonRef.current], {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15,
    });

    const onScroll = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.08)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = () => {
    document.getElementById("foundation")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.hero}>
      <div ref={imageRef} className={styles.imageWrapper}>
        <Image
          src="/images/hero.png"
          alt="AZGRANATA"
          fill
          priority
          className={styles.background}
        />
      </div>

      <div className={styles.overlay} />
      <div className={styles.sunGlow} />
      <div className={styles.content}>

        <p ref={subtitleRef} className={styles.subtitle}>
          {"41°24'N · 49°51'E — Shirvan Valley, Azerbaijan"}
        </p>

        <h1 ref={titleRef}>
          THE HOUSE OF
          <br />
          AZGRANATA
        </h1>

       <div className={styles.discover}>
  <span>DISCOVER OUR WORLD</span>
  <div className={styles.discoverLine}></div>
</div> 
   
      </div>

      <button
        className={styles.scroll}
        onClick={scrollDown}
        aria-label="Scroll Down"
      >
        <span>SCROLL</span>
        <div className={styles.line}>
          <div className={styles.progress} />
        </div>
      </button>
    </section>
  );
}
