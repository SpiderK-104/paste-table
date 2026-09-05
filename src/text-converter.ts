import type { PasteTableSettings } from './settings';
import { withRowNumber } from './table-builder';

type SplitStrategy = 'tab' | 'pipe' | 'gap' | 'single';

/**
 * 获取非空行。
 */
function getLines(text: string): string[] {
	return text
		.trim()
		.split('\n')
		.filter((l) => l.trim().length > 0);
}

/**
 * 选择最优分隔策略。接口语义：是表格 → 返回策略名；不是 → null。
 *
 * 顺序：
 * 1. tab   —— Tab 分隔（AI 复制最常见）
 * 2. pipe  —— | 分隔（已存在的 Markdown 表格）
 * 3. gap   —— 连续空格对齐（单元格内允许含单个空格）
 * 4. single—— 单空格分隔且各行列数高度一致（列少、无内部空格）
 */
function detectStrategy(
	lines: string[],
	settings: PasteTableSettings,
): SplitStrategy | null {
	if (lines.length < 2) return null;

	// 策略 1：Tab 分隔
	const tabLines = lines.filter((l) => l.includes('\t')).length;
	if (tabLines >= Math.min(2, lines.length)) return 'tab';

	// 策略 2：Pipe 分隔（Markdown 表格）
	const pipeLines = lines.filter(
		(l) => (l.match(/\|/g) ?? []).length >= 2,
	).length;
	if (pipeLines >= Math.min(2, lines.length)) return 'pipe';

	// 策略 3：连续空格对齐（阈值可配置）
	const gap = settings.spaceMinGap;
	const gapRe = new RegExp(`\\s{${gap},}`);
	const gapLines = lines.filter(
		(l) =>
			l.split(gapRe).filter((c) => c.length > 0).length >= 2,
	).length;
	if (gapLines >= Math.min(2, lines.length)) return 'gap';

	// 策略 4：单空格分隔的"列一致性"
	// 每行按空白整体切分，若绝大多数行得到相同的列数（≥2 列），推断为表格。
	const mode = singleMode(lines);
	const modeCount = lines.filter(
		(l) => l.split(/\s+/).filter((s) => s.length > 0).length === mode,
	).length;
	// 需要"绝大多数行"而非 2、3 行，避免把代码/散文误判为表格
	const threshold = Math.max(3, Math.ceil(lines.length * 0.7));
	if (mode >= 2 && modeCount >= threshold) return 'single';

	return null;
}

/**
 * 按已选策略解析为二维字符串数组。
 */
function parseByStrategy(
	lines: string[],
	strategy: SplitStrategy,
	settings: PasteTableSettings,
): string[][] {
	switch (strategy) {
		case 'tab':
			return lines.map((line) =>
				line.split('\t').map((cell) => cell.trim()),
			);
		case 'pipe':
			return lines
				.filter((line) => !isSeparatorLine(line))
				.map((line) =>
					line
						.split('|')
						.map((cell) => cell.trim())
						.filter((cell) => cell.length > 0),
				);
		case 'gap': {
			const gapRe = new RegExp(`\\s{${settings.spaceMinGap},}`);
			return lines.map((line) =>
				line
					.split(gapRe)
					.map((cell) => cell.trim())
					.filter((cell) => cell.length > 0),
			);
		}
		case 'single': {
			// 两列场景：按"第一个空格"切分（关键词 + 含空格的描述，如 "package 避免命名冲突，对应 Java 包名"）
			if (singleMode(lines) === 2) {
				return lines.map((line) => {
					const idx = line.search(/\s/);
					if (idx < 0) return [line.trim()];
					return [
						line.slice(0, idx).trim(),
						line.slice(idx).trim(),
					];
				});
			}
			// 多列场景：按全部空白切分（此时单元格内不含空格，否则列数不会一致）
			return lines.map((line) =>
				line
					.split(/\s+/)
					.map((cell) => cell.trim())
					.filter((cell) => cell.length > 0),
			);
		}
	}
}

/**
 * 单空格一致性策略的众数列数（与 detectStrategy 中计算保持一致）。
 */
function singleMode(lines: string[]): number {
	const counts = new Map<number, number>();
	for (const line of lines) {
		const c = line.split(/\s+/).filter((s) => s.length > 0).length;
		counts.set(c, (counts.get(c) ?? 0) + 1);
	}
	let mode = 0;
	let modeCount = 0;
	for (const [c, cnt] of counts) {
		if (cnt > modeCount) {
			mode = c;
			modeCount = cnt;
		}
	}
	return mode;
}

/**
 * 判断是否具备表格结构。
 * 用于核心命令：是表格 → 转换；否则按原文处理。
 */
export function looksLikeTable(
	text: string,
	settings: PasteTableSettings,
): boolean {
	return detectStrategy(getLines(text), settings) !== null;
}

/**
 * 将纯文本（Tab / Pipe / 连续空格 / 单空格一致）转换为 Markdown 表格。
 */
export function textToMarkdown(
	text: string,
	settings: PasteTableSettings,
): string {
	const lines = getLines(text);
	const strategy = detectStrategy(lines, settings);
	if (!strategy) {
		throw new Error('未检测到表格结构');
	}

	const rows = parseByStrategy(lines, strategy, settings);
	if (rows.length === 0) {
		throw new Error('未能解析出有效的表格数据');
	}

	return buildMarkdownFromRows(rows, settings);
}

/**
 * 判断是否是 Markdown 表格分隔行（如 | --- | --- |）
 */
function isSeparatorLine(line: string): boolean {
	const trimmed = line.trim();
	return /^\|?[\s\-:|]+\|?$/.test(trimmed);
}

/**
 * 将二维数组组装为完整的 Markdown 表格字符串。
 */
function buildMarkdownFromRows(
	rows: string[][],
	settings: PasteTableSettings,
): string {
	const withNumbers = withRowNumber(rows, settings);
	const maxCols = Math.max(...withNumbers.map((r) => r.length));
	const normalized = withNumbers.map((row) => {
		const r = [...row];
		while (r.length < maxCols) r.push('');
		return r;
	});

	const lines: string[] = [];

	// 第一行作表头
	const header = normalized[0] ?? [];
	lines.push(`| ${header.join(' | ')} |`);
	lines.push(`| ${header.map(() => '---').join(' | ')} |`);

	for (let i = 1; i < normalized.length; i++) {
		lines.push(`| ${(normalized[i] ?? []).join(' | ')} |`);
	}

	return lines.join('\n');
}