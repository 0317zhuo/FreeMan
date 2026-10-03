import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { communities } from "@/app/_data/landing";
import { ConnectionAction, EntryAction } from "./interactions";
import styles from "./landing.module.css";

export default function CommunitySection() {
  return (
    <section className={styles.section} id="community" aria-label="加入社区">
      <div className={styles.communityHeading}>
        <div>
          <p className={styles.eyebrow}>[07] 加入社区</p>
          <h2>
            独自探索，
            <br />
            也和同路人相遇。
          </h2>
        </div>
        <div className={styles.communityCopy}>
          <p>
            一个关于 AI 实践与开发交流的空间。
            <br />
            分享新发现，讨论卡住的问题，找伙伴把小想法做出来。
          </p>
          <EntryAction entry="community" className={styles.textButton}>
            了解社区 <span aria-hidden="true">↗</span>
          </EntryAction>
        </div>
      </div>
      <div className={styles.communityLinks}>
        {communities.map((community) => (
          <article key={community.name}>
            <div className={styles.communityName}>
              <Image
                src={assetUrl(`/icons/${community.icon}.svg`)}
                width={30}
                height={30}
                alt=""
              />
              <h3>{community.name}</h3>
            </div>
            <p>{community.description}</p>
            <ConnectionAction
              connection={community}
              community
              className={styles.secondaryButton}
            >
              加入 {community.name} <span aria-hidden="true">↗</span>
            </ConnectionAction>
            <small>邀请链接待配置</small>
          </article>
        ))}
      </div>
    </section>
  );
}
