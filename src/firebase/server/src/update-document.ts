import admin from 'firebase-admin'

import { store } from '@/configs/firebase-admin'

import type { DocumentData, UpdateData } from 'firebase-admin/firestore'

/**
 * Firestore にドキュメントを更新する際のオプションを定義
 *
 * @property {string} collectionPath - コレクションパス
 * @property {string} documentId     - ドキュメントID
 * @property {string} [updatedBy]     - 更新者の ID (省略時は不明)
 * @property {T}      data           - 更新するデータ
 */
export type UpdateDocumentOptions<T> = {
	collectionPath: `/${string}`
	data: T
	documentId: string
	updatedBy?: string
}

/**
 * 指定されたFirestoreコレクション内のドキュメントを更新します。
 * 存在しないフィールドは新たに追加され、存在するフィールドは更新されます。
 *
 * @returns 更新されたドキュメント
 * @throws エラーが発生した場合にスローされます
 */
export async function updateDocument<T extends UpdateData<DocumentData>>(options: UpdateDocumentOptions<T>): Promise<string> {
	const { collectionPath, data, documentId } = options

	// collectionPath または documentId が未指定の場合はエラーをスロー
	if (!collectionPath || !documentId) {
		throw new Error('The "collectionPath" and "documentId" fields are required.')
	}

	// data がオブジェクトでない場合はエラーをスロー
	if (!data || typeof data !== 'object') {
		throw new Error('The "data" field must be a valid object.')
	}

	// サーバータイムスタンプを取得
	const updatedAt = admin.firestore.FieldValue.serverTimestamp()

	// 更新するメタデータ
	const meta = { updatedAt }

	try {
		// コレクションとドキュメントを参照
		const collectionRef = store.collection(collectionPath)
		const documentRef = collectionRef.doc(documentId)

		// 値が undefined のフィールドを削除
		Object.keys(data).forEach((key) => data[key] === undefined && delete data[key])

		// トランザクションを開始
		const batch = store.batch()

		// ドキュメントを作成
		batch.update(documentRef, { ...data, ...meta })

		// トランザクションをコミット
		await batch.commit()

		/* === return === */
		return documentRef.id // ドキュメントIDを返す

		/* === error === */
	} catch (error) {
		console.error('Error updating document:', error)
		throw error // エラーを再スロー
	}
}
