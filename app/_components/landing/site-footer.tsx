import { communities, socialPlatforms } from "@/app/_data/landing";
import { navigation } from "@/app/_data/entries";
import { ConnectionAction, EntryAction } from "./interactions";
import GitHubActivity from "./github-activity";
import styles from "./landing.module.css";

export default function SiteFooter() {
  return (
    <footer className={`${styles.shell} ${styles.footer}`}>
      <div className={styles.footerLandscape}>
        <div>
          <p className={styles.eyebrow}>KEEP EXPLORING / KEEP BUILDING</p>
          <h2>自由，是不断创造的可能。</h2>
          <a className={styles.textButton} href="#about">
            回到起点 <span aria-hidden="true">↑</span>
          </a>
        </div>
        <GitHubActivity />
      </div>
      <div className={styles.footerGrid}>
        <div className={styles.footerIntro}>
          <a href="#about" className={styles.footerBrand}>
            freeman_
          </a>
          <p>一个关于探索、记录与创造的个人空间。</p>
          <span className={styles.smallLabel}>BUILD A LIFE OF YOUR OWN.</span>
        </div>
        <div className={styles.footerColumn}>
          <h3>探索</h3>
          <a href="#about">关于我</a>
          <EntryAction entry="projects">项目</EntryAction>
          <EntryAction entry="investment">投资</EntryAction>
          <EntryAction entry="relay">AI 中转站 · 待开发</EntryAction>
        </div>
        <div className={styles.footerColumn}>
          <h3>一起创造</h3>
          {navigation
            .filter((item) => item.entry && item.entry !== "relay")
            .map((item) => (
              <EntryAction key={item.label} entry={item.entry!}>
                {item.label}
              </EntryAction>
            ))}
        </div>
        <div className={styles.footerColumn}>
          <h3>保持连接</h3>
          <div className={styles.footerSocial}>
            {socialPlatforms.map((platform) => (
              <ConnectionAction
                key={platform.name}
                connection={platform}
                className={styles.socialButton}
              />
            ))}
          </div>
          <div className={styles.footerCommunity}>
            {communities.map((community) => (
              <ConnectionAction
                key={community.name}
                connection={community}
                community
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>© {new Date().getFullYear()} FreeMan</span>
        <span>
          保持好奇，持续构建。 <span className={styles.titleDot}>[+]</span>
        </span>
      </div>
    </footer>
  );
}
