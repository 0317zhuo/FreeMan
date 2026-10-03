"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./page.module.css";

type Dot = { x: number; y: number; z: number; alpha: number; radius: number };
const size = 220;

export default function ProjectParticleCard({ artwork, children }: { artwork: string; children: ReactNode }) {
  const cardRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = new window.Image();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!card || !canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = size * ratio;
    context.scale(ratio, ratio);
    let dots: Dot[] = [];
    let frame = 0;
    let previous = 0;
    let pitch = 0;
    let yaw = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hovered = false;
    let focused = false;
    let visible = true;

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, size, size);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      for (const dot of dots) {
        const x = dot.x * cosY + dot.z * sinY;
        const depth = dot.z * cosY - dot.x * sinY;
        const y = dot.y * cosX - depth * sinX;
        const z = dot.y * sinX + depth * cosX;
        const perspective = 500 / (500 + dot.z - z);
        context.fillStyle = `rgba(32,29,29,${dot.alpha})`;
        context.beginPath();
        context.ellipse(size / 2 + x * perspective, size / 2 + y * perspective, dot.radius * perspective, dot.radius * 1.35 * perspective, 0, 0, Math.PI * 2);
        context.fill();
      }
    }

    function active() { return !motion.matches && visible && !document.hidden && (hovered || focused); }

    function tick(now: number) {
      frame = 0;
      const delta = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
      previous = now;
      const targetYaw = active() ? (hovered ? pointerX * .38 : -.2) : 0;
      const targetPitch = active() ? (hovered ? -pointerY * .28 : .12) : 0;
      const easing = 1 - Math.exp(-delta * 10);
      yaw += (targetYaw - yaw) * easing;
      pitch += (targetPitch - pitch) * easing;
      const settled = Math.abs(targetYaw - yaw) + Math.abs(targetPitch - pitch) < .0001;
      if (settled) { yaw = targetYaw; pitch = targetPitch; previous = 0; }
      draw();
      if (!settled) frame = requestAnimationFrame(tick);
    }

    function update() {
      if (motion.matches || !visible || document.hidden) {
        cancelAnimationFrame(frame);
        frame = pitch = yaw = previous = 0;
        draw();
      } else if (dots.length && !frame) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    function sample() {
      if (!canvas || !image.naturalWidth) return;
      const buffer = document.createElement("canvas");
      buffer.width = buffer.height = size;
      const sampleContext = buffer.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, size, size);
      const pixels = sampleContext.getImageData(0, 0, size, size).data;
      dots = [];
      // 固定纵向网格保留轮廓；灰度映射到深度，转动时前后点产生视差。
      for (let y = 2; y < size; y += 3) {
        for (let x = 2; x < size; x += 4) {
          const offset = (y * size + x) * 4;
          const darkness = 1 - (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 765;
          const opacity = pixels[offset + 3] / 255;
          if (opacity < .15) continue;
          dots.push({ x: x - size / 2, y: y - size / 2, z: (1 - darkness) * 48 - 24, alpha: opacity * (.3 + darkness * .65), radius: .55 + darkness * .35 });
        }
      }
      draw();
      canvas.dataset.ready = "true";
      update();
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !hover.matches || !card) return;
      const bounds = card.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      hovered = true;
      update();
    };
    const leave = () => { hovered = false; update(); };
    const focus = (event: FocusEvent) => {
      const target = event.type === "focusin" ? event.target : event.relatedTarget;
      focused = target instanceof Element && card.contains(target) && target.matches(":focus-visible");
      update();
    };
    const preference = () => { if (!hover.matches) hovered = false; update(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(card);
    card.addEventListener("pointerenter", move);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointercancel", leave);
    card.addEventListener("focusin", focus);
    card.addEventListener("focusout", focus);
    image.addEventListener("load", sample);
    motion.addEventListener("change", preference);
    hover.addEventListener("change", preference);
    document.addEventListener("visibilitychange", update);
    image.src = `/images/${artwork}.webp`;
    if (image.complete) sample();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      card.removeEventListener("pointerenter", move);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("pointercancel", leave);
      card.removeEventListener("focusin", focus);
      card.removeEventListener("focusout", focus);
      image.removeEventListener("load", sample);
      motion.removeEventListener("change", preference);
      hover.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", update);
      delete canvas.dataset.ready;
    };
  }, [artwork]);

  return <article ref={cardRef} className={styles.projectCard}>
    <div className={styles.projectArtwork}><div className={styles.projectParticles} aria-hidden="true">
      <Image src={`/images/${artwork}-static.webp`} alt="" width={440} height={440} sizes="(max-width: 640px) 200px, 220px" />
      <canvas ref={canvasRef} />
    </div></div>
    {children}
  </article>;
}
