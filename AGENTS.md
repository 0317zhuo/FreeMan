# FreeMan 项目开发指南

## 项目定位与语言

FreeMan 是个人品牌网站，面向个人展示、项目分享、开发合作、雇佣机会、课程咨询和社区连接。首屏现有主题是「在 AI 时代追求自由的年轻人」。

- 所有回复、解释、提问及新增项目说明使用简体中文；代码、技术术语和命令可保留原文。
- 本文件记录网站全貌与持续开发约束，不代表所有规划功能都已经完成。
- 保留用户已修改的内容；未经当前任务要求，不改写个人定位、不虚构资历、案例、社交账号、收入或投资业绩。

## 技术栈与文件职责

- Next.js 16 App Router、React 19、TypeScript；使用 pnpm 管理依赖。
- Tailwind CSS 4 已配置；当前页面的具体样式使用 CSS Modules。
- `app/page.tsx`：首页区块组合、首页 metadata 与 WebSite 结构化数据，默认服务端组件。
- `app/development/page.tsx`：找我开发业务页面组合与独立 metadata；`app/_components/development/` 保存服务端正文和响应式 CSS Modules；`app/_data/development.ts` 保存合作流程、付款阶段、FAQ 初稿与需求准备清单。
- `app/hire/page.tsx`：雇佣我页面组合与独立 metadata；`app/_components/hire/hire-content.tsx` 保存服务端正文，直接复用开发业务页 CSS；`hire-badge.tsx` 与 `hire-badge.module.css` 保存 Hero 右侧个人工牌、岗位轮播与 CSS 鼠标倾斜，保留挂绳孔，不展示吊带；`app/_data/hire.ts` 保存工牌岗位名称、岗位方向、入职沟通流程、FAQ 初稿与招聘沟通清单。
- `app/_components/landing/`：Hero、技术栈、项目、合作、课程、社区、贡献者与页脚区块；`landing.module.css` 保存共用布局、响应式样式与动效。
- `app/_components/landing/social-links.tsx`：Hero 社交入口的服务端组合。
- `app/_components/landing/closing-section.tsx`：首页独立收尾区块（KEEP EXPLORING / KEEP BUILDING 与 GitHub 活跃展示），不属于页脚；`site-footer.tsx` 仅复用站点介绍、底部导航、联系方式与版权。
- `app/_components/landing/project-particle-card.tsx`、`hero-dot-scene.tsx`：采样原创素材绘制 Canvas；素材按可见性与减少动态效果偏好加载，失败时保留静态回退。
- `app/_components/landing/interactions.tsx`：客户端导航、入口、连接按钮与状态提示；支持 Escape 和焦点恢复。
- `app/_components/landing/investment.tsx`：总资产模拟展示，不接入真实资产。
- `app/_components/landing/deferred-textures.tsx`：接近视口时加载合作与课程纹理。
- `app/_data/entries.ts`：导航、未来页面入口与连接类型；`landing.ts`：服务端首页内容；`project-entries.ts` 与 `portfolio.ts`：保留的详情入口、示例持仓与计算函数，不进入首页客户端。
- `lib/assets.ts`：通过 `NEXT_PUBLIC_ASSET_BASE_URL` 统一素材地址；`lib/format.ts`：轻量金额格式化；`lib/site.ts`：站点描述与可选正式域名。
- `app/not-found.tsx`、`error.tsx`、`global-error.tsx`：中文 404 与异常恢复页面，共用 `app/_components/status-page.tsx`。
- `app/globals.css`：全局颜色、等宽字体、基础样式与可访问性设置。
- `app/layout.tsx`：根布局、页面元信息、语言和字体加载。
- `public/`：本地静态资源；`public/icons/` 保存网上获取的图标及来源、许可说明；`public/images/` 保存原创生图 WebP 素材与 16 张示例插画头像。
- `docs/generated-assets.md`：生图方式、提示词及素材用途；`docs/static-export-verification.md`：静态导出、素材配置、五种屏宽与交互验收记录及验证边界。
- `docs/development-services-page-verification.md`：开发业务页的实现范围、浏览器验收、验证边界与内容维护位置。
- `docs/hire-page-verification.md`：雇佣页的实现范围、静态导出与浏览器验收、内容维护位置。
- `DESIGN.md`：视觉系统参考，包含色彩、字号、留白、组件与响应式规范。
- 页面默认使用服务端组件，仅需要状态或浏览器 API 的局部组件添加 `"use client"`。

## 后续 AI 开发的关键约束

### 组件与数据边界

- 新增首页区块放在 `app/_components/landing/`，由 `app/page.tsx` 组合；不要把完整区块、数据和交互重新堆回首页入口。只有被多个区块使用或确有独立维护价值的内容才继续提取，避免为简单文案建立通用组件体系。
- `app/_data/landing.ts`、`project-entries.ts`、`portfolio.ts` 使用 `server-only`，客户端组件不得直接导入。通过服务端组合传入必要字段；不要为了一个按钮将完整项目列表、持仓或语言字典传给客户端。
- `app/_data/entries.ts` 仅保留交互所需的轻量入口和类型。新增数据先判断属于服务端正文还是客户端状态，避免绕过现有边界另建混合数据文件。
- 修改区块 `id`、CSS 自定义属性或素材字段时，同时检查导航锚点、`aria-labelledby`、延迟纹理与 Canvas 的引用，避免拆分后出现静默失效。

### 素材、字体与动效

- 新增图片、品牌图标、CSS 纹理和 Canvas 采样地址统一通过 `lib/assets.ts` 的 `assetUrl()`。参数使用 `/images/...` 或 `/icons/...` 这类 public 根路径，不包含 `public`，不在组件或 CSS 中硬编码对象存储域名。
- `NEXT_PUBLIC_ASSET_BASE_URL` 留空表示本地素材，可配置带目录前缀的公开 HTTPS 地址。所有 `NEXT_PUBLIC_` 配置都会暴露给浏览器并在构建时固定；不得存放密钥或临时签名，修改后必须重新构建。新增配置同步说明到 `.env.example` 与 `docs/deployment.md`。
- 素材变量仅控制业务素材，不用于重写 Next.js 的 JS、CSS、字体或 favicon 路径。当前 `images.unoptimized` 不生成运行时优化图片，使用 `next/image` 仍需合理设置尺寸、`sizes` 和加载优先级，并预先压缩资源。
- 新素材优先输出满足展示尺寸的 WebP；复用原图进行缩放、压缩不需重新生图。新增装饰原图继续遵循下方生图规则，优化副本记录来源与用途，品牌图标沿用并记录原许可。
- 保留 `next/font` 的 Geist Mono 与中文系统字体回退，不新增浏览器请求的远程字体 CSS。未经授权不替换为商业字体。
- Canvas 的 `crossOrigin="anonymous"` 必须在设置 `src` 前赋值。远程图片能显示不等于允许读取像素；对象存储需配置 CORS，并分别验证图片显示和 Canvas 就绪状态。
- 新增动效需在离屏、后台、减少动态效果或加载失败时保留可读静态内容；Effect 清理观察器、监听器、计时器和动画帧，异步完成后不得更新已卸载组件。

### SEO、状态页与英文版本

- 保留首页 H1「在 AI 时代追求自由的年轻人」与 metadata 标题「FreeMan — 个人空间」；除非用户明确要求，不随 SEO、拆分或翻译工作改写中文标题。
- 正式域名目前尚未确定。不得写入虚构 canonical、sitemap 或社交分享绝对地址；`NEXT_PUBLIC_SITE_URL` 为空时保留首页 `noindex`。正式上线前执行 `docs/todo-domain-seo.md`，不要把构建成功误认为 SEO 已上线。
- 结构化数据只描述已实现且有真实资料支持的内容，不把示例课程、模拟资产或待开发服务标记为真实商品、财务或履历。
- 404 和异常页需说明发生了什么并给出有效恢复入口，不向访客展示堆栈或内部配置。`global-error.tsx` 自带 `html`、`body` 和基础样式，不依赖根布局。错误恢复 API 以安装版本文档为准；当前版本使用 `retry()`，不要套用旧版示例。
- 仅有异步等待且需要用户反馈时添加 `loading.tsx`；不为同步静态内容制造加载状态。
- 英文版本尚未实现，按 `docs/todo-internationalization.md` 推进。保留中文 `/` 的兼容性，复用区块与服务端字典，完整翻译交互和状态提示；同时处理 `html lang`、各语言 metadata 与 hreflang，不仅翻译正文。翻译不改变币种、真实链接或服务可用状态。

## 落地页信息架构

落地页按以下结构逐步开发。各区域需要明确标题、内容边界和必要的行动入口；具体文案和数据由真实内容替换。

| 区域 | 内容与用途 |
| --- | --- |
| Hero / 关于我 | 个人定位、简短介绍、主要行动按钮，以及微信、QQ、Telegram、X 社交入口。 |
| 技术栈 | 展示使用的技术、工具与能力。 |
| 项目 | 展示个人项目、代表作品及对应介绍或访问入口。 |
| 投资 | 展示个人投资相关内容；具体展示形式与真实资料待补充。 |
| 找我开发 / 雇佣我 | 展示开发合作和雇佣机会；可共用一个主体区域，但必须保留两个独立的导航入口和对应内容。 |
| 购买课程 | 包括 AI 知识培训、编程课程、职业咨询等课程或服务及咨询/购买入口。 |
| AI 中转站 | 当前仅做服务介绍，明确显示「待开发」；不能表现为已经提供可用服务。 |
| 加入社区 | 展示社区介绍与真实加入方式。 |
| 项目贡献者 | 展示项目参与者、贡献者和相关致谢。 |
| 页脚 | 站点基本信息、导航与联系方式等辅助入口。 |

## 导航栏规划

导航按以下顺序组织；「关于我」对应落地页主体。「找我开发业务」和「雇佣我」是不同意图，不合并为一个导航项。

1. 关于我。
2. 找我开发业务。
3. 雇佣我。
4. 课程。
5. AI 中转站，标记「待开发」。
6. 加入社区。

上述六项首页导航已完成。「关于我」链接首页 Hero；「找我开发业务」链接已实现的 `/development`；「雇佣我」链接已实现的 `/hire`；其余导航保留未来独立页面的意图，目前使用语义化按钮与包含目标名称的「页面待开发」提示，不能统一改成首页滚动锚点。首页探索栏可使用真实区块锚点。业务内页复用 Header 与 SiteFooter，关于我与品牌链接返回首页，当前导航使用 `aria-current="page"`。

未来路径、入口名称与可用状态集中在 `app/_data/entries.ts` 的 `entries` 与 `app/_data/project-entries.ts` 的 `projectEntries`；路由实际完成后才切换 `available`。除已授权实现的开发业务页与雇佣页外，不创建其他详情路由或详情替代弹窗。

## 当前开发状态

- 已完成 Hero、技术栈、项目、投资持仓、合并的开发/雇佣、课程/咨询、AI 中转站介绍、社区、贡献者、页脚十个区域的首页界面。项目区使用 `[02] 我的项目` 标题，右侧说明与左标题顶边对齐；当前展示 Mind Workspace、FreeMan Web、Tiny SaaS 三张等宽卡片，上方为原创层叠知识页、连续折带、阶梯模块的黑白规则 Canvas 点阵，灰度映射到深度，随鼠标位置轻微转动产生立体视差，键盘聚焦时提供固定倾角，移出后复位；姿态收敛、触控、减少动态效果、离屏或后台时停止绘制，并保留相同点阵的静态回退图。下方为描述与项目技术图标及 GitHub 入口；桌面卡片高度为 590px。FreeMan Web 已接入当前仓库地址，其余两个仓库链接待配置；项目图标、图片和仓库地址集中保存在 `projects` 数据中。
- 延续暖白、近黑、全等宽字体与细分割线；穿插蓝黑点阵概念视觉、卡片角落纹理、学习插画、网络概念和页脚山景。素材实际由内置 imagegen 生成并保存为本地 WebP。
- 贡献者宽屏为两行八列；中屏及常规手机四列，极窄手机两列；16 位均为明确标注的示例昵称与原创插画头像。
- 项目后的投资区域已改为 `[03] 我的资产`：浅灰大数字背景，中央显示「目前总资产」与人民币单位。金额从 ¥151,286.42 起步，每 1.8 秒随机变化 ¥0.01–24.00，限制在初始值上下 ¥600 范围；明确标注模拟数据。减少动态效果时关闭更新动画，数字仍持续变化。原四市场示例数据保留在 `app/_data/portfolio.ts`，首页不再展示持仓表。
- 微信、QQ、Telegram、X 社交入口及 Discord、Telegram、QQ 社区入口全部完成；真实资料尚未配置。统一在 `socialPlatforms`、`communities` 中填写 `account` 或真实 `href`，不使用平台官网替代个人/群入口。
- 移动菜单、所有业务/详情按钮、社交/社区状态反馈与键盘操作已实现；提示使用 `role="status"`，支持关闭按钮和 Escape，无业务详情弹窗。
- 项目和课程为可替换示例，不代表已交付客户案例、开课安排或资历。真实作品地址、贡献者、个人资料和课程内容仍需提供。
- 课程区域使用 `[05] 课程与学习` 标题与顶端对齐说明，六张卡片为 AI基础使用、AI进阶使用、AI实战训练、编程基础学习、编程进阶学习、项目实战教学。中央复用 OpenAI、Claude、LangChain、Python、TypeScript、Next.js 图标，统一为 76px；默认浅灰，悬停或键盘聚焦分别显示紫、橙、蓝、绿、玫红、青色原创颗粒渐变并展开入口。宽屏三列、中屏两列、手机单列，入口仍提示课程页面待开发。
- 首页及 `/development` 开发业务页已实现。业务页包括个人介绍、四类服务、三项明确标注的项目示例、八步合作流程、4＋4＋2 主付款方案与替代方案、FAQ 初稿、联系入口与需求准备清单，并复用首页页脚。Hero 保留已有原创插画，正文以留有内边距的结构化文字呈现服务、项目、流程、付款与联系信息，不展示服务图标、项目配图、边框卡片或大号付款数字；FAQ 使用原生 `details` / `summary` 与左侧加号。服务范围以 `[*]` 单列文字清单呈现，底部保留联系按钮，不展示独立技术栈及该区块底部横线。不新增 Canvas 或动画依赖。真实联系方式仍待配置，不提供在线需求提交。
- `/hire` 雇佣页已实现，包含个人介绍、四组岗位意向（涵盖大纲十二种岗位）、三项个人项目与示例、八步入职沟通流程、五项 FAQ 初稿、联系入口和招聘沟通清单。仅考虑远程工作或成都线下工作，薪酬、工作时间和合同事项通过添加好友沟通；不虚构受雇经历、资历或入职承诺。直接复用开发页的响应式 CSS、Header 和 SiteFooter，Hero 右侧为个人工牌，使用 FreeMan、已有小猪头像、六个轮播岗位名称与「保持好奇，持续构建」，底部居中显示「希望可以加入您的团队」，顶部保留挂绳孔，不展示吊带。工牌为局部客户端组件，岗位每 3.2 秒切换，CSS 倾斜随鼠标位置变化，移出复位，键盘焦点提供固定倾角；离屏、后台或减少动态效果时暂停轮播并复位，触控不响应鼠标倾斜。不增加依赖或申请表单。真实联系方式仍待配置。
- 其他详情页、支付/下单、登录、消息发送、课程交付、实时行情、AI 中转服务后端仍未实现，不自动部署。
- 本轮已通过 lint 与生产构建，并在 1440、1024、768、390、320px 检查实际渲染。具体交互和减少动态效果检查边界见 `docs/static-export-verification.md`。

## 部署规划

- 分阶段部署：ICP备案完成前，先将网站部署到海外的 Cloudflare Pages，作为低成本的临时线上版本；ICP备案完成后，迁移到腾讯 EdgeOne Makers，并使用「全球可用区（含中国大陆）」加速区域，以兼顾大陆与海外访客。
- 当前网站是以首页为主的静态内容站。Cloudflare Pages 阶段使用 Next.js 静态导出：`next.config.ts` 设置 `output: "export"` 和 `images: { unoptimized: true }`，构建命令为 `pnpm build`，发布目录为 `out`；通过 Git 仓库集成自动构建和部署。自有域名及其费用单独管理。
- Cloudflare Pages 阶段不使用中国大陆节点；大陆访问速度和稳定性可能受跨境网络影响。ICP备案完成并切换至 EdgeOne Makers 后，配置自有域名及备案信息，再启用含中国大陆的全球加速区域。
- 静态导出不支持需要 Next.js 服务端运行时的功能，例如动态 API、Server Actions、按请求 SSR 和默认图片优化。若后续加入此类功能，部署前重新评估架构，不要假设 Cloudflare Pages 静态方案仍可直接承载。
- 素材路径和跨域配置见 `docs/deployment.md`；正式域名/SEO 与英文版本待办分别见 `docs/todo-domain-seo.md`、`docs/todo-internationalization.md`。
- 平台套餐、免费额度和控制台选项会变化；执行部署时按平台当前文档复核，不在本指南中固定价格或额度。

## 视觉与参考网站

- 以 `DESIGN.md` 作为视觉基线：暖白底色、近黑文字、全等宽字体、细分割线、平面布局、小圆角按钮、ASCII 标记和深色终端卡片。本轮 `LANDING_PROMPT.md` 优先：允许原创生图装饰与风格统一的少量蓝色强调，覆盖旧设计文件禁止装饰图片和限定强调色位置的规则。
- Berkeley Mono 字体文件尚未提供，当前使用设计文件允许的 Geist Mono 替代；不擅自下载未授权的商业字体。
- 部分页面布局多参考 [Monad](https://monad.xyz/) 与 [OpenCode 中文站](https://opencode.ai/zh)。借鉴布局比例、信息层级、留白、分割线和行动按钮的组织方式，结合本站内容调整。
- 特别参考 Monad 的动效节奏与交互反馈，保持网站自己的终端风格；不要照搬参考站的品牌、文案或配色。
- 桌面端可使用左右分栏，移动端合理堆叠；保证导航、按钮和重要内容在窄屏可用，避免横向溢出。
- 卡片网格的左右边线应与所属页面外框的左右边线对齐并复用同一位置，不留侧向空隙；各响应式断点须根据容器内边距调整网格宽度，避免对齐时产生横向溢出。

### 图片与图标

- **页面所有视觉效果图片均须使用生图功能生成**，包括新增的装饰插画、氛围图、背景视觉、概念海报等。不要用网上的装饰图片、手工绘制的视觉图片或未经要求的图库素材替代生图。
- 生图结果保存为项目本地资源并按需优化；与当前暖白、近黑、克制的终端视觉风格协调。
- 普通排版、分割线和文字组成的 ASCII 终端界面属于代码界面，不必为了它们额外生成图片。
- **相关图标到网上寻找适合项目风格的资源**，优先官方品牌图标或可信图标库；统一尺寸、单色表现和视觉重量，保留来源与许可说明。图标按本规则获取，不使用生图伪造品牌标识。
- 真实头像、二维码和联系方式依赖真实资料，不通过生图虚构。

### 动效

- 网站的动效不要过多，也不要完全没有；适当增加效果以改善浏览体验。
- 优先使用轻量的内容入场、按钮/图标悬停、焦点反馈、展开反馈和锚点滚动；特别参考 [Monad](https://monad.xyz/) 的动效体验。
- 保持小幅位移和短时过渡，避免大面积持续动画、强烈视差、强制滚动或影响阅读的效果。
- 优先 CSS 实现；简单交互不引入重型动画依赖。
- 尊重 `prefers-reduced-motion`，关闭非必要动画，并保留内容可见和操作可用。

## 开发方式与验证

- 开始实现前简述假设；有多种会影响结果的解释时先明确差异。缺少信息时继续不依赖该信息的工作。
- 选择能解决当前任务的最小实现，不提前建设未要求的业务功能或通用架构。
- 仅修改当前需求涉及的代码，保持现有风格，不顺带重构或清理无关内容。
- 多步骤任务给出简短计划与验证方式；完成后运行适合变更的检查。
- 常用命令：`pnpm dev`、`pnpm lint`、`pnpm build`。
- 涉及页面、配置或组件边界的改动，完成后运行 lint 与生产构建，并检查 `out` 中的实际 HTML 和资源；`pnpm dev` 能运行不代表静态导出可部署。用静态服务器预览 `out`，不要使用 `next start`，不要将未知路径统一回退首页掩盖 404。
- 修改素材加载逻辑时验证本地与带目录前缀的远程配置，远程 Canvas 额外验证 CORS。临时测试环境不得覆盖用户的 `.env.local`；测试结束恢复默认构建，确认产物没有测试域名或地址。
- 页面变更验证桌面与移动端布局、有效链接、键盘操作及必要的交互；新增动效检查减少动态效果设置。
- 验收记录明确区分实际浏览器验证、模拟验证和未验证项，不把构建通过写成真实网络性能或 Core Web Vitals 已达标。结构变化同步更新本文件的职责说明；未完成事项留在 TODO，不写成已经实现。
- 当前仓库未配置独立测试框架；不要为了低影响的视觉修改引入新的测试依赖。
- 编写 Next.js 代码前，阅读安装版本的 `node_modules/next/dist/docs/` 中相关文档，不依赖旧版本经验。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
