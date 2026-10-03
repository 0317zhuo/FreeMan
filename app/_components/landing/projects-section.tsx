import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { projects } from "@/app/_data/landing";
import ProjectParticleCard from "./project-particle-card";
import { ProjectRepositoryLink } from "./interactions";
import styles from "./landing.module.css";

export default function ProjectsSection() {
  return (
    <section
      className={`${styles.section} ${styles.projectsSection}`}
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className={styles.projectsHeading}>
        <h2 id="projects-title">[02] 我的项目</h2>
        <div className={styles.headingDescription}>
          <p>从个人工具到产品实验，在不同的问题里，寻找简单、好用的答案。</p>
          <span className={styles.sampleBadge}>包含示例作品 / 概念展示</span>
        </div>
      </div>
      <div className={styles.projectGrid}>
        {projects.slice(0, 3).map((project) => (
          <ProjectParticleCard artwork={project.artwork!} key={project.slug}>
            <div className={styles.projectCopy}>
              <h3>
                <Image
                  src={assetUrl(`/icons/${project.icon}.svg`)}
                  alt=""
                  width={20}
                  height={20}
                />
                {project.name}
              </h3>
              <p className={styles.projectCategory}>{project.category}</p>
              <p className={styles.projectDescription}>{project.description}</p>
              <ProjectRepositoryLink
                name={project.name}
                href={project.github}
              />
            </div>
          </ProjectParticleCard>
        ))}
      </div>
    </section>
  );
}
