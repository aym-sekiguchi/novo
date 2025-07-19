'use server'

import { revalidateTag } from 'next/cache'

import { updateDocument } from '@/firebase/server'

import type { PropertyStyleSchemaType } from './property-style-schema'

/**
 * 物件概要ブロックの編集
 *
 */

export async function propertyStyleAction(props: {
	id: string
	values: PropertyStyleSchemaType
}): Promise<{ error?: unknown; message: string; status: number }> {
	const { id, values } = props

	try {
		// 保存
		await updateDocument({ collectionPath: `/projects/${id}/application`, data: { style: values }, documentId: 'property' })

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
