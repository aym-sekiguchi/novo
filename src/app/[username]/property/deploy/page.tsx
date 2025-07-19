import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { getProperty } from '@/actions/src/get-property'
import { Screen } from '@/components'
import { PropertyDeployForm } from '@/features'

import type { Metadata } from 'next'

// Type
type PageProps = { params: Promise<{ username: string }> }

// metadata
export function generateMetadata(): Metadata {
	return { title: '本番反映' }
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

	const fixedAt = property.fixedAt ?? ''
	const fixedAtDate = new Date(fixedAt)
	const fixedAtFormatted = `${fixedAtDate.getFullYear()}/${fixedAtDate.getMonth() + 1}/${fixedAtDate.getDate()} ${String(fixedAtDate.getHours()).padStart(2, '0')}:${String(fixedAtDate.getMinutes()).padStart(2, '0')}`
	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: '../', label: 'Home' },
					{ href: './', label: '物件概要' },
					{ href: '', label: '本番反映' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div>
					<h3 className="text-xl font-bold">本番サイトに反映{!property.isDraft && '（⚠️無効）'}</h3>
					<p>
						{property.isDraft ? (
							'このボタンを押すと、現在のデータが本番サイトに反映されます。'
						) : (
							<>
								現在、テスト環境の利用が無効になっているため、本番サイトへの反映はできません。
								<br />
								テスト環境の設定を変更できるのは管理者のみです。必要な場合は管理者に連絡してください。
							</>
						)}
					</p>
				</div>
				<div className="my-4 flex max-w-lg flex-col items-end gap-2">
					<PropertyDeployForm data={JSON.stringify(property.blocks)} id={username} isDraft={property.isDraft} />
					<p className="text-neutral-foreground text-sm">最終更新日時：{property.fixedAt ? fixedAtFormatted : ''}</p>
				</div>
			</Screen>
		</>
	)
}
