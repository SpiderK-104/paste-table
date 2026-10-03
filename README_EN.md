<div align="center">

# Paste Table

**Obsidian plugin · Any plain text with structure becomes a real Markdown table — copy it from anywhere, or just type it yourself, then one click.**

[![GitHub release](https://img.shields.io/github/v/release/SpiderK-104/paste-table?label=release&sort=semver)](https://github.com/SpiderK-104/paste-table/releases/latest)
[![GitHub license](https://img.shields.io/github/license/SpiderK-104/paste-table)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SpiderK-104/paste-table?style=social)](https://github.com/SpiderK-104/paste-table)
[![Lint](https://img.shields.io/github/actions/workflow/status/SpiderK-104/paste-table/lint.yml?label=lint&branch=main)](https://github.com/SpiderK-104/paste-table/actions)
[![中文](https://img.shields.io/badge/lang-%E4%B8%AD%E6%96%87-green)](README.md)

</div>

## The problem

Writing a Markdown table by hand means remembering the boilerplate:

```markdown
| Header | Header |
| --- | --- |
| Cell | Cell |
```

Every column needs a `|`, and you need a `| --- |` separator line. It's noisy, easy to break, and it forces you to decide the table syntax *before* you have the content.

## The idea

You already know your data — you just don't want to type table syntax. So write or copy the content naturally, keeping columns separated by a `Tab`, several spaces, or a `|`, then let the plugin do the syntax.

**Where the text comes from doesn't matter:**

| Source | Example |
| --- | --- |
| AI chat (ChatGPT / Claude / DeepSeek / Copilot …) | copy the answer |
| Web page, docs, issue tracker | copy the table block |
| Excel / Numbers / Google Sheets | copy a range |
| PDF viewer, terminal, log file | copy the aligned output |
| A note in another vault or app | copy a plain-text block |
| **Your own keyboard** | type the header, align the columns, fill in the cells |

That last one is the point: **you don't need anything to copy.** Type a header line, start the next line at the same visual columns, fill in the cells, select the block, and convert. No `|`, no `---`, no counting columns.

```text
Capability      Command              Use case
Cache object    SET / GET / EXPIRE   user profile, config, session
Batch caching   MSET / MGET          fewer network round-trips
```

→ one click →

| Capability | Command | Use case |
| --- | --- | --- |
| Cache object | SET / GET / EXPIRE | user profile, config, session |
| Batch caching | MSET / MGET | fewer network round-trips |

## Features

- **Clipboard → table**: read the clipboard, auto-detect the structure, insert a real Markdown table. No dialog, no interruption.
- **Selection → table**: select any aligned text already in your note and turn it into a table — including text you just typed yourself.
- **Four parsing strategies**, auto-detected in priority order:
  - `Tab`-separated (what most apps and AI chats put on the clipboard)
  - `|` pipe-separated (existing or hand-written Markdown tables — reformatted cleanly)
  - N consecutive spaces (visually aligned columns with variable widths)
  - single spaces with consistent column counts (short tables with no spaces inside cells)
- **Never breaks your text**: content that doesn't look like a table is inserted as-is instead of being mangled.
- **Row number column** (optional): prepends `# / 1 / 2 / 3 …` to the leftmost column.
- **HTML fallback**: converts clipboard HTML `<table>` when the source provides one.
- **Ragged rows are padded**: rows with fewer cells than the header are filled in, keeping the Markdown valid.
- **Fully offline**: all conversion happens locally. No telemetry, no network requests, no note content ever leaves your vault.

## Installation

### Option 1: Obsidian Community directory (recommended)

**Settings → Community plugins → Turn off Restricted mode → Browse → search "Paste Table" → Install & Enable**

If the official directory is hard to reach, [PKMer Market](https://pkmer.cn/products/plugin/pluginMarket/) mirrors the plugin for install and update.

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
| **Clipboard plain text** | Read the clipboard and insert it as a Markdown table when a table structure is detected |
| **Convert selection: text to table** | Convert the selected `Tab` / space / pipe-aligned text into a Markdown table |
| **Clipboard HTML** | Convert clipboard HTML `<table>` data (fallback) |

### Workflow A — copy from anywhere

1. Copy the content in any app (AI chat, web page, spreadsheet, another note…).
2. Back in Obsidian, press `Ctrl+Shift+V` (or run **Clipboard plain text** from the palette).
3. The table is inserted. Done.

### Workflow B — type it yourself

1. Type the header line, e.g. `Capability<Tab>Command<Tab>Use case`, or separate columns with two or more spaces.
2. Press `Enter` and fill in the rows, keeping the columns roughly aligned (or just keep using `Tab`).
3. Select the whole block.
4. Run **Convert selection: text to table**.
5. A valid Markdown table replaces the selection — no manual `|`, no `---`.

## Settings (Settings → Paste Table)

| Setting | Description | Default |
| --- | --- | --- |
| Row number column | Show `# / 1 / 2 / 3 …` on the leftmost column | Off |
| Min space gap | How many consecutive spaces count as a column separator | 2 |

## FAQ

**Q: My content was inserted as-is instead of being converted.**
A: It failed the "looks like a table" check — usually a single line, or not enough structure. Try separating columns with `Tab` instead of spaces, or lower **Min space gap**.

**Q: My hand-typed columns come out wrong.**
A: Column detection is based on separators, not pixel positions. Use `Tab` between cells (most reliable), or keep at least two spaces between columns and don't put double spaces inside a cell.

**Q: I already have a Markdown table — what happens?**
A: Pipe-separated text is detected too, so existing tables are simply normalized (separator rows cleaned up, missing cells padded).

**Q: Do you upload my notes or clipboard?**
A: No. Everything runs locally; the plugin makes no network requests.

**Q: Does it work on mobile?**
A: It is a desktop-only plugin (`isDesktopOnly: true`) because it reads the system clipboard. Mobile support may be evaluated later.

**Q: Hotkey not working?**
A: Obsidian doesn't reserve `Ctrl+Shift+V` by default — bind the command under Settings → Hotkeys.

## Development

```bash
git clone https://github.com/SpiderK-104/paste-table.git
cd paste-table
npm install        # install dependencies
npm run dev        # watch mode
npm run build      # production build
npm run lint       # lint
```

## Roadmap

- [x] Tab-separated text → Markdown table
- [x] Space-aligned text → Markdown table
- [x] Single-space consistent-column detection
- [x] Existing Markdown table normalization
- [x] Row number column (settings toggle)
- [x] HTML `<table>` fallback conversion
- [ ] Cell-level find & replace
- [ ] Column-position analysis (tricky space layouts)
- [ ] Mobile support evaluation

## License

[MIT](LICENSE)

## Credits

- [Obsidian plugin developer docs](https://docs.obsidian.md)
- [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)