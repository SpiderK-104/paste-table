export interface PasteTableSettings {
	/** 是否显示最左侧数字排序列 */
	showRowNumber: boolean;
	/** 空格伪表格: 最少连续空格数作为列分隔 */
	spaceMinGap: number;
}

export const DEFAULT_SETTINGS: PasteTableSettings = {
	showRowNumber: false,
	spaceMinGap: 2,
};