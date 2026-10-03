import type { Metadata } from "next";
import StatusPage from "./_components/status-page";

export const metadata: Metadata = {
  title: "页面未找到 — FreeMan",
  description: "页面不存在或链接已失效，请返回 FreeMan 首页继续探索。",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <StatusPage code="404" title="页面未找到" description="页面不存在或链接已失效，你可以返回首页继续探索。" />;
}
