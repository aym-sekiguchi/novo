'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache'

import { createDocument, getDocument } from '@/firebase/server'
import { base64 } from '@/utilities'

export async function getMemo(id: string): Promise<{ content: string }> {
	'use cache'
	cacheTag(`project:${id}_memo`)
	try {
		const option = { collectionPath: `/projects/${id}/application`, documentId: 'memo' } as const

		const memo = await getDocument<{ content: string }>(option)

		// 初期化
		if (!memo) {
			await createDocument<{ content: string }>({ ...option, data: { content: base64.encode('') } })
			return { content: '' }
		}

		/* === return ===  */
		return { content: memo.content }
	} catch (error) {
		console.error(error)

		throw error
	}
}
