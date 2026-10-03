# 静态导出与素材配置验收（2026-10-03）

## 已验证

- 首页按业务区域提取到 `app/_components/landing`，保留原 H1、浏览器标题、正文、导航意图与入口可用状态。导航/连接类型、服务端内容、保留的项目入口和持仓示例分离；生产客户端 JS 不包含 AAPL、510300 或 prompt-lab 等未展示数据。
- 启用 `output: "export"`、`images.unoptimized`。本地配置下生成 `out/index.html`、中文 `404.html`、`robots.txt`，检查 78 个图片引用均对应有效本地文件，不再请求 `/_next/image`。本地静态服务器首页/robots 返回 200，随机不存在路径返回中文 404；实际键盘 Enter 验证 404 返回首页。
- 使用临时构建环境 `NEXT_PUBLIC_ASSET_BASE_URL=http://localhost:3106/freeman/`、`NEXT_PUBLIC_SITE_URL=https://freeman.test/` 验证目录前缀、canonical、OG/Twitter 绝对图片地址、WebSite JSON-LD 与索引切换。远程素材由另一个本地端口模拟公开对象存储并允许 CORS，实际浏览器确认三张项目 Canvas 就绪、图片正常。
- 最终重新构建为空环境变量的本地版本，确认产物没有测试地址；正式域名未配置时首页 noindex，canonical、绝对分享地址与结构化数据不输出，sitemap 待办记录在 `todo-domain-seo.md`。
- 在 1440、1024、768、390、320px 读取实际布局，文档宽度等于视口宽度；项目桌面三列、手机单列，课程宽屏三列、中屏两列、手机单列。已查看桌面项目、手机首页/合作区域、中文 404 的实时截图。
- 首屏检查项目 Canvas 未采样、背景纹理未赋值；接近对应区域后采样和加载纹理。实际浏览器验证仓库待配置提示、课程入口、移动菜单的 Enter 操作、Escape 关闭与焦点恢复；控制台无警告或异常。
- 临时 Node 检查执行实际两个 Canvas 组件的 Effect，验证离屏/后台不请求、减少动态效果时不请求、偏好切换/后台恢复后正常就绪、跨域属性在 src 前设置、解码与采样失败时静态回退、卸载后不提交就绪状态。
- 头像 WebP 副本与纹理优化复用原素材，原文件保留。最终 `pnpm lint`、`pnpm build`、`git diff --check` 均通过。

## 验证边界

- 减少动态效果、后台与失败分支通过模拟验证，未修改系统偏好；未在真实触控设备验证。
- 未连接真实对象存储或域名，也未部署。上线后仍需验证实际 CORS、HTTPS、缓存、分享预览及大陆/海外网络表现。
- 状态页已通过构建与类型检查；未向生产站点注入渲染异常。
- 本轮没有测量真实用户 Core Web Vitals，没有保存新的截图文件。
- 正式域名与英文版本分别见 `todo-domain-seo.md`、`todo-internationalization.md`。当前同步静态首页无需路由 loading，装饰动效使用现有静态回退。
