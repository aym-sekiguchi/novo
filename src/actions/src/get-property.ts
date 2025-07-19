'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache'

import { createDocument, getDocument } from '@/firebase/server'
import { defaultStyle } from '@/libraries/src/default-style'

import type { PropertyData } from '@/types'

export async function getProperty(id: string): Promise<PropertyData> {
	'use cache'
	cacheTag(`project:${id}_property`)
	try {
		const option = {
			collectionPath: `/projects/${id}/application`,
			documentId: 'property',
			subCollections: ['blocks'],
		} as const

		const property = await getDocument<PropertyData>(option)

		if (!property) {
			const accessToken = crypto.randomUUID().replace(/-/g, '')
			const data: Omit<PropertyData, 'blocks'> = {
				accessToken,
				domains: [],
				isDraft: false,
				isPublic: false,
				style: defaultStyle,
			}
			await createDocument<Omit<PropertyData, 'blocks'>>({
				collectionPath: option.collectionPath,
				data,
				documentId: option.documentId,
			})
			return { blocks: [], ...data }
		}

		// ブロックを並び替え
		property.blocks = property.blocks.sort((a, b) => a.order - b.order)

		/* === return ===  */
		return property
	} catch (error) {
		console.error(error)

		throw error
	}
}
