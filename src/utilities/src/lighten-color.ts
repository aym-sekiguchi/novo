/**
 * カラーを明るくする
 *
 *
 */

export function lightenColor(hex: string, percent: number): string {
	// 16進数の#を削除
	hex = hex.replace(/^#/, '')

	// 3桁の省略形 (#369 → #336699) の場合を展開
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('')
	}

	// R, G, Bの値を取得
	let r = parseInt(hex.substring(0, 2), 16)
	let g = parseInt(hex.substring(2, 4), 16)
	let b = parseInt(hex.substring(4, 6), 16)

	// 各色の値を明るくする
	r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)))
	g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)))
	b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)))

	// 16進数に変換し、2桁で表示
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
