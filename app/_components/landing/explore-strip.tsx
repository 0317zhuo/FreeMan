import styles from "./landing.module.css";

export default function ExploreStrip() {
  return (
    <div className={styles.exploreStrip} id="possibilities">
      <p>
        一个空间，
        <br />
        <strong>不止一种可能。</strong>
      </p>
      <div>
        {[
          ["作品与探索", "projects", "01"],
          ["投资与观察", "investment", "02"],
          ["合作与成长", "collaboration", "03"],
          ["学习与连接", "courses", "04"],
        ].map(([label, id, index]) => (
          <a href={`#${id}`} key={id}>
            <span>{index}</span>
            {label}
            <span aria-hidden="true">↘</span>
          </a>
        ))}
      </div>
    </div>
  );
}
