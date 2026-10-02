# 原创生图素材

本轮使用内置 `image_gen.imagegen`（imagegen 技能默认模式），共六次独立生成。未使用 CLI/API 回退、网上装饰素材或参考截图裁切。WebP 压缩和头像等分裁切使用项目已安装的 Sharp；本地展示资源共约 880KB，原始输出保留在 Codex 默认生成目录。

## 文件与用途

| 本地文件 | 用途 |
| --- | --- |
| `public/images/hero.webp` | Hero 终端内的蓝色点阵环体 |
| `public/images/projects.webp` | 重点项目概念视觉、合作及卡片角落淡化装饰 |
| `public/images/learning.webp` | 课程区书页与像素阶梯插画 |
| `public/images/network.webp` | AI 中转、社区及局部低对比度点缀 |
| `public/images/landscape.webp` | 页脚黑白点阵山景 |
| `public/images/avatar-01.webp` 至 `avatar-16.webp` | 从一张原创 4×4 插画图集裁切的示例贡献者头像 |

图片不内嵌正文、按钮、品牌标志或身份资料，网页文字均可编辑。平台及技术图标来源与许可见 `public/icons/README.md`。

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
