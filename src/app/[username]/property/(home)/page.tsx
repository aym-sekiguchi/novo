import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProject, getSession } from '@/actions'
import { Card, CardContent, Screen } from '@/components'
import { propertyContents } from '@/libraries'

// Type
type PageProps = { params: Promise<{ username: string }> }

/**
 * 物件概要ダッシュボード
 *
 */

export default async function Home(props: Readonly<PageProps>): Promise<React.ReactNode> {
	/* ===  props === */
	const { params } = props

	/* ===  data === */
	// パラメータからusernameを取得
	const { username } = await params

	// ログインユーザーの権限を取得
	const { role } = await getSession()

	// プロジェクトのavatar/isPublic/nameを取得
	const { avatar, isPublic, name } = await getProject(username).catch(() => notFound())

	/* ===  return === */
	return (
		<>
			<Screen
				avatar={avatar}
				breadcrumb={[
					{ href: './', label: 'Home' },
					{ href: '', label: '物件概要' },
				]}
				isPublic={isPublic}
				projectName={name}
				role={role}
				username={username}
			>
				<div className="flex flex-col gap-6">
					{/* ツール一覧 */}
					<div className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
						{propertyContents.map(
							(content, index) =>
								(content.link !== 'setting' || role !== 'editor') && (
									<Link
										className="transition hover:brightness-90"
										href={`./property/${content.link}`}
										key={`contents-${index}`}
										target={content.target || '_self'}
									>
										<Card className="w-full">
											<CardContent>
												<div className="flex items-center gap-4">
													{content.icon}
													<p className="text-xl font-bold">{content.label}</p>
												</div>
											</CardContent>
										</Card>
									</Link>
								),
						)}
					</div>
				</div>
			</Screen>
		</>
	)
}
