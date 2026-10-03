"use client";

import StatusPage from "./_components/status-page";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <StatusPage code="ERROR" title="页面暂时无法正常显示" description="你可以重新尝试。如果问题持续，请刷新页面或稍后再访问。"><button type="button" onClick={retry}>重新尝试</button></StatusPage>;
}
