import { notFound } from 'next/navigation'

import { getProject, getProperty, getSession } from '@/actions'
import { Screen } from '@/components'
import { PropertyStyleForm } from '@/features'
import { defaultStyle } from '@/libraries/src/default-style'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: 'スタイル' }
}

/**
 * 物件概要 テーマ変更
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
					{ href: '', label: 'スタイル' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<PropertyStyleForm id={username} initialValue={property.style || defaultStyle} />
			</Screen>
		</>
	)
}
