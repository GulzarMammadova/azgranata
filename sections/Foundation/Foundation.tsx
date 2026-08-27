"use client";

import Image from "next/image";
import styles from "./Foundation.module.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    image: "/images/foundation/nature.jpg",
    location: "Kura River Valley · Shirvan, Azerbaijan",
    title: "Nature",
    text: "Rooted in the fertile valleys nourished by the Kura and Araz rivers, our vineyards flourish in one of Azerbaijan's richest agricultural regions.",
  },
  {
    image: "/images/foundation/cellar.jpg",
    location: "Estate Cellar · Ganja, Azerbaijan",
    title: "Craftsmanship",
    text: "Every bottle reflects generations of knowledge, traditional winemaking techniques, and uncompromising attention to detail.",
  },
  {
    image: "/images/foundation/production.jpg",
    location: "Production Facility · Ganja, Azerbaijan",
    title: "Innovation",
    text: "Respecting tradition while embracing the future, we combine modern technology with authentic Azerbaijani heritage.",
    quote:
      '"Innovation grows stronger when tradition remains at its heart."',
  },
];

export default function Foundation() {
  const cardsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!cardsRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 72%",
        once: true,
      },
    });

    tl.from(`.${styles.card}`, {
      opacity: 0,
      y: 80,
      stagger: 0.22,
      duration: 1.1,
    });
    tl.from(
  `.${styles.image}`,
  {
    clipPath: "inset(12% 0 12% 0)",
    scale: 1.15,
    duration: 1.3,
    stagger: 0.22,
    ease: "power4.out",
  },
  "<"
);

    gsap.utils
      .toArray<HTMLElement>(`.${styles.image}`)
      .forEach((image) => {
        gsap.to(image, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
  }, cardsRef);

  return () => ctx.revert();

  
}, []);

  return (
    <section
      id="foundation"
      className={styles.foundation}
    >
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <span className={styles.number}>02</span>

          <span className={styles.line} />

          <span className={styles.label}>Foundation</span>
        </div>

        <div
          ref={cardsRef}
          className={styles.grid}
        >
          {cards.map((card) => (
<article
  key={card.title}
  className={styles.card}
>
  <div className={styles.image}>
    <Image
      src={card.image}
      alt={card.title}
      fill
      sizes="33vw"
      className={styles.imageItem}
    />
  </div>

  <div className={styles.location}>
    <span />
    {card.location}
  </div>

  <h3 className={styles.title}>
    {card.title}
  </h3>

  <p className={styles.text}>
    {card.text}
  </p>

  {card.quote && (
    <blockquote className={styles.quote}>
      {card.quote}
    </blockquote>
  )}
</article>
          ))}
        </div>
      </div>
    </section>
  );
}