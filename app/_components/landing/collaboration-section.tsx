import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { services } from "@/app/_data/landing";
import { EntryAction } from "./interactions";
import SectionHeading from "./section-heading";
import styles from "./landing.module.css";

export default function CollaborationSection() {
  return (
    <section
      className={styles.section}
      id="collaboration"
      aria-label="开发合作与雇佣"
    >
      <SectionHeading
        number=""
        label=""
        title="[04] 开发&雇佣"
        description="如果你有想法可以找我开发或者雇佣我工作，这是我的荣幸"
      />
      <div className={styles.collaborationGrid}>
        <div className={styles.development}>
          <h3>你有想法，我来构建。</h3>
          <p>从一个清晰的问题出发，把需要的功能做成可用的产品。</p>
          <div className={styles.services}>
            {services.map((service) => (
              <div key={service.name}>
                <Image
                  src={assetUrl(`/icons/${service.icon}.svg`)}
                  width={23}
                  height={23}
                  alt=""
                />
                <div>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <EntryAction entry="development" className={styles.primaryButton}>
            了解开发业务 <span aria-hidden="true">↗</span>
          </EntryAction>
        </div>
        <div className={styles.hire}>
          <div className={styles.hireCopy}>
            <h3>
              也愿成为，
              <br />
              团队的一份子。
            </h3>
            <p>连接产品与工程，让探索走向交付。</p>
            <ol className={styles.hireSteps}>
              <li>
                <span>[01]</span>
                <p>
                  <strong>介绍团队与岗位</strong> -
                  分享团队方向、岗位期待和当前挑战。
                </p>
              </li>
              <li>
                <span>[02]</span>
                <p>
                  <strong>沟通合作方式</strong> - 一起讨论职责、协作方式与目标。
                </p>
              </li>
              <li>
                <span>[03]</span>
                <p>
                  <strong>开始合作</strong> - 共同推进产品与工程交付。
                </p>
              </li>
            </ol>
            <EntryAction entry="hire" className={styles.secondaryButton}>
              了解雇佣合作 <span aria-hidden="true">↗</span>
            </EntryAction>
          </div>
        </div>
      </div>
    </section>
  );
}
