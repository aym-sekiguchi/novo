/**
 * base64 エンコード・デコード
 *
 */
export const base64 = {
	/**
	 * base64 デコード
	 *
	 * @param value - 文字
	 */
	decode: (value: string): string => {
		// バイナリをテキストに変換
		const binary = atob(value)
		const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

		// テキストに変換
		const decoder = new TextDecoder()

		/* === return === */
		return decoder.decode(bytes)
	},

	/**
	 * base64 エンコード
	 *
	 * @param value - 文字
	 */
	encode: (value: string): string => {
		// テキストをバイトに変換
		const encoder = new TextEncoder()
		const bytes = encoder.encode(value)

		// バイナリに変換
		const binary = Array.from(bytes)
			.map((byte) => String.fromCharCode(byte))
			.join('')

		/* === return === */
		return btoa(binary)
	},
}
