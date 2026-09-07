<div align="center">

# Paste-Table

**Obsidian plugin · Turn the plain-text tables you copy from AI into real Markdown tables.**

[![GitHub release](https://img.shields.io/github/v/release/SpiderK-104/paste-table?label=release&sort=semver)](https://github.com/SpiderK-104/paste-table/releases/latest)
[![GitHub license](https://img.shields.io/github/license/SpiderK-104/paste-table)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SpiderK-104/paste-table?style=social)](https://github.com/SpiderK-104/paste-table)
[![Lint](https://img.shields.io/github/actions/workflow/status/SpiderK-104/paste-table/lint.yml?label=lint&branch=main)](https://github.com/SpiderK-104/paste-table/actions)
[![中文](https://img.shields.io/badge/lang-%E4%B8%AD%E6%96%87-green)](README.md)

</div>

## Why?

When you copy a table from an **AI chat** (ChatGPT, Claude, DeepSeek, etc.) or a web page, the clipboard actually contains **plain text** — rows of text aligned with `Tab` or spaces:

```text
Capability     Command              Use case
Cache object   SET / GET / EXPIRE   user profile, config, session
Batch caching  MSET / MGET          fewer network round-trips
```

Pasting that into Obsidian produces scattered text and the table structure is completely lost. Paste-Table converts it back into a real Markdown table with one action.

## ✨ Features

- **Paste to convert**: reads clipboard plain text → auto-detects table structure → inserts a Markdown table directly. **No dialogs, no interruption.**
- **Convert selection**: turn existing Tab / space-aligned pseudo-tables in your notes into proper tables.
- **Multi-strategy parsing**: auto-detects `Tab`, `|` (pipe), and consecutive-space separators, covering most AI copy scenarios.
- **Smart detection**: regular paragraphs are inserted as-is, never falsely converted.
- **Row number column** (optional): prepends `# / 1 / 2 / 3 …` to the leftmost column.
- **HTML fallback**: converts clipboard HTML `<table>` (e.g. from browser) when present.
- **Fully offline**: all conversion is local. No telemetry, no network requests.

## 🖼 Demo

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

## 📦 Installation

### Option 1: Obsidian Community directory (recommended)

**Settings → Community plugins → Turn off Restricted mode → Browse → search "Paste-Table" → Install & Enable**

### Option 2: Manual install

1. Download `main.js`, `manifest.json`, `styles.css` from the [releases](https://github.com/SpiderK-104/paste-table/releases)
2. Place them in your vault's plugin folder and restart Obsidian:

```
<Vault>/.obsidian/plugins/paste-table/
```

## 🚀 Usage

> Tip: bind `Ctrl+Shift+V` to **Clipboard plain text** (Settings → Hotkeys) for an instant "copy → paste-as-table" workflow.

| Command | Description |
| --- | --- |
| **Clipboard plain text** | Reads the clipboard, converts to a Markdown table if a table structure is detected |
| **Convert selection** | Converts the selected Tab / space / Markdown text into a table |
| **Clipboard HTML** | Converts clipboard HTML `<table>` data (fallback) |

**Workflow**

1. Hit "copy" in your AI chat (the plain text table goes to the clipboard)
2. Back in Obsidian, press `Ctrl+Shift+V` (or run the command)
3. The table is inserted. Done.

## ⚙️ Settings (Settings → Paste-Table)

| Setting | Description | Default |
| --- | --- | --- |
| Row number column | Show `# / 1 / 2 / 3 …` on the leftmost column | Off |
| Min space gap | Minimum consecutive spaces to treat as a column separator | 2 |

## 📖 FAQ

**Q: My content was inserted as-is instead of being converted.**
A: It failed the "looks like a table" check — likely a single line or not enough structure. Try lowering "Min space gap".

**Q: Do you upload my notes or clipboard?**
A: No. Everything runs locally; the plugin makes no network requests.

**Q: Does it work on mobile?**
A: It is a desktop-only plugin (`isDesktopOnly: true`). Mobile support may be evaluated later.

**Q: Hotkey not working?**
A: Obsidian doesn't reserve `Ctrl+Shift+V` by default — just bind the command under Settings → Hotkeys.

## 🔨 Development

```bash
git clone https://github.com/SpiderK-104/paste-table.git
cd paste-table
npm install        # install dependencies
npm run dev        # watch mode
npm run build      # production build
npm run lint       # lint
```

## 🗺 Roadmap

- [x] Tab-separated text → Markdown table
- [x] Space-aligned text → Markdown table
- [x] Table-structure auto-detection
- [x] Row number column (settings toggle)
- [x] HTML `<table>` fallback conversion
- [ ] Cell-level find & replace
- [ ] Column-position analysis (tricky space layouts)
- [ ] Mobile support evaluation

## 📄 License

[MIT](LICENSE)

## Credits

- [Obsidian plugin developer docs](https://docs.obsidian.md)
- [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)