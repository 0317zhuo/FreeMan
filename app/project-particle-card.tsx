"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./page.module.css";

type Particle = { x: number; y: number; alpha: number; phase: number; speed: number };
const size = 220;

export default function ProjectParticleCard({ artwork, children }: { artwork: string; children: ReactNode }) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!card || !image || !canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = size * ratio;
    context.scale(ratio, ratio);
    let particles: Particle[] = [];
    let frame = 0;
    let previous = 0;
    let time = 0;
    let progress = 0;
    let hovered = false;
    let focused = false;
    let visible = true;

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, size, size);
      const rotation = Math.sin(time * .35) * .16 * progress;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      for (const particle of particles) {
        const spread = 1 + progress * (.06 + .025 * Math.sin(time * particle.speed + particle.phase));
        const x = particle.x * spread;
        const y = particle.y * spread;
        const driftX = Math.sin(time * particle.speed + particle.phase) * 3 * progress;
        const driftY = Math.cos(time * particle.speed + particle.phase) * 3 * progress;
        context.fillStyle = `rgba(32,29,29,${particle.alpha})`;
        context.fillRect(size / 2 + x * cos - y * sin + driftX, size / 2 + x * sin + y * cos + driftY, 1, 1);
      }
    }

    function active() { return !motion.matches && visible && !document.hidden && (hovered || focused); }

    function tick(now: number) {
      frame = 0;
      const delta = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
      previous = now;
      const target = active() ? 1 : 0;
      progress += (target - progress) * (1 - Math.exp(-delta * 5));
      time += delta;
      if (!target && progress < .002) {
        progress = time = previous = 0;
        draw();
        return;
      }
      draw();
      frame = requestAnimationFrame(tick);
    }

    function update() {
      if (motion.matches || !visible || document.hidden) {
        cancelAnimationFrame(frame);
        frame = progress = time = previous = 0;
        draw();
      } else if (particles.length && !frame && (active() || progress > 0)) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    function sample() {
      if (!image || !canvas || !image.naturalWidth) return;
      const buffer = document.createElement("canvas");
      buffer.width = buffer.height = size;
      const sampleContext = buffer.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, size, size);
      const pixels = sampleContext.getImageData(0, 0, size, size).data;
      particles = [];
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const offset = (y * size + x) * 4;
          const darkness = 1 - (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 765;
          const alpha = pixels[offset + 3] / 255 * darkness;
          if (alpha < .025) continue;
          const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
          const phase = (seed - Math.floor(seed)) * Math.PI * 2;
          particles.push({ x: x - size / 2, y: y - size / 2, alpha, phase, speed: .6 + ((x + y * 3) % 10) / 10 });
        }
      }
      draw();
      canvas.dataset.ready = "true";
      update();
    }

    const enter = (event: PointerEvent) => { hovered = event.pointerType !== "touch" && hover.matches; update(); };
    const leave = () => { hovered = false; update(); };
    const focus = (event: FocusEvent) => {
      const target = event.type === "focusin" ? event.target : event.relatedTarget;
      focused = target instanceof Element && card.contains(target) && target.matches(":focus-visible");
      update();
    };
    const preference = () => { if (!hover.matches) hovered = false; update(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(card);
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointercancel", leave);
    card.addEventListener("focusin", focus);
    card.addEventListener("focusout", focus);
    image.addEventListener("load", sample);
    motion.addEventListener("change", preference);
    hover.addEventListener("change", preference);
    document.addEventListener("visibilitychange", update);
    if (image.complete) sample();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      card.removeEventListener("pointerenter", enter);
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
      <Image ref={imageRef} src={`/images/${artwork}.webp`} alt="" width={640} height={640} sizes="(max-width: 640px) 200px, 220px" />
      <canvas ref={canvasRef} />
    </div></div>
    {children}
  </article>;
}
