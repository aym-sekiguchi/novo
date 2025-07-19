import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'
import { Screen } from '@/components'
import { SettingApplicationForm } from '@/features'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: '設定' }
}
/**
 * 管理者設定ページ
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	/* ===  data === */
	const { username } = await props.params

	const { role } = await getSession()
		.then((response) => {
			if (response.role === 'editor') throw new Error('権限がありません。')
			return response
		})
		.catch((error) => {
			console.error(error)

			notFound()
		})

	// プロジェクトのavatar/isPublic/nameを取得
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())

	// 物件概要のdomains/isDraft/isPublicを取得
	const { domains, isDraft, isPublic: propertyIsPublic } = await getProperty(username).catch(() => notFound())

	/* ===  return === */
	return (
		<Screen
			avatar={avatar}
			breadcrumb={[
				{ href: '../', label: 'Home' },
				{ href: './', label: '物件概要' },
				{ href: '', label: '設定' },
			]}
			isPublic={isPublic}
			projectName={name}
			role={role}
			username={username}
		>
			<SettingApplicationForm id={username} initialValues={{ domains, isDraft, isPublic: propertyIsPublic }} />
		</Screen>
	)
}
