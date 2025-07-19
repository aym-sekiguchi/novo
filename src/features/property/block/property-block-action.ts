'use server'

import { revalidateTag } from 'next/cache'

import { store } from '@/configs/firebase-admin'
import { createDocument, deleteDocument, updateDocument } from '@/firebase/server'

import type { PropertyBlockSchemaType } from './property-block-schema'

/**
 * 物件概要ブロックの編集・新規作成
 *
 */

export async function savePropertyBlockAction(props: {
	blockId: string
	id: string
	values: PropertyBlockSchemaType
}): Promise<{ error?: unknown; message: string; status: number }> {
	const { blockId, id, values } = props

	try {
		// blockIdのblockが存在するか確認
		const isBlock = !!blockId

		// 保存時のオプション
		const options = {
			collectionPath: `/projects/${id}/application/property/blocks`,
			data: values,
			documentId: blockId,
		} as const

		// 保存
		if (!isBlock) {
			await createDocument(options)
		} else {
			await updateDocument(options)
		}

		// キャッシュ再検証
		revalidateTag(`project:${id}_property`)

		/* === return === */
		return { message: '保存しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: '保存に失敗しました。', status: 500 }
	}
}

/**
 * 物件概要ブロックの削除
 *
 */

export async function deletePropertyBlockAction(props: {
	blockId: string
	id: string
}): Promise<{ error?: unknown; message: string; status: number }> {
	const { blockId, id } = props

	try {
		await deleteDocument({
			collectionPath: `/projects/${id}/application/property/blocks`,
			documentId: blockId,
		})

		// キャッシュ再検証
		revalidateTag(`project:${id}_property`)

		/* === return === */
		return { message: '削除しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: '削除に失敗しました。', status: 500 }
	}
}

/**
 * 物件概要ブロックの並び替え
 *
 */
export async function propertyBlockSortAction(props: {
	data: { id: string; order: number }[]
	id: string
}): Promise<{ error?: unknown; message: string; status: number }> {
	const { data, id } = props

	try {
		const collectionPath = `/projects/${id}/application/property/blocks`

		// バッチスタート
		const batch = store.batch()

		data.map((value, index) => {
			const docRef = store.collection(collectionPath).doc(value.id)
			batch.update(docRef, { order: index })
		})

		// //バッチコミット
		await batch.commit()

		// キャッシュ再検証
		revalidateTag(`project:${id}_property`)

		/* === return === */
		return { message: '並び替えしました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: '並び替えに失敗しました。', status: 500 }
	}
}
