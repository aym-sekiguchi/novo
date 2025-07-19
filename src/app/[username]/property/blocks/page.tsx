import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'
import { Screen } from '@/components'
import { PropertyBlocks } from '@/features'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: '編集' }
}

/**
 * 物件概要 編集
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	const { username } = await props.params
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())
	const { role } = await getSession()
	const property = await getProperty(username).catch((error) => {
		console.error(error)
		return notFound()
	})

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: '../', label: 'Home' },
					{ href: './', label: '物件概要' },
					{ href: '', label: 'データ管理' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="flex flex-1 flex-col gap-8">{property && <PropertyBlocks id={username} property={property} />}</div>
			</Screen>
		</>
	)
}
