import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import HireContent from "@/app/_components/hire/hire-content";
import { FeedbackProvider, Header } from "@/app/_components/landing/interactions";
import SiteFooter from "@/app/_components/landing/site-footer";
import styles from "@/app/_components/landing/landing.module.css";

const title = "雇佣我 — FreeMan";
const description = "了解 FreeMan 的岗位意向、个人项目与入职沟通流程。目前只考虑远程工作（线上办公）或成都线下工作，欢迎交流合适的团队与工作机会。";
const url = siteUrl ? new URL("/hire", siteUrl).href : undefined;

export const metadata: Metadata = {
  title,
  description,
  alternates: url ? { canonical: url } : undefined,
  openGraph: { type: "website", locale: "zh_CN", siteName: "FreeMan", title, description, url },
  twitter: { card: "summary", title, description },
  robots: { index: Boolean(siteUrl), follow: true },
};

export default function HirePage() {
  return (
    <FeedbackProvider>
      <div className={styles.landing}>
        <a className={styles.skipLink} href="#main-content">跳转到主要内容</a>
        <Header currentEntry="hire" />
        <main className={styles.shell} id="main-content">
          <HireContent />
        </main>
        <SiteFooter homeHref="/#about" />
      </div>
    </FeedbackProvider>
  );
}
