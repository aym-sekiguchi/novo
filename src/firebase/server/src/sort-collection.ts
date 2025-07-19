import type { GetCollectionOptions } from '..'

/**
 * フィールドを指定してコレクションをソートする
 *
 * @param collectionData - ソートするコレクションデータ
 * @param fields - ソートするフィールド
 */
export function sortCollection<T>(collectionData: T[], sortBy: GetCollectionOptions['sortBy']): T[] {
	if (!sortBy || sortBy.length === 0) return collectionData

	// 複数フィールドのソート対応
	return collectionData.sort((a, b) => {
		for (const { field, order } of sortBy) {
			// フィールド値の比較
			const valueA = a[field as keyof T]
			const valueB = b[field as keyof T]

			if (valueA < valueB) return order === 'asc' ? -1 : 1
			if (valueA > valueB) return order === 'asc' ? 1 : -1
		}
		return 0 // 全ての条件が同じ場合
	})
}
