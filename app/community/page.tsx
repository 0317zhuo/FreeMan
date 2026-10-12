import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import CommunityContent from "@/app/_components/community/community-content";
import { FeedbackProvider, Header } from "@/app/_components/landing/interactions";
import SiteFooter from "@/app/_components/landing/site-footer";
import styles from "@/app/_components/landing/landing.module.css";
import communityStyles from "@/app/_components/community/community.module.css";

const title = "加入社区 — FreeMan";
const description = "和同路人聊投资、开发、AI、创业与搞钱，寻找合作开发伙伴，获取站主分享的前沿内容、创业机会和学习资料，也可以在群内或单独咨询。";
const url = siteUrl ? new URL("/community", siteUrl).href : undefined;

export const metadata: Metadata = {
  title,
  description,
  alternates: url ? { canonical: url } : undefined,
  openGraph: { type: "website", locale: "zh_CN", siteName: "FreeMan", title, description, url },
  twitter: { card: "summary", title, description },
  robots: { index: Boolean(siteUrl), follow: true },
};

export default function CommunityPage() {
  return (
    <FeedbackProvider>
      <div className={`${styles.landing} ${communityStyles.communityTheme}`}>
        <a className={styles.skipLink} href="#main-content">跳转到主要内容</a>
        <Header currentEntry="community" />
        <main className={styles.shell} id="main-content">
          <CommunityContent />
        </main>
        <SiteFooter homeHref="/#about" />
      </div>
    </FeedbackProvider>
  );
}
