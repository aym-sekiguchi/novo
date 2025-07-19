import admin from 'firebase-admin'

import { store } from '@/configs/firebase-admin'

import type { DocumentData } from 'firebase-admin/firestore'

/**
 * Firestore にドキュメントを作成する際のオプションを定義
 *
 * @property {string}       collectionPath - Firestore コレクションのパス
 * @property {DocumentData} data           - ドキュメントのデータ
 * @property {string}       [documentId]   - ドキュメント ID（省略時は自動生成）
 */
type Options<T> = {
	collectionPath: `/${string}`
	data: T
	documentId?: string
}

/**
 * Firestore にドキュメントを作成する際のオプションを定義
 *
 * @property {string}       collectionPath   - Firestore コレクションのパス
 * @property {DocumentData} data             - ドキュメントのデータ
 * @property {string}       [documentId]     - ドキュメント ID（省略時は自動生成）
 * @property {Options[]}    [subCollections] - サブコレクションのオプション
 */
export type CreateDocumentOptions<T> = Options<T> & {
	subCollections?: Array<Options<DocumentData>> // ドキュメントデータ型を指定
}

/**
 * - 指定されたFirestoreコレクションにドキュメントを作成します。
 * - documentIdが提供されない場合、自動的に生成されたIDを使用します。
 * - 作成されたドキュメントのIDを返します。
 *
 * @returns ドキュメントID
 */
export async function createDocument<T extends DocumentData>(options: CreateDocumentOptions<T>): Promise<string> {
	const { collectionPath, data, documentId, subCollections } = options

	// data がオブジェクトでない場合はエラーをスロー
	if (!data || typeof data !== 'object') {
		throw new Error('The "data" field must be a valid object.')
	}

	// サーバータイムスタンプを取得
	const createdAt = admin.firestore.FieldValue.serverTimestamp()
	const updatedAt = admin.firestore.FieldValue.serverTimestamp()

	// 追加するメタデータ
	const meta = { createdAt, updatedAt }

	try {
		// コレクションとドキュメントの参照を取得
		const collectionRef = store.collection(collectionPath)
		const documentRef = documentId ? collectionRef.doc(documentId) : collectionRef.doc()

		// 既に存在するドキュメントの場合はエラーをスロー
		const documentSnapshot = await documentRef.get()

		if (documentSnapshot.exists) {
			throw new Error(`${documentId}は使用できません。`)
		}

		// 値が undefined のフィールドを削除
		Object.keys(data).forEach((key) => data[key] === undefined && delete data[key])

		// トランザクションを開始
		const batch = store.batch()

		// ドキュメントを作成
		batch.create(documentRef, { ...data, ...meta })

		// サブコレクションを作成
		if (subCollections) {
			for (const { collectionPath: subCollectionPath, data: subData, documentId: subDocumentId } of subCollections) {
				// data がオブジェクトでない場合はエラーをスロー
				if (!subData || typeof subData !== 'object') {
					throw new Error(`sub collection data must be a valid object for sub collection ${subCollectionPath}.`)
				}

				// サブコレクションの参照とドキュメントの参照を取得
				const subCollectionRef = documentRef.collection(subCollectionPath)
				const subDocumentRef = subDocumentId ? subCollectionRef.doc(subDocumentId) : subCollectionRef.doc()

				// 値が undefined のフィールドを削除
				Object.keys(subData).forEach((key) => subData[key] === undefined && delete subData[key])

				// ドキュメントを作成
				batch.create(subDocumentRef, { ...subData, ...meta })
			}
		}

		// トランザクションをコミット
		await batch.commit()

		/* === return === */
		return documentRef.id // ドキュメントIDを返す

		/* === error === */
	} catch (error) {
		console.error('Error creating document:', error)
		throw error // re-throw
	}
}
