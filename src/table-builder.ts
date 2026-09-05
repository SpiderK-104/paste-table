import type { PasteTableSettings } from './settings';

/**
 * 在二维数组前插入最左侧数字排序列。
 * 第一行（表头）写 "#"，数据行写 1, 2, 3…
 * @returns 新的二维数组；开关关闭时原样返回。
 */
export function withRowNumber(
	rows: string[][],
	settings: PasteTableSettings,
): string[][] {
	if (!settings.showRowNumber || rows.length === 0) {
		return rows;
	}

	return rows.map((row, i) => {
		if (i === 0) {
			return ['#', ...row];
		}
		return [String(i), ...row];
	});
}