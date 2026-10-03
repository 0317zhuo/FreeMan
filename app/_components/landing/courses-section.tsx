import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import { courses } from "@/app/_data/landing";
import { EntryAction } from "./interactions";
import styles from "./landing.module.css";

export default function CoursesSection() {
  return (
    <section
      className={`${styles.section} ${styles.coursesSection}`}
      id="courses"
      aria-labelledby="courses-title"
    >
      <div className={styles.sectionHeading}>
        <h2 id="courses-title">[05] 课程与学习</h2>
        <div className={styles.headingDescription}>
          <p>把复杂知识拆成可以实践的小步，也为下一次选择留出思考的空间。</p>
          <span className={styles.sampleBadge}>课程方向展示 · 详情待开发</span>
        </div>
      </div>
      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <article className={styles.courseCard} key={course.title}>
            <div className={styles.courseCardTop}>
              <h3>{course.title}</h3>
              <EntryAction entry="courses" className={styles.courseAction}>
                <span className={styles.srOnly}>了解{course.title}</span>
                <span className={styles.courseActionLabel} aria-hidden="true">
                  了解课程
                </span>
                <span aria-hidden="true">↗</span>
              </EntryAction>
            </div>
            <div className={styles.courseIcon}>
              <Image
                src={assetUrl(`/icons/${course.icon}.svg`)}
                width={76}
                height={76}
                alt={`${course.iconName} 图标`}
              />
            </div>
            <p>{course.audience}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
