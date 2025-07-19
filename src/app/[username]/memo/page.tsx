import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getMemo } from '@/actions/src/get-memo'
import { Screen } from '@/components'
import { MemoForm } from '@/features'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: 'memo' }
}

/**
 * ページ
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	const { username } = await props.params
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())
	const { role } = await getSession()
	const { content: memo } = await getMemo(username)

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: './', label: 'Home' },
					{ href: '', label: 'メモ' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-bold">Memo</h2>
					<MemoForm initialValue={memo} username={username} />
				</div>
			</Screen>
		</>
	)
}
