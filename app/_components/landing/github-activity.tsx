import styles from "./landing.module.css";

// 固定保存随机示意数据，刷新时保持相同的贡献分布。
const activityLevels =
  "40134300003003010323232040201034332021002220022000030032112103200101012230123101022200032000132031220112223300410001033241200112004441210220023032204010214010030103004140100000101314343133230112420100424023033310431322131121233233140304342420120303423140130000322202413240110202203030220202304103130001003012010033302110102231220243031244314321430322320300214120330103000";

export default function GitHubActivity() {
  return (
    <figure className={styles.githubActivity}>
      <figcaption className={styles.activityHeading}>
        GITHUB ACTIVITY
      </figcaption>
      <div
        className={styles.activityScroll}
        tabIndex={0}
        role="region"
        aria-label="全年 GitHub 活动图，可横向滚动查看"
      >
        <div className={styles.activityCalendar}>
          <div className={styles.activityMonths} aria-hidden="true">
            {Array.from({ length: 12 }, (_, month) => (
              <span
                key={month}
                style={{
                  gridColumn: `${Math.round((month * 53) / 12) + 1} / span 4`,
                }}
              >
                {month + 1}月
              </span>
            ))}
          </div>
          <div className={styles.activityBody}>
            <div className={styles.activityDays} aria-hidden="true">
              <span>一</span>
              <span>三</span>
              <span>五</span>
            </div>
            <div
              className={styles.activityGrid}
              role="img"
              aria-label="53 周活动热力图，灰色表示无活动，四档绿色从浅到深表示活动由少到多。"
            >
              {activityLevels.split("").map((level, index) => (
                <span
                  key={index}
                  className={styles.activityCell}
                  data-level={level}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.activityLegend}>
        <span>少</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={styles.activityCell}
            data-level={level}
            aria-hidden="true"
          />
        ))}
        <span>多</span>
      </div>
    </figure>
  );
}
