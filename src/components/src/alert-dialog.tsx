'use client'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useContext } from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

import { buttonVariants } from '..'

import type { VariantProps } from 'class-variance-authority'

/**
 * AlertDialog のコンテキストを作成
 *
 */
const AlertDialogContext = createContext<{ open: boolean }>({ open: false })

/* -------------------------------- */

// Type
export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>

/**
 * AlertDialog
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(default:false)
 * @param props.onOpenChange - 開閉時のコールバック
 * @param props.open - 外部から制御する場合の開閉状態
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialog(props: AlertDialogProps): React.ReactNode {
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
		<AlertDialogContext value={{ open }}>
			<AlertDialogPrimitive.Root {...rest} onOpenChange={handleOpenChange} open={open} />
		</AlertDialogContext>
	)
}

/* -------------------------------- */

// Type
export type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>

/**
 * AlertDialogTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogTrigger(props: AlertDialogTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Trigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>

/**
 * AlertDialogPortal
 *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogPortal(props: AlertDialogPortalProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Portal {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay>

/**
 * AlertDialogOverlay
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogOverlay(props: AlertDialogOverlayProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<AlertDialogPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80', className)} ref={ref} {...rest} asChild forceMount>
			<motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }} />
		</AlertDialogPrimitive.Overlay>
	)
}

/* -------------------------------- */

// Type
export type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content>

/**
 * AlertDialogContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogContent(props: AlertDialogContentProps): React.ReactNode {
	const { children, className, ref, ...rest } = props
	const { open } = useContext(AlertDialogContext)

	/* === return === */
	return (
		<AlertDialogPortal forceMount>
			<AnimatePresence>
				{open && (
					<>
						<AlertDialogOverlay />
						{/* TODO aschildをいれるとエラーになる */}
						<AlertDialogPrimitive.Content
							asChild
							className={cn(
								'bg-surface fixed z-50 grid w-full max-w-lg gap-4 border p-6 shadow-lg sm:rounded-lg',
								'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
								className,
							)}
							onEscapeKeyDown={(event) => document.getElementById('disable-layer') && event.preventDefault()}
							ref={ref}
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
						</AlertDialogPrimitive.Content>
					</>
				)}
			</AnimatePresence>
		</AlertDialogPortal>
	)
}

/* -------------------------------- */

// Type
export type AlertDialogHeaderProps = React.ComponentProps<'div'>

/**
 * AlertDialogHeader
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogHeader(props: AlertDialogHeaderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogFooterProps = React.ComponentProps<'div'>

/**
 * AlertDialogFooter
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogFooter(props: AlertDialogFooterProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>

/**
 * AlertDialogTitle
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogTitle(props: AlertDialogTitleProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>

/**
 * AlertDialogDescription
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogDescription(props: AlertDialogDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Description className={cn('text-neutral-foreground text-sm', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action> & { buttonProps?: VariantProps<typeof buttonVariants> }

/**
 * AlertDialogAction
 *
 * @param props.buttonProps - ボタンのプロパティ
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogAction(props: AlertDialogActionProps): React.ReactNode {
	const { buttonProps, className, ref, ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Action className={cn(buttonVariants(buttonProps), className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & { buttonProps?: VariantProps<typeof buttonVariants> }

/**
 * AlertDialogCancel
 *
 * @param props.buttonProps - ボタンのプロパティ
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function AlertDialogCancel(props: AlertDialogCancelProps): React.ReactNode {
	const { buttonProps = { variant: 'outline' }, className, ref, ...rest } = props

	/* === return === */
	return <AlertDialogPrimitive.Cancel className={cn(buttonVariants(buttonProps), 'mt-2 sm:mt-0', className)} ref={ref} {...rest} />
}
