export type Entry = { name: string; path: string; available: boolean };
export const entries = {
  development: { name: "开发业务", path: "/development", available: false },
  hire: { name: "雇佣介绍", path: "/hire", available: false },
  courses: { name: "课程", path: "/courses", available: false },
  relay: { name: "AI 中转站", path: "/ai-relay", available: false },
  community: { name: "社区介绍", path: "/community", available: false },
  projects: { name: "项目", path: "/projects", available: false },
  investment: { name: "投资详情", path: "/investment", available: false },
} satisfies Record<string, Entry>;
export type EntryKey = keyof typeof entries;
export const navigation: { label: string; entry?: EntryKey; href?: string; badge?: string }[] = [
  { label: "关于我", href: "#about" },
  { label: "找我开发业务", entry: "development" },
  { label: "雇佣我", entry: "hire" },
  { label: "课程", entry: "courses" },
  { label: "AI 中转站", entry: "relay", badge: "待开发" },
  { label: "加入社区", entry: "community" },
];
export type Connection = { name: string; icon: string; href?: string; account?: string };
