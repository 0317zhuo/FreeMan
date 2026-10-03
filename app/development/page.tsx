import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import DevelopmentContent from "@/app/_components/development/development-content";
import { FeedbackProvider, Header } from "@/app/_components/landing/interactions";
import SiteFooter from "@/app/_components/landing/site-footer";
import styles from "@/app/_components/landing/landing.module.css";

const title = "找我开发业务 — FreeMan";
const description = "从一个清晰的问题出发，把需要的功能做成可用的产品。了解 Web、AI 应用、SaaS 与 AI 工具开发，以及合作流程和费用安排。";
const url = siteUrl ? new URL("/development", siteUrl).href : undefined;

export const metadata: Metadata = {
  title,
  description,
  alternates: url ? { canonical: url } : undefined,
  openGraph: { type: "website", locale: "zh_CN", siteName: "FreeMan", title, description, url },
  twitter: { card: "summary", title, description },
  robots: { index: Boolean(siteUrl), follow: true },
};

export default function DevelopmentPage() {
  return (
    <FeedbackProvider>
      <div className={styles.landing}>
        <a className={styles.skipLink} href="#main-content">跳转到主要内容</a>
        <Header currentEntry="development" />
        <main className={`${styles.shell} ${styles.developmentShell}`} id="main-content">
          <DevelopmentContent />
        </main>
        <SiteFooter homeHref="/#about" />
      </div>
    </FeedbackProvider>
  );
}
