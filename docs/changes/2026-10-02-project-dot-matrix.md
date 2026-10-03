# 项目卡片规则点阵与鼠标视差

归档日期：2026-10-02

## 修改内容

- 将三张项目卡片上方的散粒子视觉改为规则黑白点阵，分别使用层叠知识页、连续折带和阶梯模块造型。
- 点阵从原创透明源图按固定网格采样，以灰度推导深度；鼠标位置驱动轻微横纵旋转和透视视差，离开后平滑复位。键盘聚焦显示固定倾角；触控不触发鼠标跟随。
- 保留项目标题、说明、卡片布局和仓库入口。减少动态效果时保持静态；卡片离屏或页面后台时暂停绘制，姿态收敛后停止动画帧。
- 新增三张点阵源图及对应静态回退图；静态图用于脚本加载前或 Canvas 不可用时展示相同造型。

## 涉及文件

- `app/project-particle-card.tsx`：点阵采样、透视绘制、指针/焦点状态及动画生命周期。
- `app/landing-data.ts`：三张项目卡片改用新的点阵采样源图。
- `public/images/project-*-dot-source.webp`：点阵采样源图。
- `public/images/project-*-dot-source-static.webp`：透明静态回退图。
- `docs/generated-assets.md`：素材说明、生成提示词和静态图导出说明。
- `docs/verification/README.md`：屏宽、鼠标方向、键盘焦点及生命周期验收记录。

## 验收记录

- 检查 1440、1024、768、390、320px：桌面三列、手机单列，无页面横向溢出；桌面与手机截图保存在 `docs/verification/project-dot-matrix-desktop.png` 和 `docs/verification/project-dot-matrix-390.png`。
- 浏览器检查鼠标位置变化及 GitHub 入口键盘焦点；控制台无警告或错误。
- 临时检查覆盖姿态收敛与复位、键盘焦点、触控、减少动态效果、离屏/后台暂停和卸载清理。触控及媒体偏好切换通过模拟验证，未在真实触控设备上验证。
- 验收记录显示 `pnpm lint`、`pnpm build` 与 `git diff --check` 通过；本次归档未重新运行这些检查。

更完整的素材来源和提示词见 [`docs/generated-assets.md`](../generated-assets.md)；页面检查详情见 [`docs/verification/README.md`](../verification/README.md)。
