# TODO：正式域名与 SEO 上线

正式域名尚未确定。首页 H1 与 metadata 标题保持原内容；描述、Open Graph、Twitter 字段和中文 404 已完成。分享视觉复用 `public/images/hero.webp`，该图是现有原创生图素材，不新增虚构身份或业务信息。

- [ ] 确定唯一正式 HTTPS 域名，配置 `NEXT_PUBLIC_SITE_URL=https://正式域名/`。重新构建后首页自动输出 canonical、分享图绝对地址、WebSite JSON-LD，并将 robots metadata 切换为可索引。
- [ ] 创建 `app/sitemap.ts`，使用 `MetadataRoute.Sitemap` 与 `dynamic = "force-static"`，从 `lib/site.ts` 读取正式域名。目前只加入首页；不加入尚未开发的详情路径、404、锚点或示例项目详情。
- [ ] 在 `app/robots.ts` 添加正式 sitemap 绝对地址。允许爬虫读取页面；404 保持 noindex。
- [ ] 验证 `out/sitemap.xml`、`out/robots.txt`、canonical 和 OG/Twitter 图片地址，没有 localhost、示例域名或预览域名。
- [ ] 配置域名的 HTTPS 与唯一访问入口重定向；在托管平台配置，静态导出不支持 Next.js 请求时重定向。
- [ ] 正式站点与预览部署使用各自的构建环境。预览构建不填写 `NEXT_PUBLIC_SITE_URL`，避免预览副本被索引。
- [ ] 用分享预览工具检查图片与中文标题；视需要生成符合项目视觉规则的独立分享封面。当前复用图为 1200×1200。
- [ ] 提交 sitemap，检查搜索引擎实际抓取结果。后续真实页面完成后再加入 sitemap 与独立 metadata。

静态内容更新通过重新构建部署完成。不要将模拟资产、示例课程、未开放中转服务或固定生成的 GitHub 活动分布写成真实财务、商品或履历结构化数据。若补 Person 信息，只使用本人确认的公开资料与真实社交链接。

参考：Next.js [metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)、[sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)、[robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。
