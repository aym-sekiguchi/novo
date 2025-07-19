import { store } from '@/configs/firebase-admin'

import { convertTimestamps, sortCollection } from '..'

import type { DocumentData, Query, WhereFilterOp } from 'firebase-admin/firestore'

/**
 * Firestore コレクションのドキュメントを取得する
 *
 * @property {string} collectionPath - Firestore コレクションのパス
 * @property {conditions[]} conditions - 取得条件
 */
export type GetCollectionOptions = {
	collectionPath: `/${string}`
	conditions?: {
		field: string
		operator: WhereFilterOp
		value: any // eslint-disable-line @typescript-eslint/no-explicit-any
	}[]
	sortBy?: {
		field: string
		order: 'asc' | 'desc'
	}[]
}

/**
 * - Firestore コレクションのドキュメントを取得する
 * - デフォルトで `createdAt` フィールドで降順にソートされる
 *
 * @returns ドキュメントデータ
 */
export async function getCollection<T extends DocumentData & { id: string }>(options: GetCollectionOptions): Promise<T[]> {
	const { collectionPath, conditions = [], sortBy = [] } = options

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

		// ドキュメントが存在しない場合、空の配列を返す
		if (collectionSnapshot.empty) return []

		// ドキュメントデータを取得（ついでに documentId を追加する）
		const collectionData = collectionSnapshot.docs.map((doc) => {
			const data = convertTimestamps<T>(doc.data() as T)

			/* === return === */
			return { ...data, id: doc.id }
		})

		// デフォルトで `createAt` フィールドで降順にソート
		sortBy.push({ field: 'createdAt', order: 'desc' })

		/* === return === */
		return sortCollection<T>(collectionData, sortBy)

		/* === error === */
	} catch (error) {
		console.error('Error getting collection:', error)
		throw error // re-throw
	}
}
