"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/assets";
import styles from "./development.module.css";

type Technology = { name: string; icon: string };
const GROUP_SIZE = 6;

export default function HeroTechnologies({ items }: { items: Technology[] }) {
  const uniqueItems = items.filter((item, index) => items.findIndex(({ icon }) => icon === item.icon) === index);
  const groupCount = Math.ceil(uniqueItems.length / GROUP_SIZE);
  const [startIndex, setStartIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const currentIndexRef = useRef(0);
  const transitioningRef = useRef(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rotationTimer = 0;
    let transitionTimer = 0;
    const updateRotation = () => {
      window.clearInterval(rotationTimer);
      window.clearTimeout(transitionTimer);
      if (motionPreference.matches && transitioningRef.current) {
        setNextIndex(null);
        transitioningRef.current = false;
      }
      if (!motionPreference.matches) {
        rotationTimer = window.setInterval(() => {
          if (transitioningRef.current) return;
          const next = ((Math.floor(currentIndexRef.current / GROUP_SIZE) + 1) % groupCount) * GROUP_SIZE;
          transitioningRef.current = true;
          setNextIndex(next);
          transitionTimer = window.setTimeout(() => {
            currentIndexRef.current = next;
            setStartIndex(next);
            setNextIndex(null);
            transitioningRef.current = false;
          }, 620);
        }, 2400);
      }
    };

    updateRotation();
    motionPreference.addEventListener("change", updateRotation);
    return () => {
      window.clearInterval(rotationTimer);
      window.clearTimeout(transitionTimer);
      motionPreference.removeEventListener("change", updateRotation);
    };
  }, [groupCount]);

  const renderItems = (index: number, hidden: boolean) => (
    <ul className={styles.heroTechnologies} aria-hidden={hidden}>
      {uniqueItems.slice(index, index + GROUP_SIZE).map(({ name, icon }) => (
        <li key={icon} title={name}>
          <Image src={assetUrl(`/icons/${icon}.svg`)} width={40} height={40} alt={hidden ? "" : name} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.heroTechnologyViewport} role="group" aria-label="技术栈">
      <div className={nextIndex === null ? undefined : styles.heroTechnologiesExit}>
        {renderItems(startIndex, false)}
      </div>
      {nextIndex !== null && (
        <div className={styles.heroTechnologiesEnter}>
          {renderItems(nextIndex, true)}
        </div>
      )}
    </div>
  );
}
