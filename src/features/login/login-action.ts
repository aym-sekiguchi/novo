'use server'

import { compare } from 'bcryptjs'

import { signIn } from '@/actions'
import { store } from '@/configs/firebase-admin'
import { sleep } from '@/utilities'

import { loginSchema } from './login-schema'

import type { LoginSchemaType } from './login-schema'
import type { ProjectData } from '@/types'

/**
 * ログイン処理
 *
 */
export async function loginAction(values: LoginSchemaType): Promise<{ message: string; status: number }> {
	try {
		await sleep(1000)
		const parsed = loginSchema.parse(values)
		const { password, username } = parsed

		const user = { password: '', username: '' }

		// adminかどうかの判定
		if (username === process.env.ADMIN_USERNAME) {
			user.username = process.env.ADMIN_USERNAME
			user.password = process.env.ADMIN_PASSWORD
		} else {
			// ユーザー情報取得
			const docRef = store.collection('projects').doc(username)
			const doc = await docRef.get()

			if (!doc.exists) throw new Error('ユーザーが見つかりませんでした。')

			const data = doc.data() as ProjectData

			// ユーザー情報登録
			user.username = doc.id
			user.password = data.password
		}

		if (!user.password || !user.username) throw new Error('ユーザー情報が取得できませんでした。')

		// パスワードチェック
		const isMatch = await compare(password, user.password)

		if (!isMatch) throw new Error('パスワードが一致しませんでした。')

		const role = user.username === process.env.ADMIN_USERNAME ? 'admin' : 'editor'

		// ログイン処理
		await signIn('credentials', { redirect: false, role, username: user.username })

		/* === return === */
		return { message: 'ログインに成功しました。', status: 200 }

		/* === error === */
	} catch (error) {
		console.error(error)

		/* === return === */
		return { message: 'ログインに失敗しました。', status: 500 }
	}
}
