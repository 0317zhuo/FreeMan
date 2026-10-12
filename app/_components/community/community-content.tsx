import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { communities, socialPlatforms } from "@/app/_data/landing";
import { collaborationSteps, communityShares, communityTopics } from "@/app/_data/community";
import { ConnectionAction } from "../landing/interactions";
import shared from "../landing/landing.module.css";
import styles from "./community.module.css";

export default function CommunityContent() {
  return (
    <div className={styles.content}>
      <section className={styles.hero} aria-labelledby="community-title">
        <div className={styles.heroCopy}>
          <h1 id="community-title">和同路人相遇，<br />把想法一起做出来。</h1>
          <p className={styles.introduction}>聊投资、开发、AI、创业，也聊如何增加收入。<br />在交流中打开思路，在合作中积累经验，让一个人的探索多一些同行的伙伴。</p>
          <div className={shared.heroActions}>
            <a className={shared.primaryButton} href="#join">找到社区入口 <span aria-hidden="true">↗</span></a>
            <a className={shared.secondaryButton} href="#topics">看看聊什么 <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure className={styles.heroVisual}>
          <Image src={assetUrl("/images/community-connections.webp")} width={960} height={960} sizes="(max-width: 850px) 100vw, 48vw" alt="" preload />
        </figure>
      </section>

      <nav className={styles.directory} aria-label="社区功能导航">
        <a href="#topics"><span>01 / 交流</span>聊聊共同兴趣 <span aria-hidden="true">↘</span></a>
        <a href="#collaborate"><span>02 / 共创</span>找伙伴一起开发 <span aria-hidden="true">↘</span></a>
        <a href="#sharing"><span>03 / 分享</span>接收新的灵感 <span aria-hidden="true">↘</span></a>
        <a href="#consult"><span>04 / 咨询</span>把问题聊清楚 <span aria-hidden="true">↘</span></a>
      </nav>

      <section className={styles.section} id="topics" aria-labelledby="topics-title">
        <div className={styles.heading}>
          <div><h2 id="topics-title">[01] 开放交流</h2><p className={styles.sectionLead}>聊点有意思的，<br />也聊点有用的。</p></div>
          <p>从一个新工具到一个创业念头，从开发难题到生活里的小发现。你可以提出问题、分享经验，也可以先听听大家怎么想。</p>
        </div>
        <div className={styles.topicGrid}>
          {communityTopics.map((topic) => (
            <article key={topic.title} className={styles.topic}>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="collaborate" aria-labelledby="collaborate-title">
        <div className={styles.collaboration}>
          <div className={styles.collaborationCopy}>
            <h2 id="collaborate-title">[02] 合作开发，共同成长</h2>
            <p className={styles.sectionLead}>你的想法，<br />也许正好缺一个伙伴。</p>
            <p>在群里寻找合适的合作对象，把想法做成项目。有人擅长开发，有人关注产品、设计或运营，不同能力可以在同一个目标下相遇。</p>
            <p>一起开发、一起验证、一起探索收益，在真实协作中增加经验，争取更多收入。具体的合作方式由参与者共同商量。</p>
            <div className={styles.roles} aria-label="可以参与合作的方向"><span>产品</span><span>设计</span><span>开发</span><span>运营</span></div>
            <a className={shared.textButton} href="#join">去社区找伙伴 <span aria-hidden="true">↗</span></a>
          </div>
          <figure className={styles.buildVisual}>
            <Image src={assetUrl("/images/community-build-bridges.webp")} width={1008} height={672} sizes="(max-width: 850px) 100vw, 50vw" alt="" />
          </figure>
        </div>
        <ol className={styles.steps}>
          {collaborationSteps.map((step, index) => (
            <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>
          ))}
        </ol>
        <p className={styles.collaborationNote}>发布合作想法时，可以说清楚：做什么、目前进度、想找谁，以及预期的合作方式。先沟通再投入，项目机会不代表确定收益。</p>
      </section>

      <section className={`${styles.section} ${styles.sharing}`} id="sharing" aria-labelledby="sharing-title">
        <div className={styles.sharingIntro}>
          <h2 id="sharing-title">[03] 来自站主的分享</h2>
          <p className={styles.sectionLead}>把值得关注的，<br />带回社区。</p>
          <p>我会把探索过程中遇到的前沿内容、创业机会和学习资料分享进群。一起交换线索，也一起把新发现变成下一步行动。</p>
        </div>
        <div className={styles.shareList}>
          {communityShares.map((item, index) => (
            <article key={item.title}><span className={styles.shareNumber}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="consult" aria-labelledby="consult-title">
        <div className={styles.heading}>
          <div><h2 id="consult-title">[04] 群内或单独咨询</h2><p className={styles.sectionLead}>卡住的时候，<br />找个人聊一聊。</p></div>
          <p>开发思路、AI 的实际用法、项目方向，或者一个还没想清楚的念头。根据问题的内容，选择适合的交流方式。</p>
        </div>
        <div className={styles.consultGrid}>
          <article className={styles.consultItem}>
            <h3>把问题带进群里</h3>
            <p>适合公开讨论、希望听到不同经验的问题。说明背景、尝试过的方法和具体卡点，让大家更容易参与讨论。</p>
            <p className={styles.consultExample}>比如：这个功能该怎么实现？<br />这个小产品的方向值得尝试吗？</p>
            <a className={shared.secondaryButton} href="#join">加入社区交流 <span aria-hidden="true">↗</span></a>
          </article>
          <article className={styles.consultItem}>
            <h3>和站主单独聊聊</h3>
            <p>如果问题涉及个人情况、项目细节，或需要更集中地沟通，可以通过下方个人联系方式找我，先说明背景与想咨询的内容。</p>
            <p className={styles.consultExample}>具体时间、交流方式，以及是否涉及费用，<br />在开始前沟通确认。</p>
            <div className={styles.contactLinks}>
              {socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={shared.socialButton} />)}
            </div>
            <small className={styles.contactStatus}>{socialPlatforms.some((platform) => platform.href || platform.account || platform.qr) ? "选择联系方式，与站主沟通。" : "个人联系方式待配置"}</small>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.join}`} id="join" aria-labelledby="join-title">
        <div className={styles.heading}>
          <div><h2 id="join-title">加入社区</h2><p className={styles.sectionLead}>下次灵感，<br />不必一个人完成。</p></div>
          <p>选择你习惯的平台，加入交流。<br />尊重不同观点，分享有用的信息；公开讨论时，请保护自己和他人的隐私。</p>
        </div>
        <div className={styles.joinGrid}>
          {communities.map((community) => (
            <article key={community.name}>
              <div className={styles.platformName}><Image src={assetUrl(`/icons/${community.icon}.svg`)} width={28} height={28} alt="" /><h3>{community.name}</h3></div>
              <p>{community.description}</p>
              <ConnectionAction connection={community} community className={shared.secondaryButton}>加入 {community.name}<span aria-hidden="true">↗</span></ConnectionAction>
              <small>{community.href ? "打开社区邀请链接" : community.account ? "查看加入方式" : "邀请链接待配置"}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
