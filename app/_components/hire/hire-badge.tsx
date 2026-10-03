"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/assets";
import styles from "./hire-badge.module.css";

export default function HireBadge({ roles }: { roles: readonly string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container || !badge) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let timer = 0;
    const resetTilt = () => {
      badge.style.setProperty("--badge-pitch", "0deg");
      badge.style.setProperty("--badge-yaw", "0deg");
    };
    const update = () => {
      window.clearInterval(timer);
      resetTilt();
      if (motion.matches || !visible || document.hidden) return;
      timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 3200);
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || !hover.matches || !visible || document.hidden || event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      badge.style.setProperty("--badge-pitch", `${-y * 8}deg`);
      badge.style.setProperty("--badge-yaw", `${x * 10}deg`);
    };
    const focus = () => {
      if (!motion.matches && visible && !document.hidden && container.matches(":focus-visible")) {
        badge.style.setProperty("--badge-pitch", "4deg");
        badge.style.setProperty("--badge-yaw", "-6deg");
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(container);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", resetTilt);
    container.addEventListener("pointercancel", resetTilt);
    container.addEventListener("focus", focus);
    container.addEventListener("blur", resetTilt);
    motion.addEventListener("change", update);
    hover.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", resetTilt);
      container.removeEventListener("pointercancel", resetTilt);
      container.removeEventListener("focus", focus);
      container.removeEventListener("blur", resetTilt);
      motion.removeEventListener("change", update);
      hover.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      resetTilt();
    };
  }, [roles]);

  return (
    <div ref={containerRef} className={styles.scene} tabIndex={0} role="group" aria-label="FreeMan 个人工牌">
    <div ref={badgeRef} className={styles.badge}>
      <div className={styles.slot} aria-hidden="true" />
      <div className={styles.name}>FreeMan</div>
      <div className={styles.avatarFrame}>
        <Image src={assetUrl("/images/avatar-0317zhuo-128.webp")} width={96} height={96} alt="FreeMan 的小猪头像" />
      </div>
      <p className={styles.direction} aria-label="岗位意向"><span key={roleIndex} className={styles.role}>{roles[roleIndex]}</span></p>
      <p className={styles.motto}>保持好奇，持续构建。</p>
      <div className={styles.footer}>
        <span>希望可以加入您的团队</span>
      </div>
    </div>
    </div>
  );
}
