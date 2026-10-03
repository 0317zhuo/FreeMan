# 静态部署与素材配置

首页采用构建时静态预渲染，暂不启用 SSR、ISR 或 PPR。Cloudflare Pages 构建命令为 `pnpm build`，发布目录为 `out`。配置已启用 `output: "export"` 与 `images.unoptimized`。

## 本地开发与构建

```sh
pnpm install
cp .env.example .env.local
pnpm dev
pnpm lint
pnpm build
```

静态导出后不要使用 `next start`；预览 `out` 可使用静态文件服务器。开发时继续使用 `pnpm dev`。部署平台应读取整个 `out`，包含 `_next`、`images`、`icons`、`404.html` 与 `robots.txt`。确认随机不存在的 URL 返回 HTTP 404 和中文页面，不配置将所有路径改写到首页的 SPA 回退。

## 素材加载路径

统一通过 `lib/assets.ts` 的 `assetUrl` 拼接图片、品牌图标、CSS 纹理与 Canvas 采样素材地址。

- `NEXT_PUBLIC_ASSET_BASE_URL` 留空：使用本地 `/images/...` 与 `/icons/...`。
- 设置为 `https://cdn.example.com/freeman`：使用 `https://cdn.example.com/freeman/images/...` 与 `https://cdn.example.com/freeman/icons/...`。
- 可以设置目录前缀；末尾斜杠会自动去除。示例域名仅作配置说明，项目默认不请求它。
- 将 `public/images`、`public/icons` 按相同目录结构上传到对象存储，包含优化后的 `*-128.webp` 与 `*-optimized.webp`。
- 使用公开读取的 HTTPS 地址，不把凭证、私有存储密钥或会过期的签名写入 `NEXT_PUBLIC_` 环境变量。
- Next.js 在构建时固定这些变量。修改本地 `.env.local` 或部署平台构建环境变量后，需要重新构建和发布；无需修改组件源码。

Canvas 使用 `crossOrigin="anonymous"` 读取像素。远程采样资源必须允许站点来源的跨域 GET 请求（公开静态资源可使用 `Access-Control-Allow-Origin: *`）；否则保留静态回退，动效不会就绪。实际上线前分别验证普通图片显示和 Canvas 的 `data-ready="true"`，图片可显示并不代表像素可跨域读取。

`next/image` 在静态导出中保留尺寸与懒加载，已关闭运行时图片处理。图片须在上传前控制尺寸和体积；不要期待平台提供 `/_next/image`。Next.js 生成的 JS、CSS、字体及 favicon 仍随站点托管，素材变量不修改这些框架资源。

项目采样素材在接近视口 200px 时请求；减少动态效果时保留静态回退，不请求采样素材。Hero 同样在可见且允许动效时加载采样素材。合作与课程背景纹理接近视口时才加载，页面内容不依赖装饰图。

## 正式域名与后续迁移

`NEXT_PUBLIC_SITE_URL` 留空时，首页输出 `noindex`，不生成虚构的 canonical、分享绝对地址或 WebSite 结构化数据。正式域名确定后按 `docs/todo-domain-seo.md` 完成配置与 sitemap。

Cloudflare Pages 优先保留平台默认缓存；不要无依据地给 HTML 或未带版本号的素材设置长时间 immutable 缓存。对象存储长期缓存的文件宜使用版本化文件名，更新后验证缓存是否生效。

备案完成后按计划迁移 EdgeOne Makers 并使用包含中国大陆的加速区域。迁移时重新核查平台当前域名、构建、404、缓存与 HTTPS 配置，继续部署静态产物即可。若未来加入动态业务，再评估 Next.js 运行环境与适配支持。
