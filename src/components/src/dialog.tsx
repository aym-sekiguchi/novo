'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useContext } from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

import { Button } from '..'

/**
 * Dialog のコンテキストを作成
 *
 */
const DialogContext = createContext<{ open: boolean }>({ open: false })

/* -------------------------------- */

// Type
export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>

/**
 * Dialog
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(default:false)
 * @param props.onOpenChange - 開閉時のコールバック
 * @param props.open - 外部から制御する場合の開閉状態
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Dialog(props: DialogProps): React.ReactNode {
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
		<DialogContext value={{ open }}>
			<DialogPrimitive.Root {...rest} onOpenChange={handleOpenChange} open={open} />
		</DialogContext>
	)
}

/* -------------------------------- */

// Type
export type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

/**
 * DialogTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogTrigger(props: DialogTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <DialogPrimitive.Trigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>

/**
 * DialogPortal
 *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogPortal(props: DialogPortalProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return <DialogPrimitive.Portal {...rest} />
}

/* -------------------------------- */

// Type
export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>

/**
 * DialogClose
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogClose(props: DialogCloseProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <DialogPrimitive.Close ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>

/**
 * DialogOverlay
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 */
export function DialogOverlay(props: DialogOverlayProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<DialogPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80', className)} ref={ref} {...rest} asChild forceMount>
			<motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }} />
		</DialogPrimitive.Overlay>
	)
}

/* -------------------------------- */

// Type
export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & { isCloseable?: boolean }

/**
 * DialogContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.isCloseable - 閉じるボタンを表示するかどうか
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 */
export function DialogContent(props: DialogContentProps): React.ReactNode {
	const { children, className, isCloseable = true, ref, ...rest } = props
	const { open } = useContext(DialogContext)

	/* === return === */
	return (
		<DialogPortal forceMount>
			<AnimatePresence>
				{open && (
					<>
						<DialogOverlay />
						<DialogPrimitive.Content
							asChild
							className={cn(
								'bg-surface border-line fixed z-50 grid w-full max-w-lg gap-4 border p-6 shadow-lg sm:rounded-lg',
								'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
								className,
							)}
							onEscapeKeyDown={(event) => document.getElementById('disable-layer') && event.preventDefault()}
							onInteractOutside={(event) => document.getElementById('disable-layer') && event.preventDefault()}
							ref={ref}
							{...rest}
						>
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								initial={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.2, ease: 'easeInOut' }}
							>
								{/* コンテンツ */}
								<>{children}</>

								{/* 閉じるボタン */}
								{isCloseable && (
									<DialogPrimitive.Close asChild>
										<Button className="absolute top-2 right-2 size-8" size="icon" variant="ghost">
											<XIcon className="size-5" />
											<span className="sr-only">Close</span>
										</Button>
									</DialogPrimitive.Close>
								)}
							</motion.div>
						</DialogPrimitive.Content>
					</>
				)}
			</AnimatePresence>
		</DialogPortal>
	)
}

/* -------------------------------- */

// Type
export type DialogHeaderProps = React.ComponentProps<'div'>

/**
 * DialogHeader
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogHeader(props: DialogHeaderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DialogFooterProps = React.ComponentProps<'div'>

/**
 * DialogFooter
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogFooter(props: DialogFooterProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

/**
 * DialogTitle
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogTitle(props: DialogTitleProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DialogPrimitive.Title className={cn('text-lg leading-none font-semibold tracking-tight', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

/**
 * DialogDescription
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DialogDescription(props: DialogDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DialogPrimitive.Description className={cn('text-neutral-foreground text-sm', className)} ref={ref} {...rest} />
}
