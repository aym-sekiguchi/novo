import { store } from '@/configs/firebase-admin'

import { getCollection, convertTimestamps } from '..'

/**
 * Firestore にドキュメントを取得する際のオプションを定義
 *
 * @property {string}   collectionPath   - Firestore コレクションのパス
 * @property {string}   documentId       - 取得するドキュメントの ID
 * @property {string[]} [subCollections] - サブコレクションのパス
 *
 */
export type GetDocumentOptions = {
	collectionPath: `/${string}`
	documentId: string
	subCollections?: readonly string[]
}

/**
 * - 指定されたFirestoreコレクションからドキュメントを取得します。
 * - ドキュメントが存在しない場合は null を返します。
 * - サブコレクションが指定されている場合は、サブコレクションのドキュメントも取得します。
 *
 * @returns ドキュメントデータ
 */
export async function getDocument<T>(options: GetDocumentOptions): Promise<T | null> {
	const { collectionPath, documentId, subCollections } = options

	try {
		// コレクションとドキュメントの参照を取得
		const collectionRef = store.collection(collectionPath)
		const documentRef = collectionRef.doc(documentId)

		// ドキュメントが存在しない場合 null を返す
		const documentSnapshot = await documentRef.get()

		if (!documentSnapshot.exists || !documentSnapshot.data()) return null

		// ドキュメントデータを取得
		const documentData = convertTimestamps(documentSnapshot.data() as T)

		// サブコレクションのデータを格納するためのオブジェクト
		const subCollectionsData: Record<string, FirebaseFirestore.DocumentData[]> = {}

		// サブコレクションが指定されている場合
		if (subCollections && subCollections.length > 0) {
			for (const subCollection of subCollections) {
				subCollectionsData[subCollection] = await getCollection({
					collectionPath: `${collectionPath}/${documentId}/${subCollection}`,
				})
			}
		}

		/* === return === */
		return { id: documentId, ...documentData, ...subCollectionsData }

		/* === error === */
	} catch (error) {
		console.error('Error getting document:', error)
		throw error // re-throw
	}
}
