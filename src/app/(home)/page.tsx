import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSession } from '@/actions'
import { BreadcrumbItem, BreadcrumbList, BreadcrumbPage, Breadcrumb, Footer, Board, ScrollArea, ThemeSelector, LogoutButton } from '@/components'
import { ProjectController, ProjectList, ProjectProvider, CreateProjectForm, UpdateProjectForm } from '@/features'
import { ProjectDeleteForm } from '@/features/project/delete-project-form'
import { getCollection } from '@/firebase/server'

import type { ProjectData } from '@/types'
import type { Metadata } from 'next'

// metadata
export const metadata: Metadata = { title: 'プロジェクト管理' }

/**
 * プロジェクト管理ページ
 *
 */
export default async function Home(): Promise<React.ReactNode> {
	const { role, username } = await getSession()

	// 権限がeditorの場合は対象のページへ
	if (role === 'editor') redirect(`/${username}`)

	// 全プロジェクト取得
	const projects = await getCollection<ProjectData>({ collectionPath: '/projects' })

	const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

	/* ===  return === */
	return (
		<div className="flex flex-1 flex-col gap-3 md:gap-6">
			{/* header */}
			<header className="px-3 pt-3 md:px-6 md:pt-8">
				<Board className="flex w-full items-center justify-between gap-3 p-3 md:gap-6 md:px-6">
					{/* タイトル */}
					<h1 className="text-xl font-bold md:text-2xl">
						<Link className="transition hover:opacity-60" href="/">
							Novo
						</Link>
					</h1>

					{/* アイコン群 */}
					<div className="flex gap-3">
						{/* テーマ設定 */}
						<ThemeSelector />
						{/* ログアウト */}
						<LogoutButton variant="icon" />
					</div>
				</Board>
			</header>

			{/* main */}
			<main className="flex flex-1 flex-col px-3 md:px-6">
				<Board className="relative flex-1">
					<div className="absolute inset-1 flex flex-auto flex-col py-3 md:px-3">
						<ScrollArea className="@container flex-1">
							{/* paddingに中のコンテンツがoverflowするように */}
							<div className="flex h-full flex-col gap-3 px-3 pb-3 md:gap-6">
								{/* ぱんくず */}
								<div className="border-line bg-background sticky top-0 z-50 border-b px-3 pt-3 pb-2">
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbPage>Home</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								{/* プロジェクト */}
								<ProjectProvider allTags={allTags}>
									{/* 新規作成ボタンとフォーム */}
									<CreateProjectForm />

									{/* 更新フォーム */}
									<UpdateProjectForm />

									{/* 削除フォーム */}
									<ProjectDeleteForm />

									{/* コントローラー */}
									<ProjectController />

									{/* リスト */}
									<ProjectList projects={projects} />
								</ProjectProvider>
							</div>
							<div className="h-96" />
							<div className="h-96" />
							<div className="h-96" />
						</ScrollArea>
					</div>
				</Board>
			</main>

			{/* footer */}
			<Footer />
		</div>
	)
}
