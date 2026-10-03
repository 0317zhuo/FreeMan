import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { relayLogoGroups } from "@/app/_data/landing";
import { EntryAction } from "./interactions";
import styles from "./landing.module.css";

function Tags({ items }: { items: string[] }) {
  return (
    <div className={styles.tags}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export default function RelaySection() {
  return (
    <section
      className={`${styles.section} ${styles.relaySection}`}
      id="relay"
      aria-labelledby="relay-title"
    >
      <div className={styles.relayCopy}>
        <h2 id="relay-title">
          [06] AI中转站 / <span className={styles.statusBadge}>待开发</span>
        </h2>
        <p>
          设想中的 AI 中转站，让应用与模型之间的连接更简单。
          <br />
          面向个人实验、原型开发与 AI 工具构建。
        </p>
        <Tags items={["拟提供 / 统一接口", "多模型连接", "用量记录"]} />
        <EntryAction entry="relay" className={styles.primaryButton}>
          了解 AI 中转站 <span aria-hidden="true">↗</span>
        </EntryAction>
        <p className={styles.note}>规划中的服务，暂未开放模型调用。</p>
      </div>
      <div
        className={styles.relayVisual}
        role="img"
        aria-label={`AI 品牌图标展示：${relayLogoGroups
          .flat()
          .map((logo) => logo.name)
          .join("、")}。仅作概念展示。`}
      >
        {relayLogoGroups.map((logos, index) => (
          <div className={styles.relayLane} key={index} aria-hidden="true">
            <div
              className={`${styles.relayTrack} ${index === 1 ? styles.relayTrackDown : ""}`}
            >
              {[0, 1].map((copy) => (
                <div className={styles.relayLogoGroup} key={copy}>
                  {logos.map((logo) => (
                    <div className={styles.relayLogo} key={logo.icon}>
                      <Image
                        src={assetUrl(`/icons/${logo.icon}.svg`)}
                        width={56}
                        height={56}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
