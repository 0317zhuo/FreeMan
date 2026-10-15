import "server-only";
import type { Connection } from "./entries";

export const socialPlatforms: Connection[] = [
  { name: "微信", icon: "wechat", qr: { src: "/images/qr-wechat.png", width: 760, height: 760 } },
  { name: "QQ", icon: "qq", account: "1417378282", qr: { src: "/images/qr-qq.png", width: 1270, height: 1900 } },
  { name: "Telegram", icon: "telegram", account: "@ZHUOCRYPTO", qr: { src: "/images/qr-telegram.png", width: 950, height: 1220 } },
  { name: "X", icon: "x", href: "https://x.com/wangzhuo355194" },
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
  { slug: "freecode", name: "FreeCode", category: "AI 工具 / 终端编码助手", description: "在终端里与 AI 一起写代码。支持多模型对话、本机工具调用与工作区会话管理。", tags: ["TypeScript", "Bun", "Hono", "OpenTUI", "AI SDK"], mark: "01 / CODE", artwork: "project-knowledge-dot-source", icon: "typescript", github: "https://github.com/0317zhuo/FreeCode" },
  { slug: "freeman", name: "FreeMan", category: "Web / 个人品牌网站", description: "展示作品、分享探索，也连接开发合作、工作机会与社区。这个持续构建的个人空间，就是你正在浏览的网站。", tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"], mark: "02 / PERSONAL", artwork: "project-personal-dot-source", icon: "nextdotjs", github: "https://github.com/0317zhuo/FreeMan" },
  { slug: "freedeboard", name: "freedeboard", category: "Web3 / 以太坊生态看板", description: "追踪以太坊生态代币价格，连接钱包查看多链持仓与资产价值，探索链上资产管理。", tags: ["Next.js", "TypeScript", "wagmi", "viem"], mark: "03 / WEB3", artwork: "project-workflow-dot-source", icon: "react", github: "https://github.com/0317zhuo/freedeboard" },
  { slug: "prompt-lab", name: "Prompt Lab", category: "AI 工具 / 创意实验", description: "收集、组织和比较提示词，让好用的方法可以再次使用。", tags: ["Python", "LLM API"], mark: "04 / EXPERIMENT" },
];
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
  { name: "zhuo", avatar: "/images/avatar-0317zhuo-128.webp" },
  { name: "Claude Code", avatar: "/icons/claude-app-128.webp" },
  { name: "Codex（ChatGPT）", avatar: "/icons/codex-app-128.webp" },
  { name: "Gemini", avatar: "/icons/gemini-app-128.webp" },
  { name: "DeepSeek", avatar: "/icons/deepseek-app-128.webp" },
  { name: "期待您成为下一个贡献者" },
];
