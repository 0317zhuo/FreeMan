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
export const socialPlatforms: Connection[] = [
  { name: "微信", icon: "wechat" }, { name: "QQ", icon: "qq" },
  { name: "Telegram", icon: "telegram" }, { name: "X", icon: "x" },
];
export const communities: (Connection & { description: string })[] = [
  { name: "Discord", icon: "discord", description: "主题讨论 · 项目协作" },
  { name: "Telegram", icon: "telegram", description: "灵感分享 · 日常交流" },
  { name: "QQ", icon: "qq", description: "中文交流 · 一起实践" },
  { name: "微信", icon: "wechat", description: "日常交流 · 社群连接" },
];
export const relayLogoGroups = [
  [{ name: "OpenAI", icon: "openai" }, { name: "DeepSeek", icon: "deepseek" }, { name: "Google Gemini", icon: "googlegemini" }, { name: "Qwen", icon: "qwen" }],
  [{ name: "Anthropic Claude", icon: "claude" }, { name: "xAI Grok", icon: "grok" }, { name: "Perplexity", icon: "perplexity" }, { name: "Meta", icon: "meta" }],
];
export const technologies = [
  { category: "LANGUAGES", label: "编程语言", items: [["TypeScript", "typescript"], ["Python", "python"], ["Rust", "rust"]] },
  { category: "FRONTEND", label: "前端", items: [["Next.js", "nextdotjs"], ["React", "react"], ["Tailwind CSS", "tailwindcss"]] },
  { category: "BACKEND", label: "后端", items: [["Hono", "hono"], ["tRPC", "trpc"], ["NestJS", "nestjs"]] },
  { category: "DATA", label: "数据层", items: [["Drizzle ORM", "drizzle"], ["PostgreSQL", "postgresql"], ["Redis", "redis"]] },
  { category: "MIDDLEWARE", label: "中间件", items: [["RabbitMQ", "rabbitmq"], ["Elasticsearch", "elasticsearch"], ["ZooKeeper", "rag"]] },
  { category: "CI/CD", label: "持续集成与交付", items: [["Docker", "docker"], ["Git", "git"], ["GitHub Actions", "githubactions"]] },
  { category: "AI & LLM", label: "AI 与大语言模型", items: [["LangChain", "langchain"], ["Vercel AI SDK", "vercel"], ["RAG", "rag"]] },
  { category: "COLLABORATION", label: "合作伙伴", items: [["Claude Code", "claude"], ["Codex", "openai"], ["OpenCode", "opencode"]] },
];
export const projects = [
  { slug: "mind-workspace", name: "Mind Workspace", category: "AI 应用 / 知识工作台", description: "让散落的笔记与文档，成为可以对话的知识。一个从收集、检索到整理的个人工作空间。", tags: ["Next.js", "RAG", "PostgreSQL"], mark: "01 / KNOWLEDGE", artwork: "project-knowledge-dot-source", icon: "nextdotjs", github: "" },
  { slug: "freeman-web", name: "FreeMan Web", category: "Web / 个人空间", description: "把作品、想法和连接，放进一个持续生长的个人网站。", tags: ["React", "TypeScript"], mark: "02 / PERSONAL", artwork: "project-personal-dot-source", icon: "react", github: "https://github.com/0317zhuo/FreeMan" },
  { slug: "tiny-saas", name: "Tiny SaaS", category: "SaaS / 工作流", description: "面向小团队的轻量任务工具，让日常协作少一点重复。", tags: ["Node.js", "PostgreSQL"], mark: "03 / WORKFLOW", artwork: "project-workflow-dot-source", icon: "nodedotjs", github: "" },
  { slug: "prompt-lab", name: "Prompt Lab", category: "AI 工具 / 创意实验", description: "收集、组织和比较提示词，让好用的方法可以再次使用。", tags: ["Python", "LLM API"], mark: "04 / EXPERIMENT" },
];
export const projectEntries: Record<string, Entry> = Object.fromEntries(projects.map((project) => [project.slug, { name: `${project.name} 项目详情`, path: `${entries.projects.path}/${project.slug}`, available: false }]));
export const services = [
  { name: "Web 开发", description: "品牌网站、内容平台与交互界面。", icon: "nextdotjs" },
  { name: "AI 应用开发", description: "知识库问答、智能助手与业务自动化。", icon: "openai" },
  { name: "SaaS 开发", description: "从产品原型到可迭代的应用系统。", icon: "nodedotjs" },
  { name: "AI 工具开发", description: "围绕具体问题，构建轻量实用工具。", icon: "python" },
];
export const courses = [
  { title: "AI基础使用", audience: "适合没有任何基础的小白", icon: "openai", iconName: "OpenAI" },
  { title: "AI进阶使用", audience: "适合已具备一定基础或已学完第一个课程的朋友", icon: "claude", iconName: "Claude" },
  { title: "AI实战训练", audience: "适合有一定基础且掌握AI进阶的朋友", icon: "langchain", iconName: "LangChain" },
  { title: "编程基础学习", audience: "适合想学编程但无任何基础的小白", icon: "python", iconName: "Python" },
  { title: "编程进阶学习", audience: "适合想做大型项目且有一定编程基础的朋友", icon: "typescript", iconName: "TypeScript" },
  { title: "项目实战教学", audience: "适合有编程基础且想做项目积攒经验的朋友", icon: "nextdotjs", iconName: "Next.js" },
];
export const contributors: { name: string; avatar?: string }[] = [
  { name: "zhuo", avatar: "/images/avatar-0317zhuo.jpg" },
  { name: "Claude Code", avatar: "/icons/claude-app.jpg" },
  { name: "Codex（ChatGPT）", avatar: "/icons/codex-app.jpg" },
  { name: "Gemini", avatar: "/icons/gemini-app.jpg" },
  { name: "DeepSeek", avatar: "/icons/deepseek-app.jpg" },
  { name: "期待您成为下一个贡献者" },
];

// 全部为静态示例；price 为原币种单价，rate 为每单位原币换算 CNY。
export const valuation = { date: "2026-09-30", rates: { USD: 7.1, HKD: 0.91, CNY: 1 } };
export type Currency = keyof typeof valuation.rates;
export const markets: { id: string; name: string; currency: Currency; assets: { symbol: string; name: string; quantity: number; price: number }[] }[] = [
  { id: "us", name: "美股", currency: "USD", assets: [{ symbol: "AAPL", name: "苹果", quantity: 20, price: 220 }, { symbol: "MSFT", name: "微软", quantity: 10, price: 420 }, { symbol: "NVDA", name: "英伟达", quantity: 30, price: 120 }] },
  { id: "crypto", name: "加密市场", currency: "USD", assets: [{ symbol: "BTC", name: "比特币", quantity: 0.1, price: 65000 }, { symbol: "ETH", name: "以太坊", quantity: 2, price: 2800 }] },
  { id: "cn", name: "A股", currency: "CNY", assets: [{ symbol: "510300", name: "沪深300 ETF", quantity: 5000, price: 4 }, { symbol: "600519", name: "贵州茅台", quantity: 10, price: 1500 }] },
  { id: "hk", name: "港股", currency: "HKD", assets: [{ symbol: "00700", name: "腾讯控股", quantity: 100, price: 400 }, { symbol: "09988", name: "阿里巴巴", quantity: 200, price: 90 }] },
];
export const marketValue = (market: (typeof markets)[number]) => market.assets.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);
export const totalCny = markets.reduce((sum, market) => sum + marketValue(market) * valuation.rates[market.currency], 0);
export const formatAmount = (value: number) => value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const portfolioPercent = (valueCny: number) => `${(valueCny / totalCny * 100).toFixed(1)}%`;
