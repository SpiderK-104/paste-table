<div align="center">

# Paste Table

**Obsidian plugin · Turn plain-text tables copied from AI into real Markdown tables instantly.**

[![GitHub release](https://img.shields.io/github/v/release/SpiderK-104/paste-table?label=release&sort=semver)](https://github.com/SpiderK-104/paste-table/releases/latest)
[![GitHub license](https://img.shields.io/github/license/SpiderK-104/paste-table)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SpiderK-104/paste-table?style=social)](https://github.com/SpiderK-104/paste-table)
[![Lint](https://img.shields.io/github/actions/workflow/status/SpiderK-104/paste-table/lint.yml?label=lint&branch=main)](https://github.com/SpiderK-104/paste-table/actions)
[![中文](https://img.shields.io/badge/lang-%E4%B8%AD%E6%96%87-green)](#中文文档)

</div>

## Why?

When you copy a table from an **AI chat** (ChatGPT, Claude, DeepSeek, etc.) or any other source, the clipboard actually contains **plain text** — rows aligned with `Tab` or spaces:

```text
Capability     Command              Use case
Cache object   SET / GET / EXPIRE   user profile, config, session
Batch caching  MSET / MGET          fewer network round-trips
```

Pasting that into Obsidian produces scattered text and the table structure is completely lost. **Paste Table** converts it back into a real Markdown table with one action.

## Features

- **Paste to convert**: reads clipboard plain text, auto-detects table structure, and inserts a Markdown table directly. No dialogs, no interruption.
- **Convert selection**: turn existing Tab/space-aligned pseudo-tables in your notes into proper tables with one click.
- **Multi-strategy parsing**: auto-detects `Tab`, `|` (pipe), and consecutive-space separators, covering most AI copy scenarios.
- **Smart detection**: regular paragraphs are inserted as-is, never falsely converted.
- **Row number column** (optional): prepends `# / 1 / 2 / 3 …` to the leftmost column.
- **HTML fallback**: converts clipboard HTML `<table>` (e.g. from browsers) when present.
- **Fully offline**: all conversion is local. No telemetry, no network requests.

## Demo

**Before (copied from AI)**

```text
Capability	Command	Use case
Cache object	SET / GET / EXPIRE	user profile, config
Batch caching	MSET / MGET	fewer round-trips
```

**After (inserted into Obsidian)**

| Capability | Command | Use case |
| --- | --- | --- |
| Cache object | SET / GET / EXPIRE | user profile, config |
| Batch caching | MSET / MGET | fewer round-trips |

## Installation

### Option 1: Obsidian Community plugins (recommended)

**Settings → Community plugins → Turn off Restricted mode → Browse → search "Paste Table" → Install & Enable**

### Option 2: Manual install

1. Download `main.js`, `manifest.json`, `styles.css` from the [releases](https://github.com/SpiderK-104/paste-table/releases)
2. Place them in your vault's plugin folder and restart Obsidian:

```
<Vault>/.obsidian/plugins/paste-table/
```

## Usage

> Tip: bind `Ctrl+Shift+V` to **Clipboard plain text** (Settings → Hotkeys) for an instant "copy → paste-as-table" workflow.

| Command | Description |
| --- | --- |
| **Clipboard plain text** | Reads the clipboard and converts to a Markdown table if a table structure is detected |
| **Convert selection** | Converts selected Tab/space-aligned text into a Markdown table |
| **Clipboard HTML** | Converts clipboard HTML `<table>` data (fallback) |

**Workflow**

1. Hit "copy" in your AI chat (the plain text table goes to the clipboard)
2. Back in Obsidian, press `Ctrl+Shift+V` (or run the command from the palette)
3. The table is inserted. Done.

## Settings (Settings → Paste Table)

| Setting | Description | Default |
| --- | --- | --- |
| Row number column | Show `# / 1 / 2 / 3 …` on the leftmost column | Off |
| Min space gap | Minimum consecutive spaces to treat as a column separator | 2 |

## FAQ

**Q: My content was inserted as-is instead of being converted.**
A: It failed the "looks like a table" check — likely a single line or not enough structure. Try lowering "Min space gap".

**Q: Do you upload my notes or clipboard?**
A: No. Everything runs locally; the plugin makes no network requests.

**Q: Does it work on mobile?**
A: It is a desktop-only plugin (`isDesktopOnly: true`). Mobile support may be evaluated later.

**Q: Hotkey not working?**
A: Obsidian doesn't reserve `Ctrl+Shift+V` by default — just bind the command under Settings → Hotkeys.

## Development

```bash
git clone https://github.com/SpiderK-104/paste-table.git
cd paste-table
npm install        # install dependencies
npm run dev        # watch mode
npm run build      # production build
npm run lint       # lint
```

## License

[MIT](LICENSE)

## Credits

- [Obsidian plugin developer docs](https://docs.obsidian.md)
- [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

---

## 中文文档

### 为什么会有这个插件？

从 **AI 对话**（豆包、DeepSeek、腾讯元宝…）或其他任意来源内容中复制表格时，剪贴板里拿到的其实是**纯文本**——用 `Tab` 或空格对齐的文本行，举个例子：

```text
能力        用到的指令           场景
缓存对象    SET / GET / EXPIRE  用户信息、配置、session
批量缓存    MSET / MGET         减少网络往返
```

直接粘贴进 Obsidian 会变成一堆散乱文字，表格结构全部丢失。Paste Table 帮你**一键转换回真正的 Markdown 表格**。

### 功能特性

- **粘贴即转换**：读取剪贴板纯文本 → 自动识别表格结构 → 直接插入 Markdown 表格，**无弹窗、无干扰**
- **选中再转换**：笔记里已有的 Tab / 空格伪表格，选中后一键转正
- **多策略解析**：自动识别 `Tab` → `|` 管道 → 连续空格 三种分隔形式，覆盖绝大多数 AI 复制场景
- **智能判断**：普通段落不会被误转换，原样插入
- **数字排序列**（可选）：表格最左侧自动插入 `# / 1 / 2 / 3 …` 序号列
- **HTML 保底**：剪贴板确实存在 HTML `<table>`（如浏览器网页）时也能转换
- **离线运行**：纯本地逻辑，不上传任何数据，无任何网络请求

### 安装

**设置 → 第三方插件 → 关闭安全模式 → 社区插件 → 浏览 → 搜索 "Paste Table" → 安装并启用**

国内访问官方市场困难时，推荐使用 [PKMer Market](https://pkmer.cn/products/plugin/pluginMarket/) 加速安装与更新。

### 使用

> 建议把 `Ctrl+Shift+V` 绑定到 **Clipboard plain text**（**设置 → 快捷键**），实现「复制 → 粘贴即表格」。

| 命令 | 说明 |
| --- | --- |
| **Clipboard plain text** | 读取剪贴板，检测到表格结构即转成 Markdown 表格插入 |
| **Convert selection** | 直接将选中的 Tab / 空格对齐文本转换为表格 |
| **Clipboard HTML** | 剪贴板有 HTML `<table>` 时按 HTML 转换（保底方案） |

### 设置项（设置 → Paste Table）

| 设置 | 说明 | 默认值 |
| --- | --- | --- |
| 数字排序列 | 表格最左侧显示 `# / 1 / 2 / 3…` 序号列 | 关 |
| 最小连续空格数 | 空格对齐表格的列分隔阈值，连续 n 个空格视为一列 | 2 |

### FAQ

**Q：为什么我的内容被原样插入而没有转换？**
A：说明文本未通过「像表格」检测。可能是单行文本或不足以构成表格结构；也可以调低「最小连续空格数」再试。

**Q：会把我笔记内容或剪贴板上传吗？**
A：不会。所有转换都在本地完成，插件不发起任何网络请求。

**Q：支持手机端吗？**
A：插件声明为桌面端（`isDesktopOnly: true`）。核心逻辑是纯 TypeScript，后续版本可评估开放移动端。
