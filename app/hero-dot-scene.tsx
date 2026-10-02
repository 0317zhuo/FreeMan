"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const width = 420;
const height = 300;
const spacing = 3.5;
const messages = [
  "自由，是选择自己的路。",
  "用代码，让想法落地。",
  "保持好奇，持续学习。",
  "连接同路人，一起创造。",
];

export default function HeroDotScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);
  const updateRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const map = new window.Image();
    const computer = new window.Image();
    let disposed = false;
    let visible = false;
    let ready = false;
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    let time = 0;
    let mapPixels: Uint8ClampedArray;
    const globe: { x: number; y: number; u: number; v: number }[] = [];
    const laptop = document.createElement("canvas");
    laptop.width = laptop.height = 336;

    function dot(target: CanvasRenderingContext2D, x: number, y: number, radius = 1) {
      target.moveTo(x + radius, y);
      target.arc(x, y, radius, 0, Math.PI * 2);
    }

    function draw() {
      if (!context || !ready) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#fdfcfc";
      context.beginPath();

      // 窗口与连接点属于终端界面；主体点阵从原创生图素材采样。
      for (let x = 24; x <= 395; x += spacing) {
        dot(context, x, 57);
        dot(context, x, 83);
        dot(context, x, 242);
      }
      for (let y = 57; y <= 242; y += spacing) {
        dot(context, 24, y);
        dot(context, 395, y);
      }
      for (const point of globe) {
        const u = ((point.u + time / 12) % 1 + 1) % 1;
        const offset = (Math.min(127, Math.floor(point.v * 128)) * 256 + Math.floor(u * 256)) * 4;
        const land = mapPixels[offset] < 128;
        dot(context, 107 + point.x, 160 + point.y, land ? 1.2 : .48);
      }
      const connection = Math.floor(time * 2.5) % 4;
      for (let index = 0; index < 3; index++) {
        if (motion.matches || pausedRef.current || index < connection) dot(context, 183 + index * 19, 160, 1.65);
      }
      context.fill();
      context.drawImage(laptop, 255, 103 + (motion.matches ? 0 : Math.sin(time * 1.5) * 1.5), 112, 112);
      context.font = "10px monospace";
      context.textBaseline = "middle";
      context.fillText("FREEMAN / WORLD WIDE WORKSPACE", 39, 70);

      const terminal = terminalRef.current;
      const text = commandRef.current;
      if (terminal && text) {
        const message = messages[Math.floor(time / 5) % messages.length];
        const elapsed = time % 5;
        const deleteAt = message.length / 7 + 2;
        const letters = motion.matches ? message.length : elapsed <= deleteAt
          ? Math.min(message.length, Math.floor(elapsed * 7))
          : Math.max(0, message.length - Math.floor((elapsed - deleteAt) * 12));
        const value = message.slice(0, letters);
        if (text.textContent !== value) text.textContent = value;
        const cursor = motion.matches || pausedRef.current || Math.floor(time * 2) % 2 === 0 ? "visible" : "hidden";
        if (terminal.dataset.cursor !== cursor) terminal.dataset.cursor = cursor;
      }
    }

    function active() { return ready && visible && !document.hidden && !motion.matches && !pausedRef.current; }

    function tick(now: number) {
      frame = 0;
      if (!active()) return;
      time += previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      if (now - lastDraw >= 1000 / 30) {
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function update() {
      if (!active()) {
        cancelAnimationFrame(frame);
        frame = previous = lastDraw = 0;
        draw();
      } else if (!frame) {
        previous = lastDraw = 0;
        frame = requestAnimationFrame(tick);
      }
    }
    updateRef.current = update;

    function resize() {
      if (!canvas || !context) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = canvas.getBoundingClientRect().width / width * ratio;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      draw();
    }

    async function prepare() {
      try {
        await Promise.all([map.decode(), computer.decode()]);
        if (disposed || !canvas) return;
        const buffer = document.createElement("canvas");
        buffer.width = 256;
        buffer.height = 128;
        const sample = buffer.getContext("2d", { willReadFrequently: true });
        const laptopContext = laptop.getContext("2d");
        if (!sample || !laptopContext) return;
        sample.drawImage(map, 0, 0, 256, 128);
        mapPixels = sample.getImageData(0, 0, 256, 128).data;
        buffer.width = buffer.height = 112;
        sample.drawImage(computer, 0, 0, 112, 112);
        const pixels = sample.getImageData(0, 0, 112, 112).data;
        laptopContext.scale(3, 3);
        laptopContext.fillStyle = "#fdfcfc";
        laptopContext.beginPath();
        for (let y = 0; y < 112; y += spacing) {
          for (let x = 0; x < 112; x += spacing) {
            const offset = (Math.floor(y) * 112 + Math.floor(x)) * 4;
            if (pixels[offset] > 128) dot(laptopContext, x, y, 1.15);
          }
        }
        laptopContext.fill();
        const radius = 46;
        for (let y = -radius; y <= radius; y += spacing) {
          for (let x = -radius; x <= radius; x += spacing) {
            const depth = radius * radius - x * x - y * y;
            if (depth <= 0) continue;
            globe.push({ x, y, u: .5 + Math.atan2(x, Math.sqrt(depth)) / (Math.PI * 2), v: .5 + Math.asin(y / radius) / Math.PI });
          }
        }
        ready = true;
        resize();
        canvas.dataset.ready = "true";
        update();
      } catch {
        // 素材未加载时保留同一组点阵的静态回退。
      }
    }

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    map.src = "/images/hero-world-map.webp";
    computer.src = "/images/hero-computer.webp";
    void prepare();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      updateRef.current = () => {};
    };
  }, []);

  function toggle() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    updateRef.current();
  }

  return <><div className={styles.terminalArt}><div className={styles.heroDotScene}>
    <Image className={styles.heroDotFallback} src="/images/hero-dots-static.webp" alt="" width={840} height={600} sizes="(max-width: 640px) 100vw, 50vw" preload />
    <canvas ref={canvasRef} width={width} height={height} role="img" aria-label="黑白点阵终端：地球通过连接点连接到一台复古电脑。" />
    <button className={styles.heroMotionToggle} type="button" onClick={toggle} aria-label={paused ? "播放点阵动效" : "暂停点阵动效"}>{paused ? "播放 ↗" : "暂停 Ⅱ"}</button>
  </div></div>
    <div ref={terminalRef} className={styles.terminalBottom}>
      <div className={styles.terminalSession}><span className={styles.terminalSignal} aria-hidden="true" /><span>WORLD ↔ WORKSPACE</span></div>
      <div className={styles.terminalPrompt}><span className={styles.terminalPromptMark} aria-hidden="true">❯</span><span ref={commandRef} aria-hidden="true">{messages[0]}</span><span className={styles.cursor} aria-hidden="true">▌</span><span className={styles.srOnly}>终端文案：{messages.join(" ")}</span></div>
      <p className={styles.terminalHints}><span>持续探索</span><span>持续构建 ↗</span></p>
    </div>
  </>;
}
