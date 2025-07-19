import { store } from '@/configs/firebase-admin'

import type { DocumentData, Query, WhereFilterOp } from 'firebase-admin/firestore'

/**
 * Firestore コレクションのドキュメントを削除する
 *
 * @property {string}       collectionPath - Firestore コレクションのパス
 * @property {conditions[]} conditions     - 削除条件
 */
export type DeleteCollectionOptions = {
	collectionPath: `/${string}`
	conditions?: {
		field: string
		operator: WhereFilterOp
		value: any // eslint-disable-line @typescript-eslint/no-explicit-any
	}[]
}

/**
 * - Firestore コレクションのドキュメントを削除する
 *
 * @returns
 */
export async function deleteCollection(options: DeleteCollectionOptions): Promise<void> {
	const { collectionPath, conditions = [] } = options

	try {
		// コレクションの参照を取得
		let collectionRef: Query<DocumentData> = store.collection(collectionPath)

		// 条件が指定されている場合、クエリを構築
		if (conditions.length > 0) {
			conditions.forEach(({ field, operator, value }) => {
				collectionRef = collectionRef.where(field, operator, value)
			})
		}

		// コレクションのドキュメントを取得
		const collectionSnapshot = await collectionRef.get()

		// ドキュメントが存在しない場合 error
		if (collectionSnapshot.empty || collectionSnapshot.size === 0) {
			throw new Error('No matching documents in ' + collectionPath)
		}

		// ドキュメントを削除
		const batch = store.batch()

		// バッチ処理
		collectionSnapshot.docs.forEach((doc) => batch.delete(doc.ref))

		// トランザクションをコミット
		await batch.commit()

		/* === error === */
	} catch (error) {
		console.error('Error deleting collection:', error)
	}
}
