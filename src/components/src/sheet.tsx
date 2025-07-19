'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useContext } from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

import { Button } from '..'

import type { VariantProps } from 'class-variance-authority'

/**
 * Sheet のコンテキストを作成
 *
 */
const SheetContext = createContext<{ open: boolean }>({ open: false })

/* -------------------------------- */

// Type
export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>

/**
 * Sheet
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(初期値: false)
 * @param props.onOpenChange - 開閉時のコールバック
 * @param props.open - 外部から制御する場合の開閉状態
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Sheet(props: SheetProps): React.ReactNode {
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
		<SheetContext value={{ open }}>
			<SheetPrimitive.Root {...rest} onOpenChange={handleOpenChange} open={open} />
		</SheetContext>
	)
}

/* -------------------------------- */

// Type
export type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>

/**
 * SheetTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetTrigger(props: SheetTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <SheetPrimitive.Trigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>

/**
 * SheetPortal コンポーネント
 *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetPortal(props: SheetPortalProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return <SheetPrimitive.Portal {...rest} />
}

/* -------------------------------- */

// Type
export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>

/**
 * SheetClose
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetClose(props: SheetCloseProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <SheetPrimitive.Close ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>

/**
 * SheetOverlay
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 */
export function SheetOverlay(props: SheetOverlayProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<SheetPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80', className)} ref={ref} {...rest} asChild forceMount>
			<motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.4, ease: 'easeIn' }} />
		</SheetPrimitive.Overlay>
	)
}

/* -------------------------------- */

const sheetVariants = cva('bg-background fixed z-50 gap-4 p-4 shadow-lg md:p-6', {
	defaultVariants: {
		side: 'right',
	},
	variants: {
		side: {
			bottom: 'border-line inset-x-0 bottom-0 border-t',
			left: 'border-line inset-y-0 left-0 h-full w-4/5 border-r sm:max-w-sm',
			right: 'border-line inset-y-0 right-0 h-full w-4/5 border-l sm:max-w-sm',
			top: 'border-line inset-x-0 top-0 border-b',
		},
	},
})

// Type
export type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants> & { isCloseable?: boolean }

/**
 * SheetContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.isCloseable - 閉じるボタンを表示するかどうか(default:true)
 * @param props.ref - ref
 * @param props.side - 表示位置(default:'right')
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetContent(props: SheetContentProps): React.ReactNode {
	const { children, className, isCloseable = true, ref, side = 'right', ...rest } = props
	const { open } = useContext(SheetContext)

	// アニメーションの設定
	const variants = {
		bottom: { hide: { y: '100%' }, show: { y: '0%' } },
		left: { hide: { x: '-100%' }, show: { x: '0%' } },
		right: { hide: { x: '100%' }, show: { x: '0%' } },
		top: { hide: { y: '-100%' }, show: { y: '0%' } },
	}

	/* === return === */
	return (
		<SheetPortal forceMount>
			<AnimatePresence>
				{open && (
					<>
						<SheetOverlay />
						<SheetPrimitive.Content asChild className={cn(sheetVariants({ side }), className)} ref={ref} {...rest}>
							<motion.div
								animate={variants[side as 'right' | 'bottom' | 'left' | 'top'].show}
								exit={variants[side as 'right' | 'bottom' | 'left' | 'top'].hide}
								initial={variants[side as 'right' | 'bottom' | 'left' | 'top'].hide}
								transition={{ duration: 0.36, ease: 'easeInOut' }}
							>
								{/* コンテンツ */}
								<>{children}</>

								{/* 閉じるボタン */}
								{isCloseable && (
									<SheetPrimitive.Close asChild>
										<Button className="text-neutral-foreground absolute top-4 right-4 size-8" size="icon" variant="ghost">
											<XIcon className="size-5" />
											<span className="sr-only">Close</span>
										</Button>
									</SheetPrimitive.Close>
								)}
							</motion.div>
						</SheetPrimitive.Content>
					</>
				)}
			</AnimatePresence>
		</SheetPortal>
	)
}

/* -------------------------------- */

// Type
export type SheetHeaderProps = React.ComponentProps<'div'>

/**
 * SheetHeader
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetHeader(props: SheetHeaderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SheetFooterProps = React.ComponentProps<'div'>

/**
 * SheetFooter
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetFooter(props: SheetFooterProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>

/**
 * SheetTitle
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetTitle(props: SheetTitleProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <SheetPrimitive.Title className={cn('text-foreground text-lg font-semibold', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>

/**
 * SheetDescription
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function SheetDescription(props: SheetDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <SheetPrimitive.Description className={cn('text-neutral-foreground text-sm', className)} ref={ref} {...rest} />
}
