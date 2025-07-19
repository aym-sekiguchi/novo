'use client'

import { createContext, use, useState } from 'react'

import { Sortable } from '@/components'
import { useToggle } from '@/hooks'

import { CreatePropertyBlockButton } from './create-property-block-button'
import { propertyBlockSortAction } from './property-block-action'
import { PropertyBlockCard } from './property-block-card'
import { PropertyBlockController } from './property-block-controller'

import type { PropertyBlockData, PropertyData } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

// Type
type PropertyBlocksProviderProps = {
	formState: boolean
	id: string
	initialValue: PropertyBlockData
	onFormState: Dispatch<SetStateAction<boolean>>
	onInitialValue: Dispatch<SetStateAction<PropertyBlockData>>
}

const EditPropertyContext = createContext<PropertyBlocksProviderProps>({
	formState: false,
	id: '',
	initialValue: { id: '', isPublic: false, order: 0, type: 'table' },
	onFormState: () => {},
	onInitialValue: () => {},
})

export const useEditProperty = (): PropertyBlocksProviderProps => use(EditPropertyContext)

/**
 * 物件概要プロバイダー
 *
 * @param props.children - 子要素
 * @param props.id - ユーザー名
 *
 * @returns ReactNode
 */

export function PropertyBlocks(props: { id: string; property: PropertyData }): React.ReactNode {
	/* === props === */
	const { id, property } = props

	/* === hooks === */
	const [open, toggle] = useToggle(false)
	const [initialValue, setInitialValue] = useState<PropertyBlockData>({ id: '', isPublic: false, order: 0, type: 'table' })

	/* === events === */
	const handleSort = async (data: { id: string; order: number }[]): Promise<void> => {
		await propertyBlockSortAction({ data, id })
	}

	/* === return === */
	return (
		<EditPropertyContext.Provider
			value={{
				formState: open,
				id,
				initialValue,
				onFormState: toggle,
				onInitialValue: setInitialValue,
			}}
		>
			{/* TODO 複製 */}
			{/* 新規作成ボタン */}
			<CreatePropertyBlockButton />

			{/* 一覧 */}
			<div className="flex max-w-433 flex-1 flex-col gap-1">
				<Sortable data={property.blocks} onSorted={handleSort}>
					{property.blocks.map((block) => (
						<div className="bg-surface flex w-full" id={block.id} key={block.id}>
							<PropertyBlockCard block={block} blockCount={property.blocks.length} />
							<PropertyBlockController block={block} />
						</div>
					))}
				</Sortable>
			</div>

			{/* TODO 簡易プレビュー？ */}
		</EditPropertyContext.Provider>
	)
}
