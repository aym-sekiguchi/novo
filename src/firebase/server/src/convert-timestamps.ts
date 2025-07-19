import admin from 'firebase-admin'

/**
 * 再帰的にデータ内の日付型（firestore.Timestamp）を変換する関数
 *
 * @param data - Firestoreから取得したドキュメントデータ
 * @returns 日付型が変換されたデータ
 */
export function convertTimestamps<T>(data: T): T {
	// 配列の場合、各要素を再帰処理
	if (Array.isArray(data)) {
		return data.map((item) => convertTimestamps(item)) as unknown as T
	}

	// オブジェクトの場合、各プロパティを再帰処理
	if (data && typeof data === 'object' && !(data instanceof admin.firestore.Timestamp)) {
		const entries = Object.entries(data).map(([key, value]) => {
			if (value instanceof admin.firestore.Timestamp) {
				// Timestamp をミリ秒に変換
				return [key, value.toDate().getTime()]
			}
			return [key, convertTimestamps(value)]
		})

		// オブジェクトの型を維持して返す
		return Object.fromEntries(entries) as T
	}

	// その他の型はそのまま返す
	return data
}
