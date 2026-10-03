import "server-only";

export const siteTitle = "FreeMan — 个人空间";
export const siteDescription = "在 AI 时代追求自由的年轻人，分享个人作品、AI 实践、学习与投资观察，连接开发合作、雇佣机会与社区交流。";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;
