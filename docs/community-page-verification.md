# 加入社区页面验收记录

## 实现范围（2026-10-06）

- 新增 `/community` 独立页面，覆盖开放交流、合作开发、站主分享、群内与单独咨询四项功能。
- 交流区包含投资、开发、AI、创业、搞钱和日常六个方向。合作区介绍寻找伙伴、共同开发、积累经验与探索收入，并给出说清想法、找到伙伴、约定合作、一起交付四步流程，不承诺收益。
- 分享区介绍前沿内容、创业机会与学习资料，不虚构已发布内容、分享频率或付费权益。咨询区区分群内讨论和个人联系，没有聊天系统、提交表单或在线预约。
- 延续首页暖白、近黑、等宽字体与细分割线，采用首屏图文分栏、功能导航、六项话题矩阵、合作图文与流程、浅色分享列表、双栏咨询与四个平台入口等布局。清除社区页面的蓝色点缀、无信息的英文类别、环绕小符号和重复说明；有意义的步骤编号与标题编号均为黑色。深色分享整区取消。
- 用户提出图片不满意后重新生成 `community-connections.webp` 和 `community-build-bridges.webp`，分别表现点阵丝带路径与三座互联平台。均为真实 Alpha 透明背景，不使用白色画布或混合模式；由 Sharp 缩放和压缩时保留透明通道。完整重制提示词见 `generated-assets.md`。没有复用现有装饰图片。品牌图标复用现有资源，许可不变。
- 复用 Header、SiteFooter、FeedbackProvider 与 ConnectionAction；正文、话题与分享数据为服务端内容。`entries.community.available` 已启用：首页「了解社区」、主导航与页脚均进入实际页面，当前导航标记为 `aria-current="page"`。

## 实际验证

- `pnpm lint`、`pnpm build` 通过，静态导出生成 `out/community.html` 与客户端导航使用的静态 payload。
- 检查导出 HTML：21 项不同的本地图片、脚本、样式与预加载资源引用均存在；六个不同的页内锚点均有目标，无重复 id。正式域名为空时输出 `noindex, follow`，沿用其他内页的域名配置方式。
- 使用临时静态服务器预览 `out`，为已有路由提供 `.html` 映射，未知路径不回退首页。
- 实际浏览器检查 1440、1024、768、390、320px：文档宽度与视口一致，正文元素无横向溢出，只有一个 main。宽屏话题为三列、中屏与常规手机两列，320px 为单列；合作流程从四列变为两列和单列，咨询区与加入入口在手机堆叠。
- 查看桌面首屏、合作区、整页，以及手机首屏、加入区与整页实际渲染；两张新图和正文中所有社交／社区图标在滚动到可见范围后加载成功。
- Discord 加入按钮使用 Enter 触发「邀请链接待配置」状态提示；关闭按钮使用 Escape 后，提示关闭且焦点恢复到原按钮。Telegram、QQ、微信加入按钮分别显示正确的平台提示。个人社交入口现显示对应二维码，X 打开用户配置的个人主页；社区群邀请仍待配置。
- 手机菜单使用 Enter 打开，当前导航显示「加入社区」；Escape 关闭，焦点回到菜单按钮。
- 实际通过品牌链接返回首页，再从首页「了解社区」进入新页面；新页面正文与当前导航标记正确。导出的首页、开发页与雇佣页 HTML 均包含 `/community` 链接。
- 页面只新增轻量背景悬停反馈，复用 `.landing` 的 `prefers-reduced-motion` 规则关闭过渡；未新增持续动画、Canvas 或计时器。减少动态效果媒体设置只检查了代码与样式，未通过实际系统设置或媒体模拟验证。
- 浏览器控制台检查无错误或警告。

## 个人社交二维码更新（2026-10-12）

- 微信、QQ、Telegram 个人二维码已接入首页、页脚、开发页、雇佣页和社区页共用的社交入口；点击后在视口中央显示紧凑二维码弹层，支持关闭按钮、Escape 与焦点恢复。X 入口打开 `https://x.com/wangzhuo355194`。
- QQ 截图已裁为个人资料卡片，Telegram 截图已裁出二维码卡片；微信图片保留二维码主体。二维码图存于 `public/images/qr-wechat.png`、`qr-qq.png`、`qr-telegram.png`，入口数据位于 `app/_data/landing.ts`。
- 实际浏览器验证首页 QQ、Telegram 弹层和 Escape 关闭；本轮未逐页重复验证所有复用入口，未扫描二维码验证外部账号状态。

## 截图与维护

- 桌面整页：`screenshots/community/desktop-1440.jpg`；手机整页：`screenshots/community/mobile-390.jpg`；桌面首屏：`screenshots/community/preview-1440.jpg`。
- 正文在 `app/_components/community/community-content.tsx`；样式在同目录 `community.module.css`。
- 话题、协作步骤与分享方向在 `app/_data/community.ts`。
- 群邀请与加入方式在 `app/_data/landing.ts` 的 `communities`；个人社交账号和二维码在 `socialPlatforms`。二维码图片保存在 `public/images/qr-*.png`。
- 两张新图通过 `assetUrl()` 加载，沿用已有素材域名配置。未验证远程对象存储、真实设备、真实群邀请或正式域名；未部署、未测量网络性能与 Core Web Vitals。
