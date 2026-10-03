# FreeMan

个人品牌网站，展示个人介绍、技术栈、作品、开发合作、课程方向与社区连接。使用 Next.js 16 App Router、React 19、TypeScript、CSS Modules 和 pnpm。

```sh
pnpm install
cp .env.example .env.local
pnpm dev
pnpm lint
pnpm build
```

构建使用静态导出，发布目录为 `out`。首页 H1 与浏览器标题保持现有内容；未完成的业务入口继续提供「待开发」提示。

## 文件职责

- `app/page.tsx`：首页区块组合与首页 SEO。
- `app/_components/landing/`：业务区块、局部交互、Canvas、共用落地页样式。
- `app/_components/status-page.tsx`：中文 404 与异常页的共用布局。
- `app/_data/entries.ts`：客户端需要的导航、入口状态及连接类型。
- `app/_data/landing.ts`：服务端首页内容。
- `app/_data/project-entries.ts`、`portfolio.ts`：保留的项目详情入口与持仓示例，不导入首页客户端。
- `lib/assets.ts`：统一素材地址；`lib/format.ts`：轻量金额格式化；`lib/site.ts`：站点描述与正式域名配置。

素材变量 `NEXT_PUBLIC_ASSET_BASE_URL` 留空时使用本地 `public`，填写对象存储/CDN 地址即可切换图片、图标、纹理与采样图，修改后需重新构建。

- [部署与素材配置](docs/deployment.md)
- [正式域名与 SEO TODO](docs/todo-domain-seo.md)
- [英文版本 TODO](docs/todo-internationalization.md)
- [本轮验证记录](docs/static-export-verification.md)
