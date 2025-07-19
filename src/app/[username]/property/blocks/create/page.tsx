import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'
import { Screen } from '@/components'
import { PropertyBlockForm } from '@/features/property/block/property-block-form'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ slug: string; username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: '新規作成' }
}

/**
 * 物件概要 ブロック作成
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	/* ===  data === */
	// パラメーターからusernameを取得
	const { username } = await props.params

	// プロジェクトの情報からavatar/isPublic/nameを取得
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())

	// セッション情報からroleを取得
	const { role } = await getSession()

	// 物件概要を取得
	const property = await getProperty(username).catch((error) => {
		console.error(error)
		return notFound()
	})

	// プロパティブロックを取得
	const initialValue = {
		id: '',
		isPublic: false,
		order: property.blocks.length,
		type: 'table',
	} as const

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: '../../', label: 'Home' },
					{ href: '../', label: '物件概要' },
					{ href: './', label: 'データ管理' },
					{ href: '', label: '新規作成' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="flex gap-6">
					<div className="relative flex flex-1 flex-col gap-4">
						<PropertyBlockForm id={username} initialValue={initialValue} />
					</div>
				</div>
			</Screen>
		</>
	)
}
