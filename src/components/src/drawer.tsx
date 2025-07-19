'use client'

import { type ComponentProps } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

/* -------------------------------- */

// Type
export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>
/**
 * Drawer
 *
 * @param props.defaultOpen - 初期状態
 * @param props.onOpenChange - 状態変更時のコールバック
 * @param props.open - 制御用の状態
 * @param props.shouldScaleBackground - 背景を拡大するかどうか
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function Drawer(props: DrawerProps): React.ReactNode {
	const { defaultOpen = false, onOpenChange, open: controlledOpen, shouldScaleBackground, ...rest } = props
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
	return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} onOpenChange={handleOpenChange} open={open} />
}

export const DrawerTrigger = DrawerPrimitive.Trigger

export const DrawerPortal = DrawerPrimitive.Portal

export const DrawerClose = DrawerPrimitive.Close

// Type
export type DrawerOverlayProps = React.ComponentProps<typeof DrawerPrimitive.Overlay>
/**
 * DrawerOverlay
 *
 * @param className - クラス名
 * @param props.ref - ref *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerOverlay(props: DrawerOverlayProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DrawerPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80', className)} ref={ref} {...rest} />
}

// Type
export type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content>
/**
 * DrawerContent
 *
 * @param props.children - 子要素
 * @param className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerContent(props: DrawerContentProps): React.ReactNode {
	const { children, className, ref, ...rest } = props

	/* === return === */
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				className={cn('bg-surface fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border', className)}
				ref={ref}
				{...rest}
			>
				<div className="bg-neutral mx-auto mt-4 h-2 w-[100px] rounded-full" />
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	)
}

// Type
export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>
/**
 * DrawerHeader
 *
 * @param props.className - クラス名
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerHeader(props: DrawerHeaderProps): React.ReactNode {
	const { className, ...rest } = props

	/* === return === */
	return <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...rest} />
}

// Type
export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>
/**
 * DrawerFooter
 *
 * @param props.className - クラス名
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerFooter(props: DrawerFooterProps): React.ReactNode {
	const { className, ...rest } = props

	/* === return === */
	return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...rest} />
}

type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>
/**
 * DrawerTitle
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerTitle(props: DrawerTitleProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DrawerPrimitive.Title className={cn('text-lg leading-none font-semibold tracking-tight', className)} ref={ref} {...rest} />
}

// Type
export type DrawerDescriptionProps = ComponentProps<typeof DrawerPrimitive.Description>
/**
 * DrawerDescription
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function DrawerDescription(props: DrawerDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DrawerPrimitive.Description className={cn('text-muted-foreground text-sm', className)} ref={ref} {...rest} />
}
