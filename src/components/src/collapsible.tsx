'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

// Type
export type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>

/**
 * Collapsible のコンテキストを作成
 *
 */
const CollapsibleContext = React.createContext<{ defaultOpen: boolean; open: boolean }>({ defaultOpen: false, open: false })

/* -------------------------------- */

/**
 * Collapsible
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(default:false)
 * @param props.onOpenChange - 開閉時のコールバック
 * @param props.open - 外部から開閉状態を制御する場合のフラグ
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function Collapsible(props: CollapsibleProps): React.ReactNode {
	const { defaultOpen = false, onOpenChange, open: controlledOpen, ref, ...rest } = props
	const [internalOpen, toggle] = useToggle(defaultOpen)

	// `open` が外部から制御されている場合はそれを使用
	const isControlled = controlledOpen !== undefined
	const open = isControlled ? controlledOpen : internalOpen

	// 状態変更時に外部のコールバックを呼び出す
	const handleOpenChange = (nextOpen: boolean): void => {
		// 制御されていない場合は内部の状態を更新
		if (!isControlled) toggle(nextOpen)

		// 外部のコールバックを呼び出す
		onOpenChange?.(nextOpen)
	}

	/* === return === */
	return (
		<CollapsibleContext value={{ defaultOpen, open }}>
			<CollapsiblePrimitive.Root onOpenChange={handleOpenChange} open={open} ref={ref} {...rest} />
		</CollapsibleContext>
	)
}

/* -------------------------------- */

// Type
export type CollapsibleTriggerProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>

/**
 * CollapsibleTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function CollapsibleTrigger(props: CollapsibleTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <CollapsiblePrimitive.CollapsibleTrigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>

/**
 * CollapsibleContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function CollapsibleContent(props: CollapsibleContentProps): React.ReactNode {
	const { children, className, ref, ...rest } = props
	const { defaultOpen, open } = React.useContext(CollapsibleContext)

	/* === return === */
	return (
		<AnimatePresence>
			{open && (
				<CollapsiblePrimitive.CollapsibleContent asChild className="grid overflow-hidden" forceMount ref={ref} {...rest}>
					<motion.div
						animate="open"
						exit="closed"
						initial={defaultOpen ? 'open' : 'closed'}
						transition={{ duration: 0.2 }}
						variants={{ closed: { gridTemplateRows: '0fr' }, open: { gridTemplateRows: '1fr' } }}
					>
						<div className={cn('min-h-0', className)} style={{ overflowWrap: 'anywhere', visibility: open ? 'visible' : 'hidden' }}>
							{children}
						</div>
					</motion.div>
				</CollapsiblePrimitive.CollapsibleContent>
			)}
		</AnimatePresence>
	)
}
