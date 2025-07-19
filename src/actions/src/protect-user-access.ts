'use server'

import { notFound } from 'next/navigation'

import { getProject } from './get-project'
import { getSession } from './get-session'

/**
 * ユーザーのアクセスを保護
 *
 * 	- プロジェクトが見つからない場合はnotFoundにする
 * 	- ロールがeditorで自分のページ以外にアクセスした場合はnotFoundにする
 *
 * @param username
 *
 */
export async function protectUserAccess(username: string): Promise<void> {
	try {
		// プロジェクトを取得
		const { isPublic } = await getProject(username).catch((error) => {
			// プロジェクトが見つからない場合はエラー
			throw new Error(`${error}\nプロジェクトが見つかりませんでした。`)
		})

		// セッションを取得
		await getSession().then(({ role, username: sessionUsername }) => {
			// ロールがeditorで自分のページ以外にアクセスした場合はエラー
			if (username !== sessionUsername && role === 'editor') throw new Error('アクセス権限がありません。')

			// プロジェクトが非公開でロールがeditorの場合はエラー
			if (!isPublic && role === 'editor') throw new Error('プロジェクトが見つかりませんでした。')
		})
	} catch (error) {
		console.error(error)
		notFound()
	}
}
