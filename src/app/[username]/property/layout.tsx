import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'

import type { Metadata } from 'next'

// Type
type PropertyLayoutProps = { children: React.ReactNode; params: Promise<{ username: string }> }

type PageProps = { params: Promise<{ username: string }> }

// metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { username } = await props.params
	const { name } = await getProject(username).catch(() => ({ name: 'not found' }))
	return {
		title: {
			default: '物件概要',
			template: `${name} | %s | 物件概要 | Novo`,
		},
	}
}

export default async function RootLayout(props: PropertyLayoutProps): Promise<React.ReactNode> {
	/* === props === */
	const { children, params } = props

	/* ===  data === */
	// パラメーターからusernameを取得
	const { username } = await params

	// セッション情報からroleを取得
	const { role } = await getSession()

	// 物件概要を取得
	await getProperty(username)
		.then((response) => {
			if (response.isPublic || (!response.isPublic && role === 'admin')) {
				return
			} else {
				throw new Error('物件概要が有効ではありません。')
			}
		})
		.catch((error) => {
			console.error(error)
			notFound()
		})

	/* === return === */
	return children
}
