import type { PasteTableSettings } from './settings';
import { withRowNumber } from './table-builder';

/**
 * 从剪贴板读取 HTML 并转换为 Markdown 表格。
 * 调用方需要确保剪贴板中有 HTML 类型数据。
 */
export async function clipboardHtmlToMarkdown(
	settings: PasteTableSettings,
): Promise<string> {
	const clipboardItems = await navigator.clipboard.read();
	let html = '';

	for (const item of clipboardItems) {
		if (item.types.includes('text/html')) {
			const blob = await item.getType('text/html');
			html = await blob.text();
			break;
		}
	}

	if (!html) {
		throw new Error('剪贴板中没有找到 HTML 表格数据');
	}

	return htmlToMarkdown(html, settings);
}

/**
 * 将 HTML 字符串中的 <table> 转换为 Markdown 表格。
 * 支持 colSpan / rowSpan 的简单处理。
 */
export function htmlToMarkdown(
	html: string,
	settings: PasteTableSettings,
): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const table = doc.querySelector('table');

	if (!table) {
		throw new Error('未在 HTML 中找到 <table> 元素');
	}

	const rows = extractTableData(table);
	if (rows.length === 0) {
		throw new Error('表格数据为空');
	}

	return buildMarkdownTable(rows, settings);
}

/**
 * 从 <table> 元素中提取二维字符串数组。
 * 处理 th / td，跳过 thead / tbody / tfoot 的语义层。
 */
function extractTableData(table: HTMLTableElement): string[][] {
	const result: string[][] = [];

	const trs = table.querySelectorAll('tr');
	for (let i = 0; i < trs.length; i++) {
		const tr = trs[i]!;
		const row: string[] = [];
		const cells = tr.querySelectorAll('th, td');
		for (let c = 0; c < cells.length; c++) {
			const cell = cells[c]!;
			const text = cell.textContent?.trim() ?? '';
			const colspan = parseInt(cell.getAttribute('colspan') ?? '1', 10);

			// 基础文本（MVP 阶段忽略 rowspan 的列占位）
			const cellText = (cell.textContent ?? '')
				.replace(/\s+/g, ' ')
				.trim();

			row.push(cellText || text.trim());
			// 简易 colspan：用空单元格填充
			for (let s = 1; s < colspan; s++) {
				row.push('');
			}
		}
		if (row.length > 0) {
			result.push(row);
		}
	}

	return result;
}

/**
 * 将二维字符串数组组装为 Markdown 表格字符串。
 */
function buildMarkdownTable(
	rows: string[][],
	settings: PasteTableSettings,
): string {
	// 统一列数
	const withNumbers = withRowNumber(rows, settings);
	const maxCols = Math.max(...withNumbers.map((r) => r.length));
	const normalized = withNumbers.map((row) => {
		while (row.length < maxCols) row.push('');
		return row;
	});

	const lines: string[] = [];

	// 表头
	const header = normalized[0] ?? [];
	lines.push(`| ${header.join(' | ')} |`);

	// 分隔线
	lines.push(`| ${header.map(() => '---').join(' | ')} |`);

	// 数据行
	for (let i = 1; i < normalized.length; i++) {
		lines.push(`| ${(normalized[i] ?? []).join(' | ')} |`);
	}

	return lines.join('\n');
}
