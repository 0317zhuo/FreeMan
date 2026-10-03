import SocialLinks from "./social-links";
import HeroDotScene from "./hero-dot-scene";
import styles from "./landing.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="about" aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <h1 id="hero-title">
          在AI时代
          <br />
          追求自由的年轻人
        </h1>
        <p className={styles.description}>
          用代码把想法落地，用 AI 拓展可能。
          <br />
          分享作品、学习与投资观察，连接同样热爱创造的人。
          <br />
          让好奇心有去处，让想法有回响。
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primaryButton} href="#projects">
            探索我的作品 <span aria-hidden="true">↓</span>
          </a>
          <a className={styles.secondaryButton} href="#possibilities">
            发现更多可能 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <SocialLinks />
      </div>
      <aside className={styles.terminalCard} aria-label="个人空间终端概念视觉">
        <div className={styles.terminalTop}>
          <span>~/freeman / personal-space</span>
          <span aria-hidden="true">− □ ×</span>
        </div>
        <HeroDotScene />
      </aside>
    </section>
  );
}
