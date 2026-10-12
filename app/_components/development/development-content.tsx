import { projects, services, socialPlatforms, technologies } from "@/app/_data/landing";
import { cooperationSteps, developmentFaqs, paymentStages, requirementChecklist } from "@/app/_data/development";
import { ConnectionAction, ProjectRepositoryLink } from "../landing/interactions";
import shared from "../landing/landing.module.css";
import styles from "./development.module.css";
import HeroTechnologies from "./hero-technologies";

export default function DevelopmentContent() {
  return (
    <div className={styles.content}>
      <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="development-title">
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <h1 id="development-title">你有想法，我来构建</h1>
            <p className={styles.heroDescription}>从一个清晰的问题出发，<br />把需要的功能做成可用的产品。</p>
            <p className={styles.introduction}>我是 FreeMan，一个在 AI 时代追求自由的年轻人。这里是我的开发合作介绍，也是我们一起把想法向前推进的起点。</p>
            <div className={shared.heroActions}>
              <a className={shared.primaryButton} href="#contact">聊聊你的需求 <span aria-hidden="true">↗</span></a>
              <a className={shared.secondaryButton} href="#work">看看项目 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <HeroTechnologies
            items={[
              ...technologies.flatMap((group) => group.items.map(([name, icon]) => ({ name, icon }))),
              { name: "Node.js", icon: "nodedotjs" },
            ]}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.servicesSection}`} id="services" aria-labelledby="services-title">
        <div className={styles.sectionHeading}>
          <h2 id="services-title">[01] 我的服务范围</h2>
          <p>从展示一个品牌，到解决一个具体问题，一起找到适合当前阶段的实现方式。</p>
        </div>
        <dl className={styles.serviceList}>
          {services.map((service, index) => (
            <div key={service.name}>
              <dt><span aria-hidden="true">[*]</span>{service.name}</dt>
              <dd>{service.description}{index === 0 ? "也可从一个静态网站开始。" : ""}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.otherIdeas}>有其他想法，或想构建不在列表里的产品？也欢迎加好友咨询。</p>
        <a className={`${shared.primaryButton} ${styles.serviceAction}`} href="#contact">聊聊你的需求 <span aria-hidden="true">→</span></a>
      </section>

      <section className={styles.section} id="work" aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <h2 id="work-title">[02] 案例参考</h2>
          <p>个人项目与产品想法，作为交流的起点。以下为可替换示例，非客户交付案例。</p>
        </div>
        <div className={styles.projectList}>
          {projects.slice(0, 3).map((project) => (
            <article className={styles.projectRow} key={project.slug}>
              <div>
                <h3>{project.name}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
              </div>
              <div className={styles.projectCopy}>
                <p>{project.description}</p>
                <p className={styles.projectTechnology}>技术：{project.tags.join(" / ")}</p>
                <ProjectRepositoryLink name={project.name} href={project.github} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="process" aria-labelledby="process-title">
        <div className={styles.sectionHeading}>
          <h2 id="process-title">[03] 合作流程</h2>
          <p>先把需求聊清楚，再开始开发。<br />每个阶段都围绕双方确认的目标推进。</p>
        </div>
        <ol className={styles.process}>
          {cooperationSteps.map((step, index) => (
            <li key={step.title}><span className={styles.stepNumber}>[{String(index + 1).padStart(2, "0")}]</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
          ))}
        </ol>
      </section>

      <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
        <div className={styles.sectionHeading}>
          <h2 id="pricing-title">[04] 付款方式</h2>
          <p>按需求范围评估报价，按开发阶段付款。<br />先确认工作内容，也确认彼此的预期。</p>
        </div>
        <div className={styles.paymentHeading}><h3>主要方案：4＋4＋2</h3><p>比例与节点在启动前确认。</p></div>
        <dl className={styles.paymentList}>
          {paymentStages.map((stage) => (
            <div key={stage.title}><dt>{stage.percent}% · {stage.title}</dt><dd>{stage.description}</dd></div>
          ))}
        </dl>
        <div className={styles.paymentAlternatives}>
          <div><h3>小项目</h3><p>可以采用「启动款＋交付尾款」，减少不必要的付款节点。</p></div>
          <div><h3>长周期项目</h3><p>可按里程碑收款，让付款与阶段进展对应。</p></div>
        </div>
        <p className={styles.pricingNote}>维护与迭代为可选服务，额外收费。最终费用、付款节点和交付范围以双方确认的约定为准。</p>
      </section>

      <section className={styles.section} id="faq" aria-labelledby="faq-title">
        <div className={styles.sectionHeading}><h2 id="faq-title">[05] FAQ</h2><p>合作前的一些常见问题。以下为初稿，具体条件以双方约定为准。</p></div>
        <div className={styles.faqList}>
          {developmentFaqs.map((faq) => (
            <details key={faq.question}><summary><span className={styles.faqMarker} aria-hidden="true" />{faq.question}</summary><p>{faq.answer}</p></details>
          ))}
        </div>
      </section>

      <section className={styles.section} id="contact" aria-labelledby="contact-title">
        <div className={styles.sectionHeading}>
          <h2 id="contact-title">[06] 添加好友</h2>
          <p>不用等想法完全成熟。<br />带着问题、需求或参考，一起聊聊。</p>
        </div>
        <div className={styles.contactLayout}>
          <div className={styles.contactCopy}>
            <h3>说说你，和你想做的产品。</h3>
            <p>添加好友后，请说明「开发合作」，并介绍你的需求。下面的清单可以帮助我们更快了解彼此的想法。</p>
            <div className={styles.contactLinks}>{socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={shared.socialButton} />)}</div>
            <p className={styles.contactNote}>{socialPlatforms.some((platform) => platform.href || platform.account || platform.qr) ? "请通过已配置的入口联系。目前暂不提供在线需求提交。" : "联系方式尚未配置，配置后可通过对应入口联系。目前暂不提供在线需求提交。"}</p>
          </div>
          <div className={styles.checklist}>
            <h3>聊之前，可以准备这些</h3>
            <ol>{requirementChecklist.map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></li>)}</ol>
            <p className={styles.checklistNote}>不需要一次准备齐全，先把最重要的问题说清楚。</p>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
