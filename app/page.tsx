import type { Metadata } from "next";
import { assetUrl } from "@/lib/assets";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import Hero from "./_components/landing/hero";
import ExploreStrip from "./_components/landing/explore-strip";
import TechnologySection from "./_components/landing/technology-section";
import ProjectsSection from "./_components/landing/projects-section";
import Investment from "./_components/landing/investment";
import CollaborationSection from "./_components/landing/collaboration-section";
import CoursesSection from "./_components/landing/courses-section";
import RelaySection from "./_components/landing/relay-section";
import CommunitySection from "./_components/landing/community-section";
import ContributorsSection from "./_components/landing/contributors-section";
import ClosingSection from "./_components/landing/closing-section";
import SiteFooter from "./_components/landing/site-footer";
import DeferredTextures from "./_components/landing/deferred-textures";
import { FeedbackProvider, Header } from "./_components/landing/interactions";
import styles from "./_components/landing/landing.module.css";

const shareImage = siteUrl
  ? new URL(assetUrl("/images/hero.webp"), siteUrl).href
  : undefined;

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "FreeMan",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl?.href,
    images: shareImage
      ? [{ url: shareImage, alt: "FreeMan 原创概念视觉" }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: shareImage ? [shareImage] : undefined,
  },
  // 正式域名确定前作为预览站点；配置后重新构建即可开放首页索引。
  robots: { index: Boolean(siteUrl), follow: true },
};

export default function Home() {
  return (
    <FeedbackProvider>
      <div className={styles.landing}>
        {siteUrl && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "FreeMan",
                url: siteUrl.href,
                description: siteDescription,
                inLanguage: "zh-CN",
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <a className={styles.skipLink} href="#main-content">
          跳转到主要内容
        </a>
        <Header />
        <main className={styles.shell} id="main-content">
          <Hero />
          <ExploreStrip />
          <TechnologySection />
          <ProjectsSection />
          <section
            className={styles.assetSection}
            id="investment"
            aria-labelledby="assets-title"
          >
            <Investment />
          </section>
          <CollaborationSection />
          <CoursesSection />
          <RelaySection />
          <CommunitySection />
          <ContributorsSection />
          <ClosingSection />
        </main>
        <SiteFooter />
        <DeferredTextures />
      </div>
    </FeedbackProvider>
  );
}
