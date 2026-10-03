"use client";

import StatusPage from "./_components/status-page";
import "./globals.css";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="zh-CN">
      <head><title>页面异常 — FreeMan</title><meta name="robots" content="noindex" /></head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <StatusPage code="ERROR" title="页面暂时无法打开" description="你可以重新尝试，或返回首页。若仍无法打开，请刷新页面或稍后再访问。"><button type="button" onClick={retry}>重新尝试</button></StatusPage>
      </body>
    </html>
  );
}
