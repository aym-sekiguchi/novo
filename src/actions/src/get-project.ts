'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache'

import { getDocument } from '@/firebase/server'

import type { ProjectData } from '@/types'

export async function getProject(id: string): Promise<ProjectData> {
	'use cache'
	cacheTag(`project:${id}`)
	try {
		const project = await getDocument<ProjectData>({ collectionPath: '/projects', documentId: id })

		if (!project) throw new Error(`${id}:プロジェクトがありません。`)

		/* === return ===  */
		return project
	} catch (error) {
		console.error(error)

		throw error
	}
}
