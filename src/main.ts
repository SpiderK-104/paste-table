import { Editor, Notice, Plugin } from 'obsidian';
import {
	PasteTableSettings,
	DEFAULT_SETTINGS,
} from './settings';
import { PasteTableSettingTab } from './settings-tab';
import { clipboardHtmlToMarkdown } from './clipboard-converter';
import { looksLikeTable, textToMarkdown } from './text-converter';

export default class PasteTablePlugin extends Plugin {
	settings: PasteTableSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// ── 核心命令 1：读取剪贴板纯文本，检测到表格结构即转为 Markdown 表格 ──
		this.addCommand({
			id: 'paste-clipboard-table',
			name: 'Paste table: clipboard plain text',
			editorCallback: async (editor: Editor) => {
				try {
					const text = await navigator.clipboard.readText();
					if (!text || text.trim().length === 0) {
						new Notice('剪贴板为空');
						return;
					}
					this.insertConverted(editor, text);
				} catch (e: unknown) {
					const msg =
						e instanceof Error ? e.message : String(e);
					new Notice(`读取剪贴板失败: ${msg}`);
				}
			},
		});

		// ── 核心命令 2：将选中文本转为表格 ──
		this.addCommand({
			id: 'convert-text',
			name: 'Convert selection: text to table',
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (!selection || selection.trim().length === 0) {
					new Notice('请先选中要转换的文本表格');
					return;
				}
				this.insertConverted(editor, selection);
			},
		});

		// ── 辅助命令 3：从剪贴板 HTML 粘贴（保底，覆盖有 HTML 的场景）──
		this.addCommand({
			id: 'paste-clipboard-html',
			name: 'Paste table: clipboard HTML',
			editorCallback: async (editor: Editor) => {
				try {
					const md = await clipboardHtmlToMarkdown(this.settings);
					editor.replaceSelection(md);
					new Notice('表格已粘贴 (HTML)');
				} catch (e: unknown) {
					const msg =
						e instanceof Error ? e.message : String(e);
					new Notice(`HTML 粘贴失败: ${msg}`);
				}
			},
		});

		this.addSettingTab(new PasteTableSettingTab(this.app, this));
	}

	/**
	 * 检测文本是否具备表格结构：
	 * - 是表格 → 直接转为 Markdown 表格并插入
	 * - 非表格 → 按原文插入
	 */
	private insertConverted(editor: Editor, text: string): void {
		if (looksLikeTable(text, this.settings)) {
			editor.replaceSelection(textToMarkdown(text, this.settings));
		} else {
			editor.replaceSelection(text);
			new Notice('未检测到表格结构，已按原文插入');
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<PasteTableSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}