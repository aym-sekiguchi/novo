import { getProject, protectUserAccess } from '@/actions'

import type { Metadata } from 'next'

// Type
type UsernameLayoutProps = { children: React.ReactNode; params: Promise<{ username: string }> }

type PageProps = { params: Promise<{ username: string }> }

// metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { username } = await props.params
	const { name } = await getProject(username).catch(() => ({ name: 'not found' }))
	return {
		title: {
			default: `${name}`,
			template: `${name} | %s | Novo`,
		},
	}
}

/**
 * プロジェクトのレイアウト
 *
 */
export default async function UsernameLayout(props: UsernameLayoutProps): Promise<React.ReactNode> {
	const { children, params } = props

	const { username: param } = await params

	await protectUserAccess(param)

	/* === return === */
	return <>{children}</>
}
