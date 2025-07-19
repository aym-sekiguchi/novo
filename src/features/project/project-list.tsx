'use client'

import { ExternalLink, LayoutDashboard, Trash2, UserPen } from 'lucide-react'
import Link from 'next/link'

import { Badge, Button, Card, CardContent } from '@/components'

import { useProject } from './project-provider'

import type { ProjectData } from '@/types'

/**
 * ProjectList
 * プロジェクト一覧
 *
 * @param props
 *
 * @returns
 */
export function ProjectList(props: { projects: ProjectData[] }): React.ReactNode {
	/* === props === */
	const { projects } = props

	/* === hooks === */
	const { listState } = useProject()

	return (
		<div className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
			{projects
				// 公開/非公開
				.filter((project) => {
					if (listState.access === 'public') {
						return project.isPublic
					}
					if (listState.access === 'private') {
						return !project.isPublic
					}
					return false
				})
				// tag
				.filter((project) => listState.tags.length === 0 || listState.tags.some((tag) => project.tags.includes(tag)))
				// word
				.filter((project) => project.name.includes(listState.word))
				// sort
				.sort((a, b) => (listState.sort === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt))
				.map((project, index) => (
					<ProjectCard key={`project-${index}`} project={project} />
				))}
		</div>
	)
}

// プロジェクトカード
function ProjectCard(props: { project: Omit<ProjectData, 'avatar'> }): React.ReactNode {
	const { id, isPublic, name, tags } = props.project

	/* === hooks === */
	const { onFormState } = useProject()

	/* === event === */
	// プロジェクト編集ボタンのイベント
	const handleEditProjectClick = (event: React.MouseEvent): void => {
		event.preventDefault()
		onFormState({ project: props.project, state: 'update' })
	}
	// プロジェクト削除ボタンのイベント
	const handleDeleteProjectClick = (event: React.MouseEvent): void => {
		event.preventDefault()
		onFormState({ project: props.project, state: 'delete' })
	}

	return (
		<Card className="@container relative flex size-full min-h-[9.25rem] md:min-h-[8.5rem]">
			{/* <Link className="flex-1" href={`/${id}`} target="_blank"> */}
			<CardContent className="!my-0 flex w-full justify-between gap-4 py-4 md:py-6 @max-lg:flex-col">
				<div className="flex flex-col gap-2 overflow-hidden">
					<div className="flex flex-wrap gap-2">
						<Badge variant={isPublic ? 'success' : 'warning'}>{isPublic ? '公開中' : '非公開'}</Badge>
					</div>
					<p className="text-lg font-bold tracking-tight md:text-xl">{name}</p>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag, index) => (
							<p className="shrink-0 text-xs text-gray-500" key={`${id}-tag${index}`}>
								#{tag}
							</p>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Button aria-label="編集" asChild className="bp-0 flex items-center gap-2" variant="secondary">
						<Link href={`/${id}`} target="_blank">
							<LayoutDashboard size={20} strokeWidth={1.5} />
							<p className="flex items-center gap-1 text-sm">
								<span>管理画面</span>
								<ExternalLink size={16} strokeWidth={1.5} />
							</p>
						</Link>
					</Button>
					<Button aria-label="編集" className="bp-0 flex items-center gap-2" onClick={handleEditProjectClick} variant="secondary">
						<UserPen size={20} strokeWidth={1.5} />
						<p className="text-sm">プロジェクト編集</p>
					</Button>
					<Button
						aria-label="削除"
						className="bp-0 flex items-center gap-2"
						disabled={isPublic}
						onClick={handleDeleteProjectClick}
						variant="destructive"
					>
						<Trash2 size={20} strokeWidth={1.5} />
						<p className="text-sm">プロジェクト削除</p>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
