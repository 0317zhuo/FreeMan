import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { technologies } from "@/app/_data/landing";
import styles from "./landing.module.css";

export default function TechnologySection() {
  return (
    <section
      className={`${styles.section} ${styles.stackSection}`}
      id="stack"
      aria-labelledby="stack-title"
    >
      <div className={styles.stackHeading}>
        <h2 id="stack-title">[01] 我的技术栈</h2>
        <p className={styles.note}>示例技术组合 · 围绕问题选择工具</p>
      </div>
      <div className={styles.techGrid}>
        {technologies.map((group) => (
          <div className={styles.techGroup} key={group.category}>
            <p className={styles.smallLabel}>
              {group.category}
              <span>{group.label}</span>
            </p>
            {group.items.map(([name, icon]) => (
              <div className={styles.techItem} key={name}>
                <Image
                  src={assetUrl(`/icons/${icon}.svg`)}
                  width={24}
                  height={24}
                  alt=""
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
