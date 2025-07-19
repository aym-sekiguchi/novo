/**
 * テンプレート文字列の変数をデータに基づいて置換する
 *
 * - テンプレートの変数は `__変数名__` の形式で指定する
 *
 * @param template - テンプレート文字列
 * @param data - 置換データ（キー: 変数名, 値: 置換後の文字列）
 *
 * @returns 置換後の文字列
 */

export function fillTemplate(template: string, data: Record<string, string | number>): string {
	return template.replace(/__(\w+\.\w+)__/g, (placeholder, variable) => {
		return Object.hasOwn(data, variable) ? String(data[variable as string]) : placeholder
	})
}
