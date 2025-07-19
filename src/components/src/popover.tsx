'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

/**
 * Popover のコンテキストを作成
 *
 */
const PopoverContext = React.createContext<{ open: boolean }>({ open: false })

/* -------------------------------- */

// Type
// export type PopoverProps = Omit<React.ComponentProps<typeof PopoverPrimitive.Root>, 'open' | 'onOpenChange'>
export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>

/**
 * Popover
 *
 * @param props.defaultOpen - ポップオーバーの初期状態(default:false)
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function Popover(props: PopoverProps): React.ReactNode {
	const { defaultOpen = false, onOpenChange, open: controlledOpen, ...rest } = props
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
		<PopoverContext value={{ open }}>
			<PopoverPrimitive.Root {...rest} onOpenChange={handleOpenChange} open={open} />
		</PopoverContext>
	)
}

/* -------------------------------- */

// Type
export type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>

/**
 * PopoverTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function PopoverTrigger(props: PopoverTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <PopoverPrimitive.Trigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content>

/**
 * PopoverContent
 *
 * @param align - アラインメント(default:'center')
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - リファレンス
 * @param sideOffset - サイドオフセット(default:4)
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function PopoverContent(props: PopoverContentProps): React.ReactNode {
	const { align = 'center', children, className, ref, sideOffset = 4, ...rest } = props
	const { open } = React.use(PopoverContext)

	/* === return === */
	return (
		<PopoverPrimitive.Portal forceMount>
			<AnimatePresence>
				{open && (
					<PopoverPrimitive.Content
						align={align}
						asChild
						className={cn(
							'bg-popover text-popover-foreground border-line z-50 w-72 rounded-md border p-4 shadow-md outline-none',
							'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom',
							className,
						)}
						ref={ref}
						sideOffset={sideOffset}
						{...rest}
					>
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							initial={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							{children}
						</motion.div>
					</PopoverPrimitive.Content>
				)}
			</AnimatePresence>
		</PopoverPrimitive.Portal>
	)
}
