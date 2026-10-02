# 原创生图素材

## Hero 地球与电脑点阵（2026-10-02）

参照用户录屏的黑白点阵语言，使用内置 `image_gen.imagegen`（imagegen 技能默认模式）分别生成地球纹理与复古电脑剪影；未裁切录屏或复制其标志。Sharp 仅进行缩放和 WebP 压缩。两张源素材合计约 20KB：

- `public/images/hero-world-map.webp`：512×256，黑色陆地、白色海洋的原创地图纹理，只用于球面点阵采样，不作为地理数据。
- `public/images/hero-computer.webp`：256×256，白色电脑、黑色背景的原创剪影，用于固定网格点阵采样。
- `public/images/hero-dots-static.webp`：840×600，从使用上述原创素材的 Canvas 静态帧导出，保留透明背景；作为脚本关闭、Canvas 不可用或源素材加载失败时的回退。

窗口点阵边框、标题与连接点为代码终端界面。运行时旋转球面纹理，电脑点阵缓存到高分辨率离屏 Canvas；不加载视频、GIF 或外部动效库。原 `hero.webp` 保留为历史资源。

地球纹理完整提示词：

```text
Use case: stylized-concept. Asset type: source texture for a monochrome animated dot-matrix globe on a personal developer website. Generate a flat full-world equirectangular map, exactly 2:1 aspect ratio, centered longitude zero, north at top. All seven continent silhouettes recognizable, including Antarctica along bottom edge, simplified clean coastlines. Flat pure black land on pure white ocean, no outlines, no grids, no labels, no lettering, no shading, no border, no globe projection, no dots. Fill whole rectangular image edge to edge with the equirectangular world map. This raster will be sampled in code onto a rotating sphere. Original artwork, no watermark.
```

电脑素材完整提示词：

```text
Use case: stylized-concept. Asset type: monochrome raster silhouette to sample into a coarse dot-matrix animation. Subject: a single classic retro laptop computer, front view with a very slight top-down angle, open upright square screen and wide shallow trapezoid keyboard base, large empty black screen opening, thick white screen bezel, white keyboard deck with four tidy rows of small black keys and a black trackpad. A simple clean chunky geometric silhouette inspired by 1980s terminal pixel art, but do NOT draw dots or a pixel grid. Pure white object on perfectly pure black background, no gray, no shading, no lighting, no gradients, no shadow. Computer centered in square canvas with 12 percent empty black margin, all parts connected, fills 76 percent width. No logos, text, lettering, extra objects, borders or watermark. Original artwork, clear at only 40 pixels wide.
```

首页初版使用内置 `image_gen.imagegen`（imagegen 技能默认模式），共六次独立生成。未使用 CLI/API 回退、网上装饰素材或参考截图裁切。WebP 压缩和头像等分裁切使用项目已安装的 Sharp；初版本地展示资源共约 880KB，原始输出保留在 Codex 默认生成目录。后续新增素材记录在本文末尾。

## 文件与用途

| 本地文件 | 用途 |
| --- | --- |
| `public/images/hero.webp` | Hero 终端内的蓝色点阵环体 |
| `public/images/projects.webp` | 开发合作区域的概念视觉 |
| `public/images/learning.webp` | 课程区书页与像素阶梯插画 |
| `public/images/network.webp` | AI 中转、社区及局部低对比度点缀 |
| `public/images/landscape.webp` | 页脚黑白点阵山景 |
| `public/images/avatar-01.webp` 至 `avatar-16.webp` | 从一张原创 4×4 插画图集裁切的示例贡献者头像 |
| `public/images/avatar-0317zhuo.jpg` | GitHub 用户 [@0317zhuo](https://github.com/0317zhuo) 提供的个人头像 |

图片不内嵌正文、按钮、品牌标志或身份资料，网页文字均可编辑。平台及技术图标来源与许可见 `public/icons/README.md`。

## 开发与雇佣点阵装饰（2026-10-02）

使用内置 `image_gen.imagegen`，以用户提供图片右侧的浅灰网点为风格参考，生成原创透明点阵纹理。未裁切参考图片，未复制其中的文字或标志。资源保存为 `public/images/collaboration-halftone.webp`（768×768，保留 Alpha，约 97KB），通过 CSS 放在开发与雇佣两栏边缘，宽屏透明度为 30%，窄屏为 24%；右栏装饰随屏宽延伸至区域最右侧的竖向分割线。Sharp 仅进行等比缩放与 WebP 压缩。装饰为静态背景，不参与布局或点击。

完整生成提示词：

```text
Use case: stylized-concept. Asset type: transparent raster decorative texture for the edges of two minimalist website columns. Input image 1 is a STYLE REFERENCE ONLY: use the faint gray halftone dot decoration at its right edge, do not copy any text, logo or page layout. Generate ONE original square texture on a genuinely transparent background. An airy geometric curved orbital band near the right edge, constructed entirely from crisp small evenly spaced round monochrome gray halftone dots, with a regular dot field becoming gradually sparse toward the left. The cropped circular band suggests an abstract digital globe fragment, no recognizable map or object. Concentrate detail in the rightmost 35 percent and lower right corner; leftmost 55 percent completely empty transparent space. Larger dots at the far right, tiny light dots at the transition. Quiet pale gray, print-like clarity, understated website background, no solid fill, no blur, no blue, no text, no logo, no watermark, no border, no shadows, no white background rectangle. Preserve full alpha transparency between every dot.
```

## 完整生成提示词

每次生成都使用以下共同前缀，再追加对应提示词。未传入参考图或编辑目标；背景均不透明。

```text
Use case: stylized-concept. Original raster artwork for FreeMan personal developer website. Sophisticated editorial computer-art, precise halftone dots and sparse pixel clusters. Strict palette warm white #fdfcfc, near-black #201d1d, electric blue #315bfb. Flat print texture, no gradients, no logos, no letters, no watermarks.
```

### Hero

```text
A centered levitating blue torus with an irregular black dotted orbit, emerging from a tiny field of pixels. Dark near-black background, blue and warm white highlights. Square composition, object inside middle 70%, lots of black breathing room. Fine ASCII-like granular texture, futuristic but restrained.
```

### 项目与合作

```text
An impossible architectural staircase composed of modular blue and off-white rectangular blocks, with black halftone shadows. Warm white backdrop. Wide editorial landscape composition, subject on right two thirds, generous empty margin, playful abstract digital building metaphor. Not a product screenshot.
```

### 课程

```text
An open abstract book with pages becoming blue pixel steps climbing upwards. Monochrome black halftone with selective blue. Warm white background, portrait composition, centered subject, huge breathing room. Editorial screenprint, no words.
```

### 连接与社区

```text
A constellation of small blue and black pixel nodes connected in a loose circular network with a few floating cubes, on warm white. Wide landscape composition, center-right focus, fine halftone dots fading into empty white at edges. Abstract community connection metaphor, no globe.
```

### 页脚

```text
Wide panoramic monochrome mountain valley of layered rugged peaks, blue sparse pixels at the far horizon, intricate black halftone dots on warm white. Upper half nearly empty warm white sky, landscape rising from bottom edge. Minimal vintage computer print landscape, peaceful horizon. Extra wide 3:1 composition.
```

### 贡献者头像图集

```text
A single perfectly aligned 4 by 4 atlas of SIXTEEN unique original friendly fictional illustrated avatar portraits, one centered in each equally-sized square tile, no gaps. Each has a DIFFERENT recognizable head: astronaut, cat, robot, owl, fox, hooded coder, rabbit, bear, mushroom, penguin, dog, little planet, frog, raccoon, bird, alien. Circular soft warm-white backgrounds, blue black pale grey palette, stylish pixel-art halftone illustration. All subjects contained within center 70 percent of tile, equal size. No text. Square image.
```

## SELECTED WORK 三卡片视觉（2026-10-02）

使用内置 `image_gen.imagegen` 独立生成三张黑白粒子图，未使用 CLI/API 回退；初稿背景不透明，现用版本由内置工具去除背景，保留透明通道。原图以 Sharp 等比缩小至 640×640 并压缩为 WebP，卡片初版通过 CSS 做轻微悬停与焦点反馈；现由 `app/project-particle-card.tsx` 从这些原创图片采样粒子，通过透明 Canvas 绘制独立位移、轻微旋转与聚散。静态图片保留为加载前及无 Canvas 时的回退。减少动态效果设置下保持静态，不生成新的位图素材。

| 本地文件 | 卡片与形态 |
| --- | --- |
| `public/images/project-knowledge-transparent.webp` | Mind Workspace：空心粒子球，透明背景 |
| `public/images/project-personal-transparent.webp` | FreeMan Web：扭转点阵，透明背景 |
| `public/images/project-workflow-transparent.webp` | Tiny SaaS：放射粒子，透明背景 |

### 完整生成提示词

#### project-knowledge

```text
Use case: stylized-concept. Asset type: original abstract artwork for the top of a minimalist FreeMan website project card. Square composition. Strictly monochrome black and fine gray on a clean uniform off-white #fdfcfc background. Sophisticated mathematical generative-art aesthetic, very fine crisp particles and halftone stippling, ethereal and restrained. One object centered and entirely contained within the central 70 percent, generous untouched blank margins. No text, no logo, no frame, no UI, no watermark, no color, no blue. A hollow spherical cloud made of thousands of tiny individual black particles, concentrated into a delicate irregular circular shell with a nearly empty center. Some sparse particles drift outward. Knowledge constellation metaphor. Airy and intricate; no solid surfaces, no connecting lines.
```

#### project-personal

```text
Use case: stylized-concept. Asset type: original abstract artwork for the top of a minimalist FreeMan website project card. Square composition. Strictly monochrome black and fine gray on a clean uniform off-white #fdfcfc background. Sophisticated mathematical generative-art aesthetic, very fine crisp particles and halftone stippling, ethereal and restrained. One object centered and entirely contained within the central 70 percent, generous untouched blank margins. No text, no logo, no frame, no UI, no watermark, no color, no blue. A gently twisted square ribbon sculpture built entirely from tiny black halftone dots and very fine stippled curved strands. Four softly flaring corners surround an airy hollow center, evoking a woven digital personal space. Elegant open structure, no solid fill, no cubes.
```

#### project-workflow

```text
Use case: stylized-concept. Asset type: original abstract artwork for the top of a minimalist FreeMan website project card. Square composition. Strictly monochrome black and fine gray on a clean uniform off-white #fdfcfc background. Sophisticated mathematical generative-art aesthetic, very fine crisp particles and halftone stippling, ethereal and restrained. One object centered and entirely contained within the central 70 percent, generous untouched blank margins. No text, no logo, no frame, no UI, no watermark, no color, no blue. A delicate radial starburst particle sculpture, many hair-thin dotted trajectories radiating outward from a small dense near-black center, with subtle long vertical strands and an organic circular silhouette. A quiet workflow convergence metaphor. Light delicate outer tips fade into blank space, no solid disks.
```

### 透明背景编辑

三个初稿分别作为编辑目标，使用相同提示词，设置 `transparent_background: true`。内置 imagegen 输出真实 Alpha 通道，Sharp 仅缩放、压缩并保留透明度，不通过混合模式遮掩背景。初稿原始生图仍保存在 Codex 默认生成目录，项目使用上表的透明版本。

```text
Use case: background-extraction. Input image: edit target, a monochrome particle artwork for a minimal website. Change ONLY the background: remove the entire off-white/gray paper backdrop and make it genuinely fully transparent with an alpha channel. Preserve the original particle sculpture exactly: its shape, position, size, intricate black and gray dots, fine threads, and airy fading tips. All empty space around and inside the sculpture must be transparent, not filled white. Keep dark artwork pixels and use appropriate partial alpha for faint particles. No opaque background plate, no checkerboard painted into the file, no shadow, no glow, no additional objects, no text. Square canvas and original composition unchanged.
```

## 课程卡片颗粒渐变（2026-10-02）

使用内置 `image_gen.imagegen` 生成一张原创灰度颗粒渐变，Sharp 仅等比缩放和 WebP 压缩。保存为 `public/images/course-grain.webp`（640×640，约 63KB），由 CSS `soft-light` 混合分别着色为紫、橙、蓝、绿、玫红、青色；默认隐藏，鼠标悬停或键盘聚焦时显示。中央品牌图标复用已有 SVG，来源与许可见 `public/icons/README.md`。旧课程插画保留为历史资源。

完整生成提示词：

```text
Use case: stylized-concept. Asset type: a single original grayscale texture for minimalist website course cards, colored later in CSS. Create a square abstract soft luminous gradient with very fine analog film grain throughout, like elegant editorial risograph paper. Deep charcoal in upper left and bottom left corners, medium gray along right edge, a broad softly glowing light gray area across center and upper right. Organic blurred tonal transitions with understated fine speckled print texture. Uniformly flat raster surface with no objects, no recognizable forms, no lettering, no logo, no border, no shadow, no watermark, no UI. Strict grayscale, no color. No pure black blocks or sharp lines. This is a background behind website text and centered brand icons; calm even texture without any focal object.
```
