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
	return { title: '編集' }
}

/**
 * 物件概要 ブロック 編集
 *
 */
export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	/* ===  data === */
	// パラメーターからusernameを取得
	const { slug, username } = await props.params

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
	const propertyBlock = property.blocks.find((block) => block.id === slug)

	if (!propertyBlock) notFound()

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: '../../../', label: 'Home' },
					{ href: '../../', label: '物件概要' },
					{ href: '../', label: 'データ管理' },
					{ href: '', label: '編集' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="flex gap-6">
					<div className="relative flex flex-1 flex-col gap-4">
						<PropertyBlockForm id={username} initialValue={propertyBlock} />
					</div>
				</div>
			</Screen>
		</>
	)
}
