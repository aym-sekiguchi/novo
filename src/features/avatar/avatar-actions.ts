'use server'

import { revalidateTag } from 'next/cache'

import { updateDocument } from '@/firebase/server'

import { avatarSchema } from './avatar-schema'

import type { AvatarSchemaType } from './avatar-schema'
import type { ProjectData } from '@/types'

/**
 * プロジェクト編集処理
 *
 */
export async function avatarAction(props: { id: string; values: AvatarSchemaType }): Promise<{ message: string; status: number }> {
	const { id, values } = props
	try {
		const { avatar } = avatarSchema.parse(values)

		await updateDocument<Pick<ProjectData, 'avatar'>>({ collectionPath: `/projects`, data: { avatar: avatar || '' }, documentId: id })

		// キャッシュ再検証
		revalidateTag(`project:${id}`)

		/* === return === */
		return { message: '保存しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: String(error), status: 500 }
	}
}
