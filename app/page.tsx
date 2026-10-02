import Image from "next/image";
import { communities, contributors, courses, navigation, projects, relayLogoGroups, services, socialPlatforms, technologies } from "./landing-data";
import { ConnectionAction, EntryAction, FeedbackProvider, Header, ProjectRepositoryLink } from "./landing-interactions";
import Investment from "./investment";
import SocialLinks from "./social-links";
import ProjectParticleCard from "./project-particle-card";
import HeroDotScene from "./hero-dot-scene";
import styles from "./page.module.css";

function SectionHeading({ number, label, title, description, sample }: { number: string; label: string; title: string; description: string; sample?: string }) {
  return <div className={styles.sectionHeading}><div>{number && <p className={styles.eyebrow}>[{number}] {label}</p>}<h2>{title}</h2></div><div className={styles.headingDescription}><p>{description}</p>{sample && <span className={styles.sampleBadge}>{sample}</span>}</div></div>;
}
function Tags({ items }: { items: string[] }) { return <div className={styles.tags}>{items.map((item) => <span key={item}>{item}</span>)}</div>; }
// 固定保存随机示意数据，刷新时保持相同的贡献分布。
const activityLevels = "40134300003003010323232040201034332021002220022000030032112103200101012230123101022200032000132031220112223300410001033241200112004441210220023032204010214010030103004140100000101314343133230112420100424023033310431322131121233233140304342420120303423140130000322202413240110202203030220202304103130001003012010033302110102231220243031244314321430322320300214120330103000";
function GitHubActivity() {
  return <figure className={styles.githubActivity}>
    <figcaption className={styles.activityHeading}>GITHUB ACTIVITY</figcaption>
    <div className={styles.activityScroll} tabIndex={0} role="region" aria-label="全年 GitHub 活动图，可横向滚动查看">
      <div className={styles.activityCalendar}>
        <div className={styles.activityMonths} aria-hidden="true">{Array.from({ length: 12 }, (_, month) => <span key={month} style={{ gridColumn: `${Math.round(month * 53 / 12) + 1} / span 4` }}>{month + 1}月</span>)}</div>
        <div className={styles.activityBody}>
          <div className={styles.activityDays} aria-hidden="true"><span>一</span><span>三</span><span>五</span></div>
          <div className={styles.activityGrid} role="img" aria-label="53 周活动热力图，灰色表示无活动，四档绿色从浅到深表示活动由少到多。">{activityLevels.split("").map((level, index) => <span key={index} className={styles.activityCell} data-level={level} aria-hidden="true" />)}</div>
        </div>
      </div>
    </div>
    <div className={styles.activityLegend}><span>少</span>{[0, 1, 2, 3, 4].map((level) => <span key={level} className={styles.activityCell} data-level={level} aria-hidden="true" />)}<span>多</span></div>
  </figure>;
}

export default function Home() {
  return <FeedbackProvider><div className={styles.landing}>
    <a className={styles.skipLink} href="#main-content">跳转到主要内容</a>
    <Header />
    <main className={styles.shell} id="main-content">
      <section className={styles.hero} id="about" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <h1 id="hero-title">在AI时代<br />追求自由的年轻人</h1>
          <p className={styles.description}>用代码把想法落地，用 AI 拓展可能。<br />分享作品、学习与投资观察，连接同样热爱创造的人。<br />让好奇心有去处，让想法有回响。</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#projects">探索我的作品 <span aria-hidden="true">↓</span></a><a className={styles.secondaryButton} href="#possibilities">发现更多可能 <span aria-hidden="true">↗</span></a></div>
          <SocialLinks />
        </div>
        <aside className={styles.terminalCard} aria-label="个人空间终端概念视觉">
          <div className={styles.terminalTop}><span>~/freeman / personal-space</span><span aria-hidden="true">− □ ×</span></div>
          <HeroDotScene />
        </aside>
      </section>
      <div className={styles.exploreStrip} id="possibilities"><p>一个空间，<br /><strong>不止一种可能。</strong></p><div>{[["作品与探索", "projects", "01"], ["投资与观察", "investment", "02"], ["合作与成长", "collaboration", "03"], ["学习与连接", "courses", "04"]].map(([label, id, index]) => <a href={`#${id}`} key={id}><span>{index}</span>{label}<span aria-hidden="true">↘</span></a>)}</div></div>
      <section className={`${styles.section} ${styles.stackSection}`} id="stack" aria-labelledby="stack-title"><div className={styles.stackHeading}><h2 id="stack-title">[01] 我的技术栈</h2><p className={styles.note}>示例技术组合 · 围绕问题选择工具</p></div><div className={styles.techGrid}>{technologies.map((group) => <div className={styles.techGroup} key={group.category}><p className={styles.smallLabel}>{group.category}<span>{group.label}</span></p>{group.items.map(([name, icon]) => <div className={styles.techItem} key={name}><Image src={`/icons/${icon}.svg`} width={24} height={24} alt="" /><span>{name}</span></div>)}</div>)}</div></section>
      <section className={`${styles.section} ${styles.projectsSection}`} id="projects" aria-labelledby="projects-title"><div className={styles.projectsHeading}><h2 id="projects-title">[02] 我的项目</h2><div className={styles.headingDescription}><p>从个人工具到产品实验，在不同的问题里，寻找简单、好用的答案。</p><span className={styles.sampleBadge}>包含示例作品 / 概念展示</span></div></div>
        <div className={styles.projectGrid}>{projects.slice(0, 3).map((project) => <ProjectParticleCard artwork={project.artwork!} key={project.slug}>
          <div className={styles.projectCopy}><h3><Image src={`/icons/${project.icon}.svg`} alt="" width={20} height={20} />{project.name}</h3><p className={styles.projectCategory}>{project.category}</p><p className={styles.projectDescription}>{project.description}</p><ProjectRepositoryLink name={project.name} href={project.github} /></div>
        </ProjectParticleCard>)}</div>
      </section>
      <section className={styles.assetSection} id="investment" aria-labelledby="assets-title"><Investment /></section>
      <section className={styles.section} id="collaboration" aria-label="开发合作与雇佣"><SectionHeading number="" label="" title="[04] 开发&雇佣" description="如果你有想法可以找我开发或者雇佣我工作，这是我的荣幸" /><div className={styles.collaborationGrid}><div className={styles.development}><h3>你有想法，我来构建。</h3><p>从一个清晰的问题出发，把需要的功能做成可用的产品。</p><div className={styles.services}>{services.map((service) => <div key={service.name}><Image src={`/icons/${service.icon}.svg`} width={23} height={23} alt="" /><div><h4>{service.name}</h4><p>{service.description}</p></div></div>)}</div><EntryAction entry="development" className={styles.primaryButton}>了解开发业务 <span aria-hidden="true">↗</span></EntryAction></div><div className={styles.hire}><div className={styles.hireCopy}><h3>也愿成为，<br />团队的一份子。</h3><p>连接产品与工程，让探索走向交付。</p><ol className={styles.hireSteps}><li><span>[01]</span><p><strong>介绍团队与岗位</strong> - 分享团队方向、岗位期待和当前挑战。</p></li><li><span>[02]</span><p><strong>沟通合作方式</strong> - 一起讨论职责、协作方式与目标。</p></li><li><span>[03]</span><p><strong>开始合作</strong> - 共同推进产品与工程交付。</p></li></ol><EntryAction entry="hire" className={styles.secondaryButton}>了解雇佣合作 <span aria-hidden="true">↗</span></EntryAction></div></div></div></section>
      <section className={`${styles.section} ${styles.coursesSection}`} id="courses" aria-labelledby="courses-title">
        <div className={styles.sectionHeading}><h2 id="courses-title">[05] 课程与学习</h2><div className={styles.headingDescription}><p>把复杂知识拆成可以实践的小步，也为下一次选择留出思考的空间。</p><span className={styles.sampleBadge}>课程方向展示 · 详情待开发</span></div></div>
        <div className={styles.courseGrid}>{courses.map((course) => <article className={styles.courseCard} key={course.title}>
          <div className={styles.courseCardTop}><h3>{course.title}</h3><EntryAction entry="courses" className={styles.courseAction}><span className={styles.srOnly}>了解{course.title}</span><span className={styles.courseActionLabel} aria-hidden="true">了解课程</span><span aria-hidden="true">↗</span></EntryAction></div>
          <div className={styles.courseIcon}><Image src={`/icons/${course.icon}.svg`} width={76} height={76} alt={`${course.iconName} 图标`} /></div>
          <p>{course.audience}</p>
        </article>)}</div>
      </section>
      <section className={`${styles.section} ${styles.relaySection}`} id="relay" aria-labelledby="relay-title"><div className={styles.relayCopy}><h2 id="relay-title">[06] AI中转站 / <span className={styles.statusBadge}>待开发</span></h2><p>设想中的 AI 中转站，让应用与模型之间的连接更简单。<br />面向个人实验、原型开发与 AI 工具构建。</p><Tags items={["拟提供 / 统一接口", "多模型连接", "用量记录"]} /><EntryAction entry="relay" className={styles.primaryButton}>了解 AI 中转站 <span aria-hidden="true">↗</span></EntryAction><p className={styles.note}>规划中的服务，暂未开放模型调用。</p></div>
        <div className={styles.relayVisual} role="img" aria-label={`AI 品牌图标展示：${relayLogoGroups.flat().map((logo) => logo.name).join("、")}。仅作概念展示。`}>
          {relayLogoGroups.map((logos, index) => <div className={styles.relayLane} key={index} aria-hidden="true"><div className={`${styles.relayTrack} ${index === 1 ? styles.relayTrackDown : ""}`}>
            {[0, 1].map((copy) => <div className={styles.relayLogoGroup} key={copy}>{logos.map((logo) => <div className={styles.relayLogo} key={logo.icon}><Image src={`/icons/${logo.icon}.svg`} width={56} height={56} alt="" /></div>)}</div>)}
          </div></div>)}
        </div>
      </section>
      <section className={styles.section} id="community" aria-label="加入社区"><div className={styles.communityHeading}><div><p className={styles.eyebrow}>[07] 加入社区</p><h2>独自探索，<br />也和同路人相遇。</h2></div><div className={styles.communityCopy}><p>一个关于 AI 实践与开发交流的空间。<br />分享新发现，讨论卡住的问题，找伙伴把小想法做出来。</p><EntryAction entry="community" className={styles.textButton}>了解社区 <span aria-hidden="true">↗</span></EntryAction></div></div><div className={styles.communityLinks}>{communities.map((community) => <article key={community.name}><div className={styles.communityName}><Image src={`/icons/${community.icon}.svg`} width={30} height={30} alt="" /><h3>{community.name}</h3></div><p>{community.description}</p><ConnectionAction connection={community} community className={styles.secondaryButton}>加入 {community.name} <span aria-hidden="true">↗</span></ConnectionAction><small>邀请链接待配置</small></article>)}</div></section>
      <section className={styles.contributorsSection} id="contributors" aria-label="项目贡献者"><SectionHeading number="" label="" title="[08] 项目贡献者" description="每一份贡献都值得被看见。代码、设计、建议与分享，都是让项目持续向前的力量。" sample="个人与 AI 工具伙伴 / 邀请你加入" /><div className={styles.contributorGrid}>{contributors.map((person) => <div className={styles.contributor} key={person.name}>{person.avatar ? <Image src={person.avatar} width={64} height={64} alt="" /> : <span className={styles.contributorInviteMark} aria-hidden="true">+</span>}<span>{person.name}</span></div>)}</div></section>
    </main>
    <footer className={`${styles.shell} ${styles.footer}`}><div className={styles.footerLandscape}><div><p className={styles.eyebrow}>KEEP EXPLORING / KEEP BUILDING</p><h2>自由，是不断创造的可能。</h2><a className={styles.textButton} href="#about">回到起点 <span aria-hidden="true">↑</span></a></div><GitHubActivity /></div><div className={styles.footerGrid}><div className={styles.footerIntro}><a href="#about" className={styles.footerBrand}>freeman_</a><p>一个关于探索、记录与创造的个人空间。</p><span className={styles.smallLabel}>BUILD A LIFE OF YOUR OWN.</span></div><div className={styles.footerColumn}><h3>探索</h3><a href="#about">关于我</a><EntryAction entry="projects">项目</EntryAction><EntryAction entry="investment">投资</EntryAction><EntryAction entry="relay">AI 中转站 · 待开发</EntryAction></div><div className={styles.footerColumn}><h3>一起创造</h3>{navigation.filter((item) => item.entry && item.entry !== "relay").map((item) => <EntryAction key={item.label} entry={item.entry!}>{item.label}</EntryAction>)}</div><div className={styles.footerColumn}><h3>保持连接</h3><div className={styles.footerSocial}>{socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={styles.socialButton} />)}</div><div className={styles.footerCommunity}>{communities.map((community) => <ConnectionAction key={community.name} connection={community} community />)}</div></div></div><div className={styles.copyright}><span>© {new Date().getFullYear()} FreeMan</span><span>保持好奇，持续构建。 <span className={styles.titleDot}>[+]</span></span></div></footer>
  </div></FeedbackProvider>;
}
