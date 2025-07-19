'use client'

import { createContext, use, useState } from 'react'

import type { ProjectData } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

/* === types === */
// フォームのON/OFF状態と編集するプロジェクトデータ
type FormState = {
	project?: Omit<ProjectData, 'avatar'>
	state: 'update' | 'delete' | 'create' | 'none'
}

// プロジェクトリストのフィルタリング条件
type ListState = {
	access: 'public' | 'private'
	sort: 'asc' | 'desc'
	tags: string[]
	word: string
}

// プロジェクトプロバイダのプロパティ
type ProjectProviderProps = Pick<ProjectContextProps, 'allTags'> & {
	children: React.ReactNode
}

// プロジェクトコンテキストのプロパティ
type ProjectContextProps = {
	allTags: string[]
	formState: FormState
	listState: ListState
	onFormState: Dispatch<SetStateAction<FormState>>
	onListState: Dispatch<SetStateAction<ListState>>
}

/* === context === */
// プロジェクトコンテキスト作成
const ProjectContext = createContext<ProjectContextProps>({
	allTags: [],
	formState: { state: 'none' },
	listState: { access: 'public', sort: 'asc', tags: [], word: '' },
	onFormState: () => {},
	onListState: () => {},
})

/* === hooks === */
export const useProject = (): ProjectContextProps => use(ProjectContext)

/**
 * ProjectProvider
 *
 * @param props
 *
 * @returns
 */
export function ProjectProvider(props: ProjectProviderProps): React.ReactNode {
	const { allTags, children } = props

	/* === hooks === */
	const [formState, setFormState] = useState<FormState>({ state: 'none' })
	const [listState, setListState] = useState<ListState>({ access: 'public', sort: 'asc', tags: [], word: '' })

	/* === return === */
	return <ProjectContext value={{ allTags, formState, listState, onFormState: setFormState, onListState: setListState }}>{children}</ProjectContext>
}
