'use server'

import { revalidateTag } from 'next/cache'

import { updateDocument } from '@/firebase/server'

import type { SettingApplicationSchemaType } from './setting-application-schema'

export async function settingApplicationAction(props: {
	id: string
	values: SettingApplicationSchemaType
}): Promise<{ error?: unknown; message: string; status: number }> {
	const { id, values } = props

	try {
		await updateDocument({
			collectionPath: `/projects/${id}/application`,
			data: { ...values },
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
		return { message: '保存に失敗しました。', status: 500 }
	}
}
