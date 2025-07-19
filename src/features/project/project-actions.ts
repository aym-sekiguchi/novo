'use server'

import { hashSync } from 'bcryptjs'
import { revalidateTag } from 'next/cache'

import { createDocument, deleteDocument, getCollection, updateDocument } from '@/firebase/server'

import { createProjectSchema, updateProjectSchema } from './project-schemas'

import type { CreateProjectSchemaType, UpdateProjectSchemaType } from './project-schemas'
import type { ProjectData } from '@/types'

/**
 * プロジェクト新規作成アクション
 *
 */
export async function createProjectAction(values: CreateProjectSchemaType): Promise<{ message: string; status: number }> {
	try {
		const { name, 'new-password': password, tags = [], username: id } = createProjectSchema.parse(values)

		// usernameがloginの場合弾く
		if (id === 'login' || id === process.env.ADMIN_USERNAME) throw new Error('このユーザー名は使用できません。')

		// プロジェクトの作成上限に達していないかを判定
		await getCollection<ProjectData>({ collectionPath: '/projects' }).then((projects) => {
			if (projects.length >= 1000) throw new Error('プロジェクトの作成上限に達しています。')
		})

		// パスワードをハッシュ化
		const hash = hashSync(password, 10)

		await createDocument<Pick<ProjectData, 'avatar' | 'isPublic' | 'name' | 'password' | 'tags'>>({
			collectionPath: '/projects',
			data: { avatar: '', isPublic: false, name, password: hash, tags },
			documentId: id,
		})

		/* === return === */
		return { message: '保存しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: String(error), status: 500 }
	}
}

/**
 * プロジェクト編集処理
 *
 */
export async function updateProjectAction(props: { id: string; values: UpdateProjectSchemaType }): Promise<{ message: string; status: number }> {
	const { id, values } = props
	try {
		const { isPublic, name, tags = [] } = updateProjectSchema.parse(values)

		await updateDocument<Pick<ProjectData, 'name' | 'tags' | 'isPublic'>>({
			collectionPath: `/projects`,
			data: { isPublic, name, tags },
			documentId: id,
		})

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

/**
 * プロジェクト削除処理
 */
export async function deleteProjectAction(id: string): Promise<{ message: string; status: number }> {
	try {
		await deleteDocument({ collectionPath: '/projects', documentId: id })

		// キャッシュ再検証
		revalidateTag(`project:${id}`)

		/* === return === */
		return { message: '削除しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: String(error), status: 500 }
	}
}
