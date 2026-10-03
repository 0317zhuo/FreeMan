import styles from "./landing.module.css";

export default function SectionHeading({
  number,
  label,
  title,
  description,
  sample,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  sample?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        {number && (
          <p className={styles.eyebrow}>
            [{number}] {label}
          </p>
        )}
        <h2>{title}</h2>
      </div>
      <div className={styles.headingDescription}>
        <p>{description}</p>
        {sample && <span className={styles.sampleBadge}>{sample}</span>}
      </div>
    </div>
  );
}
