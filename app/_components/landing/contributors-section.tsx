import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { contributors } from "@/app/_data/landing";
import SectionHeading from "./section-heading";
import styles from "./landing.module.css";

export default function ContributorsSection() {
  return (
    <section
      className={styles.contributorsSection}
      id="contributors"
      aria-label="项目贡献者"
    >
      <SectionHeading
        number=""
        label=""
        title="[08] 项目贡献者"
        description="每一份贡献都值得被看见。代码、设计、建议与分享，都是让项目持续向前的力量。"
        sample="个人与 AI 工具伙伴 / 邀请你加入"
      />
      <div className={styles.contributorGrid}>
        {contributors.map((person) => (
          <div className={styles.contributor} key={person.name}>
            {person.avatar ? (
              <Image
                src={assetUrl(person.avatar)}
                width={64}
                height={64}
                alt=""
              />
            ) : (
              <span className={styles.contributorInviteMark} aria-hidden="true">
                +
              </span>
            )}
            <span>{person.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
