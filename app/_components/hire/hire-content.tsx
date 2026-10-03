import { projects, socialPlatforms } from "@/app/_data/landing";
import { badgeRoles, hiringChecklist, hiringFaqs, hiringSteps, roleDirections } from "@/app/_data/hire";
import HireBadge from "./hire-badge";
import { ConnectionAction, ProjectRepositoryLink } from "../landing/interactions";
import shared from "../landing/landing.module.css";
import styles from "../development/development.module.css";

export default function HireContent() {
  return (
    <div className={styles.content}>
      <section className={styles.hero} aria-labelledby="hire-title">
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <h1 id="hire-title">加入团队，一起构建</h1>
            <p className={styles.heroDescription}>从一个合适的岗位出发，<br />一起参与产品与工程交付。</p>
            <p className={styles.introduction}>我是 FreeMan，一个在 AI 时代追求自由的年轻人。2004 年出生，2026 年本科毕业，目前学历为本科。希望加入合适的团队，把想法逐步做成产品。</p>
            <div className={shared.heroActions}>
              <a className={shared.primaryButton} href="#contact">聊聊工作机会 <span aria-hidden="true">↗</span></a>
              <a className={shared.secondaryButton} href="#work">看看项目 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <HireBadge roles={badgeRoles} />
        </div>
      </section>

      <section className={styles.section} id="roles" aria-labelledby="roles-title">
        <div className={styles.sectionHeading}>
          <h2 id="roles-title">[01] 岗位意向</h2>
          <p>目前只考虑远程工作（线上办公）或成都线下工作。<br />工作时间、薪酬、劳动合同等具体事项，请添加好友详谈。</p>
        </div>
        <dl className={styles.serviceList}>
          {roleDirections.map((role) => (
            <div key={role.title}><dt><span aria-hidden="true">[*]</span>{role.title}</dt><dd>{role.description}</dd></div>
          ))}
        </dl>
        <p className={styles.otherIdeas}>各公司的岗位名称与职责要求可能不同，以上意向不表示具备岗位要求中的全部经验。如有其他合适岗位，也欢迎积极联系沟通。</p>
        <a className={`${shared.primaryButton} ${styles.serviceAction}`} href="#contact">聊聊工作机会 <span aria-hidden="true">→</span></a>
      </section>

      <section className={styles.section} id="work" aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <h2 id="work-title">[02] 作品与项目</h2>
          <p>以下为个人项目展示，其中部分为可替换示例，不代表商业交付或受雇经历。实际负责内容、项目状态与成果资料待进一步核实。</p>
        </div>
        <div className={styles.projectList}>
          {projects.slice(0, 3).map((project) => (
            <article className={styles.projectRow} key={project.slug}>
              <div><h3>{project.name}</h3><p className={styles.projectCategory}>{project.category}</p></div>
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
          <h2 id="process-title">[03] 沟通与入职流程</h2>
          <p>先了解彼此，再评估岗位匹配。<br />以下为沟通参考，具体招聘环节与时间以团队安排及双方确认为准。</p>
        </div>
        <ol className={styles.process}>
          {hiringSteps.map((step, index) => (
            <li key={step.title}><span className={styles.stepNumber}>[{String(index + 1).padStart(2, "0")}]</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
          ))}
        </ol>
      </section>

      <section className={styles.section} id="faq" aria-labelledby="faq-title">
        <div className={styles.sectionHeading}><h2 id="faq-title">[04] FAQ</h2><p>工作机会沟通前的一些常见问题。以下为初稿，具体安排通过双方沟通确认。</p></div>
        <div className={styles.faqList}>
          {hiringFaqs.map((faq) => (
            <details key={faq.question}><summary><span className={styles.faqMarker} aria-hidden="true" />{faq.question}</summary><p>{faq.answer}</p></details>
          ))}
        </div>
      </section>

      <section className={styles.section} id="contact" aria-labelledby="contact-title">
        <div className={styles.sectionHeading}>
          <h2 id="contact-title">[05] 添加好友</h2>
          <p>有合适的团队与岗位？<br />欢迎带着工作机会，一起聊聊。</p>
        </div>
        <div className={styles.contactLayout}>
          <div className={styles.contactCopy}>
            <h3>说说你的团队，和正在寻找的伙伴。</h3>
            <p>添加好友后，请说明「雇佣 / 入职机会」，简单介绍自己、团队与岗位方向。岗位说明或相关资料也可以一起分享。</p>
            <div className={styles.contactLinks}>{socialPlatforms.map((platform) => <ConnectionAction key={platform.name} connection={platform} className={shared.socialButton} />)}</div>
            <p className={styles.contactNote}>{socialPlatforms.some((platform) => platform.href || platform.account) ? "请通过已配置的入口联系。目前暂不提供在线申请表单。" : "联系方式尚未配置，配置后可通过对应入口联系。目前暂不提供在线申请表单。"}</p>
          </div>
          <div className={styles.checklist}>
            <h3>聊之前，可以准备这些</h3>
            <ol>{hiringChecklist.map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></li>)}</ol>
            <p className={styles.checklistNote}>不需要一次准备齐全，先介绍团队与岗位即可。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
