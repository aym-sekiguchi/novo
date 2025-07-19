import { deleteObject, ref } from 'firebase/storage'

import { storage } from '@/configs/firebase-client'

export async function deleteFile(options: { url: string }): Promise<void> {
	/* === options === */
	const { url } = options

	try {
		// Firebase Storage の初期化を確認
		if (!storage) throw new Error('Firebase storage is not initialized')

		const fileName = getStoragePathFromUrl(url)

		// Storage の参照を取得
		const storageRef = ref(storage, fileName || '')

		// 削除
		await deleteObject(storageRef)

		// 削除失敗
	} catch (error) {
		console.error(error)
	}
}

function getStoragePathFromUrl(url: string): string | null {
	const matches = url.match(/\/o\/(.*?)\?/)
	if (!matches || matches.length < 2) return null

	// URLデコードされたファイルパスを返す
	return decodeURIComponent(matches[1])
}
