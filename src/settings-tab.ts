import { App, PluginSettingTab } from 'obsidian';
import type { SettingDefinitionItem } from 'obsidian';
import type PasteTablePlugin from './main';

export class PasteTableSettingTab extends PluginSettingTab {
	plugin: PasteTablePlugin;

	constructor(app: App, plugin: PasteTablePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				name: '表格格式',
				type: 'group',
				heading: '表格格式',
				items: [
					{
						name: '数字排序列',
						desc: '在表格最左侧显示数字列（# / 1 / 2 / 3 …）',
						control: {
							key: 'showRowNumber',
							type: 'toggle',
						},
					},
				],
			},
			{
				name: '文本表格解析',
				type: 'group',
				heading: '文本表格解析',
				items: [
					{
						name: '最小连续空格数',
						desc: '空格对齐表格的列分隔阈值，连续 n 个空格视为列分隔',
						control: {
							key: 'spaceMinGap',
							type: 'number',
							min: 2,
							placeholder: '2',
						},
					},
				],
			},
		];
	}
}