'use server'
import admin from 'firebase-admin'
import { revalidateTag } from 'next/cache'

import { updateDocument } from '@/firebase/server'

/**
 * プロジェクト編集処理
 *
 */
export async function propertyDeployAction(props: { id: string; value: string }): Promise<{ message: string; status: number }> {
	const { id, value } = props
	try {
		const fixedAt = admin.firestore.FieldValue.serverTimestamp()

		await updateDocument({
			collectionPath: `/projects/${id}/application`,
			data: { fixedAt, fixedData: value },
			documentId: 'property',
		})

		// キャッシュ再検証
		revalidateTag(`project:${id}_property`)

		/* === return === */
		return { message: '保存しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: String(error), status: 500 }
	}
}
