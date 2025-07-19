'use client'

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { Children, isValidElement, useEffect, useState } from 'react'

import { cn } from '@/utilities'

import { Button } from './button'

import type { DragEndEvent } from '@dnd-kit/core'

/**
 * ソート可能
 *
 * @param props.children - 子要素
 * @param props.data - データ
 * @param props.onSorted - ソート後のデータ
 *
 * @returns ReactNode
 */
export function Sortable<T>(props: {
	children: React.ReactNode
	data: Array<T & { id: string }>
	onSorted: (data: Array<T & { id: string }>) => void
}): React.ReactNode {
	/* === props === */
	const { children, data, onSorted } = props

	/* === hooks === */
	const [items, setItems] = useState(data)
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	useEffect(() => {
		setItems(data)
	}, [data])

	/* === events === */
	function handleDragEnd(event: DragEndEvent): void {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = items.findIndex((item) => item.id === active.id)
		const newIndex = items.findIndex((item) => item.id === over.id)
		const newItems = arrayMove(items, oldIndex, newIndex)

		setItems(newItems) // 画面上の表示を更新
		onSorted(newItems) // ソート後のデータを返す
	}

	/* === return === */
	return (
		<DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item) => (
					<SortableItem id={item.id} key={item.id}>
						{Children.toArray(children).find((child) => isValidElement(child) && (child.props as HTMLElement).id === item.id)}
					</SortableItem>
				))}
			</SortableContext>
		</DndContext>
	)
}

/**
 * ソート可能アイテム
 *
 */
function SortableItem(props: { children?: React.ReactNode; id: string | number }): React.ReactNode {
	/* === props === */
	const { children, id } = props

	/* === hooks === */
	const { active, node, setNodeRef, transform, transition } = useSortable({ id })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	useEffect(() => {
		const element = node.current?.querySelector('[data-handler]')

		if (!element) throw new Error('ハンドラーがありません。')
	}, [node])

	/* === return === */
	return (
		<div className={cn(active?.id === id && 'z-10')} ref={setNodeRef} style={style}>
			{children}
		</div>
	)
}

/**
 * ハンドラー
 *
 */
export function Handler(props: { className?: string; id: string }): React.ReactNode {
	/* === props === */
	const { className, id } = props

	/* === hooks === */
	const { attributes, listeners, setActivatorNodeRef } = useSortable({ id })

	/* === return === */
	return (
		<Button
			className={cn('size-auto cursor-grab bg-transparent', className)}
			data-handler
			ref={setActivatorNodeRef}
			size="icon"
			suppressHydrationWarning
			type="button"
			{...attributes}
			{...listeners}
		>
			<GripVertical className="text-neutral-foreground" strokeWidth={1.5} />
		</Button>
	)
}
