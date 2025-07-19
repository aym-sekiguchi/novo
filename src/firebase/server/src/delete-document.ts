import { store } from '@/configs/firebase-admin'

/**
 * Firestore にドキュメントを削除する際のオプションを定義
 *
 * @property {string}       collectionPath - Firestore コレクションのパス
 * @property {string}       documentId     - ドキュメント ID（省略時は自動生成）
 */
export type DeleteDocumentOptions = {
	collectionPath: `/${string}`
	documentId: string
}

/**
 * 指定されたFirestoreコレクションからドキュメントを削除します。
 *
 * @returns
 */
export async function deleteDocument(options: DeleteDocumentOptions): Promise<void> {
	const { collectionPath, documentId } = options

	try {
		const collectionRef = store.collection(collectionPath)
		const documentRef = collectionRef.doc(documentId)
		const documentSnapshot = await documentRef.get()

		// ドキュメントが存在しない場合はerror
		if (!documentSnapshot.exists || !documentSnapshot.data()) {
			throw new Error(`Document with ID ${documentId} does not exist.`) // ログ：ドキュメントが存在しない
		}

		// ドキュメントを削除
		await store.recursiveDelete(documentRef)

		/* === error === */
	} catch (error) {
		console.error(`Failed to delete document from ${collectionPath}`, error)
	}
}
