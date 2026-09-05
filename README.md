<div align="center">

# Paste-Table

**Obsidian 插件 · 把 AI 复制的「纯文本表格」一键变成标准 Markdown 表格**

[![GitHub release](https://img.shields.io/github/v/release/SpiderK-104/paste-table?label=release&sort=semver)](https://github.com/SpiderK-104/paste-table/releases/latest)
[![GitHub license](https://img.shields.io/github/license/SpiderK-104/paste-table)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SpiderK-104/paste-table?style=social)](https://github.com/SpiderK-104/paste-table)
[![Lint](https://img.shields.io/github/actions/workflow/status/SpiderK-104/paste-table/lint.yml?label=lint&branch=main)](https://github.com/SpiderK-104/paste-table/actions)
[![English](https://img.shields.io/badge/lang-English-blue)](README_EN.md)

</div>

## 为什么会有这个插件？

从 **AI 对话**（豆包、DeepSeek、ChatGPT…）或网页复制表格时，剪贴板里拿到的其实是**纯文本**——用 `Tab` 或空格对齐的文本行：

```text
能力        用到的指令           场景
缓存对象    SET / GET / EXPIRE  用户信息、配置、session
批量缓存    MSET / MGET         减少网络往返
```

直接粘贴进 Obsidian 会变成一堆散乱文字，表格结构全部丢失。Paste-Table 帮你**一键转换回真正的 Markdown 表格**。

## ✨ 功能特性

- **粘贴即转换**：读取剪贴板纯文本 → 自动识别表格结构 → 直接插入 Markdown 表格，**无弹窗、无干扰**
- **选中再转换**：笔记里已有的 Tab / 空格伪表格，选中后一键转正
- **多策略解析**：自动识别 `Tab` → `|` 管道 → 连续空格 三种分隔形式，覆盖绝大多数 AI 复制场景
- **智能判断**：普通段落不会被误转换，原样插入
- **数字排序列**（可选）：表格最左侧自动插入 `# / 1 / 2 / 3 …` 序号列
- **HTML 保底**：剪贴板确实存在 HTML `<table>`（如浏览器网页）时也能转换
- **离线运行**：纯本地逻辑，不上传任何数据，无任何网络请求

## 🖼 效果演示

**转换前（AI 复制的内容）**

```text
能力	用到的指令	场景
缓存对象	SET / GET / EXPIRE	用户信息、配置、session
批量缓存	MSET / MGET	减少网络往返
```

**转换后（插入 Obsidian 的 Markdown）**

| 能力 | 用到的指令 | 场景 |
| --- | --- | --- |
| 缓存对象 | SET / GET / EXPIRE | 用户信息、配置、session |
| 批量缓存 | MSET / MGET | 减少网络往返 |

## 🧪 在线 Demo（无需安装）

浏览器直接体验核心转换逻辑，先验证再装插件：

```bash
npm run demo:build   # 修改 src 后需重新打包
# 双击打开 demo/demo.html
```

把 AI 复制的表格文本粘贴进去，实时查看：是否检测到表格 → 转换后的 Markdown 源码 → 渲染预览。

## 📦 安装

### 方式一：Obsidian 官方社区插件市场（推荐）

**设置 → 第三方插件 → 关闭安全模式 → 社区插件 → 浏览 → 搜索 "Paste-Table" → 安装并启用**

### 方式二：PKMer 集市（国内加速）

国内访问官方市场困难时，推荐使用 [PKMer Market](https://pkmer.cn/products/plugin/pluginMarket/) 加速安装与更新。

### 方式三：手动安装

1. 从 [Releases](https://github.com/SpiderK-104/paste-table/releases) 下载对应版本的 `main.js`、`manifest.json`、`styles.css`
2. 放入 vault 的插件目录并重启 Obsidian：

```
<Vault>/.obsidian/plugins/paste-table/
```

## 🚀 使用

> 建议把 `Ctrl+Shift+V` 绑定到 `Paste table: clipboard plain text`（**设置 → 快捷键**），实现「复制 → 粘贴即表格」。

| 命令 | 说明 |
| --- | --- |
| `Paste table: clipboard plain text` | 读取剪贴板，检测到表格结构即转成 Markdown 表格插入（可绑定 `Ctrl+Shift+V`） |
| `Convert selection: text to table` | 将选中的 Tab / 空格 / Markdown 文本转为表格 |
| `Paste table: clipboard HTML` | 剪贴板有 HTML `<table>` 时按 HTML 转换（保底方案） |

**使用流程**

1. 在 AI 对话中点击「复制内容」（复制的是纯文本表格）
2. 回到 Obsidian 笔记中按 `Ctrl+Shift+V`（或命令面板运行命令）
3. 表格自动插入，完成

## ⚙️ 设置项（设置 → Paste-Table）

| 设置 | 说明 | 默认值 |
| --- | --- | --- |
| 数字排序列 | 表格最左侧显示 `# / 1 / 2 / 3…` 序号列 | 关 |
| 最小连续空格数 | 空格对齐表格的列分隔阈值，连续 n 个空格视为一列 | 2 |

## 📖 FAQ

**Q：为什么我的内容被原样插入而没有转换？**
A：说明文本未通过「像表格」检测。可能是单行文本或不足以构成表格结构；也可以调低「最小连续空格数」再试。

**Q：会把我笔记内容或剪贴板上传吗？**
A：不会。所有转换都在本地完成，插件不发起任何网络请求。

**Q：支持手机端吗？**
A：插件声明为桌面端（`isDesktopOnly: true`）。核心逻辑是纯 TypeScript，后续版本可评估开放移动端。

**Q：绑定快捷键无效？**
A：Obsidian 自带快捷键设置未占用 `Ctrl+Shift+V`，直接到 **设置 → 快捷键** 中为命令绑定即可。

## 🔨 开发与贡献

```bash
git clone https://github.com/SpiderK-104/paste-table.git
cd paste-table
npm install        # 安装依赖
npm run dev        # 开发模式（watch 构建）
npm run build      # 生产构建
npm run lint       # 代码检查
```

## 🗺 路线图

- [x] Tab 分隔文本 → Markdown 表格
- [x] 空格对齐文本 → Markdown 表格
- [x] 表格结构自动检测（防误转换）
- [x] 数字排序列（设置开关）
- [x] HTML `<table>` 保底转换
- [x] 在线 Demo 页面
- [ ] 单元格级查找替换
- [ ] 列对齐位置分析（更复杂的空格场景）
- [ ] 移动端支持评估

## 📄 许可证

[MIT](LICENSE)

## 🤝 致谢

- [Obsidian 社区插件开发文档](https://docs.obsidian.md)
- [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)