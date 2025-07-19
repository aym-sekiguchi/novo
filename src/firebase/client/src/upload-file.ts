import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/configs/firebase-client'

export async function uploadFile(options: { file: File; path: string }): Promise<string> {
	/* === options === */
	const { file, path } = options

	try {
		// 拡張子
		const extension = file.type === 'image/svg+xml' ? '.svg' : '.webp'

		// ファイル名
		const fileName = new Date().getTime() + '-' + crypto.randomUUID() + extension

		if (!storage) throw new Error('Firebase storage is not initialized')

		const storageRef = ref(storage, `${path}/${fileName}`)

		await uploadBytes(storageRef, file)

		const url = await getDownloadURL(storageRef)

		return url
	} catch (error) {
		console.error(error)

		throw error
	}
}
