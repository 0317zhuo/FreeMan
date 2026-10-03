import GitHubActivity from "./github-activity";
import styles from "./landing.module.css";

export default function ClosingSection() {
  return (
    <section className={styles.closingSection} aria-labelledby="closing-title">
      <div>
        <p className={styles.eyebrow}>KEEP EXPLORING / KEEP BUILDING</p>
        <h2 id="closing-title">自由，是不断创造的可能。</h2>
        <a className={styles.textButton} href="#about">
          回到起点 <span aria-hidden="true">↑</span>
        </a>
      </div>
      <GitHubActivity />
    </section>
  );
}
