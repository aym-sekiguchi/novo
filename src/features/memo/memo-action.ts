'use server'

import { revalidateTag } from 'next/cache'

import { updateDocument } from '@/firebase/server'

import type { MemoSchemaType } from './memo-schema'

/**
 * メモ保存処理
 *
 */
export async function memoAction(props: { id: string; values: MemoSchemaType }): Promise<{ error?: unknown; message: string; status: number }> {
	const { id, values } = props
	try {
		await updateDocument({
			collectionPath: `/projects/${id}/application`,
			data: { content: values.memo },
			documentId: 'memo',
		})

		// キャッシュ再検証
		revalidateTag(`project:${id}_memo`)

		/* === return === */
		return { message: '保存しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: '保存に失敗しました。', status: 500 }
	}
}
