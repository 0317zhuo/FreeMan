import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./status-page.module.css";

export default function StatusPage({ code, title, description, children }: { code: string; title: string; description: string; children?: ReactNode }) {
  return (
    <main className={styles.page}>
      <Link className={styles.brand} href="/">freeman_</Link>
      <p className={styles.code}>[{code}]</p>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>{children}<Link href="/">返回首页 <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
