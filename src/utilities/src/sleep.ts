/**
 * 指定された時間スリープする
 *
 * @param ms - スリープする時間（ミリ秒）
 */
export function sleep(ms: number): Promise<void> {
	/* === return === */
	return new Promise((res) => setTimeout(res, ms))
}
