'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities'

/**
 * Tabs のコンテキストを作成
 *
 */
const TabsContext = createContext<{ orientation?: 'horizontal' | 'vertical'; value?: string | undefined }>({
	orientation: 'horizontal',
	value: undefined,
})

/* -------------------------------- */

// Type
export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

/**
 * Tabs
 *
 * @param props.defaultValue - デフォルトのタブ
 * @param props.onValueChange - タブ変更時のコールバック
 * @param props.orientation - タブの方向(default:'horizontal')
 * @param props.value - 外部から制御する場合のタブ
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function Tabs(props: TabsProps): React.ReactNode {
	const { defaultValue, onValueChange, orientation = 'horizontal', value: controlledValue, ...rest } = props
	const [internalValue, setValue] = useState(defaultValue)

	// `value` が外部から制御されている場合はそれを使用
	const isControlled = controlledValue !== undefined
	const value = isControlled ? controlledValue : internalValue

	// 状態変更時に外部のコールバックを呼び出す
	const handleValueChange = (nextValue: string): void => {
		// 制御されていない場合は内部の状態を更新
		if (!isControlled) setValue(nextValue)

		// 外部のコールバックを呼び出す
		onValueChange?.(nextValue)
	}

	/* === return === */
	return (
		<TabsContext value={{ orientation, value }}>
			<TabsPrimitive.Root {...rest} onValueChange={handleValueChange} value={value} />
		</TabsContext>
	)
}
/* -------------------------------- */

// Type
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

/**
 * TabsList
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function TabsList(props: TabsListProps): React.ReactNode {
	const { children, className, ref, ...rest } = props
	const { orientation, value } = useContext(TabsContext)
	const [data, setData] = useState({ left: 0, top: 0, width: 0 })
	const divRef = useRef<HTMLDivElement>(null)

	/* === hooks === */
	useEffect(() => {
		if (!divRef.current) return

		const tablist = divRef.current.querySelector('[role="tablist"]')
		const target = tablist?.querySelector(`[data-state="active"]`)

		const tablistRect = tablist?.getBoundingClientRect()
		const targetRect = target?.getBoundingClientRect()

		setData((prod) => ({
			...prod,
			left: (targetRect?.left ?? 0) - (tablistRect?.left ?? 0),
			top: (targetRect?.top ?? 0) - (tablistRect?.top ?? 0),
			width: targetRect?.width ?? 0,
		}))
	}, [value])

	/* === return === */
	return (
		<div className="bg-neutral text-neutral-foreground rounded-md p-1" ref={divRef}>
			<TabsPrimitive.List
				className={cn(
					'relative items-center justify-center',
					orientation === 'horizontal' && 'inline-flex h-8',
					orientation === 'vertical' && 'flex flex-col *:w-full',
					className,
				)}
				ref={ref}
				{...rest}
			>
				{children}

				{/* 横 */}
				{orientation === 'horizontal' && data.width > 0 && (
					<motion.div
						animate={{ left: data.left, width: data.width }}
						className="bg-surface pointer-events-none absolute top-0 left-0 z-0 h-8 rounded shadow-sm"
						initial={{ left: 0, width: data.width }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					/>
				)}

				{/* 縦 */}
				{orientation === 'vertical' && data.width > 0 && (
					<motion.div
						animate={{ top: data.top }}
						className="bg-surface pointer-events-none absolute top-0 left-0 z-0 h-8 w-full rounded shadow-sm"
						initial={{ top: 0 }}
						transition={{ duration: 0.15, ease: 'easeInOut' }}
					/>
				)}
			</TabsPrimitive.List>
		</div>
	)
}

/* -------------------------------- */

// Type
export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>

/**
 * TabsTrigger
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function TabsTrigger(props: TabsTriggerProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<TabsPrimitive.Trigger
			className={cn(
				'relative z-10 inline-flex cursor-pointer items-center justify-center rounded-sm px-3 py-1.5',
				'text-neutral-foreground text-sm font-medium whitespace-nowrap',
				'hover:text-foreground transition',
				'data-[state=active]:text-foreground',
				'focus-visible:ring-primary/25 focus-visible:ring-2 focus-visible:outline-none',
				'disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

/**
 * TabsContent
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.value - タブの値
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function TabsContent(props: TabsContentProps): React.ReactNode {
	const { className, ref, value, ...rest } = props

	return (
		<TabsPrimitive.Content
			className={cn(
				'ring-offset-background mt-4',
				'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				className,
			)}
			ref={ref}
			value={value}
			{...rest}
		/>
	)
}
