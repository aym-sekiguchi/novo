'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useContext } from 'react'

import { useToggle } from '@/hooks'
import { cn } from '@/utilities'

/**
 * DropdownMenu のコンテキストを作成
 *
 */
const DropdownMenuContext = createContext<{ open: boolean }>({ open: false })

/**
 * DropdownMenuSub のコンテキストを作成
 *
 */
const DropdownMenuSubContext = createContext<{ open: boolean }>({ open: false })

/* -------------------------------- */

// Type
export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>

/**
 * DropdownMenu
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(default:false)
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenu(props: DropdownMenuProps): React.ReactNode {
	const { defaultOpen = false, ...rest } = props
	const [open, toggle] = useToggle(defaultOpen)

	/* === return === */
	return (
		<DropdownMenuContext value={{ open }}>
			<DropdownMenuPrimitive.Root {...rest} onOpenChange={toggle} open={open} />
		</DropdownMenuContext>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>

/**
 * DropdownMenuTrigger
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuTrigger(props: DropdownMenuTriggerProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.Trigger ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.Group>

/**
 * DropdownMenuGroup
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuGroup(props: DropdownMenuGroupProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.Group ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuPortalProps = React.ComponentProps<typeof DropdownMenuPrimitive.Portal>

/**
 * DropdownMenuPortal
 *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuPortal(props: DropdownMenuPortalProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.Portal {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>

/**
 * DropdownMenuSub
 *
 * @param props.defaultOpen - デフォルトで開いているかどうか(default:false)
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuSub(props: DropdownMenuSubProps): React.ReactNode {
	const { defaultOpen = false, ...rest } = props
	const [open, toggle] = useToggle(defaultOpen)

	/* === return === */
	return (
		<DropdownMenuSubContext value={{ open }}>
			<DropdownMenuPrimitive.Sub {...rest} onOpenChange={toggle} open={open} />
		</DropdownMenuSubContext>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>

/**
 * DropdownMenuRadioGroup
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.RadioGroup ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuSubTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }

/**
 * DropdownMenuSubTrigger
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.inset - インデントの有無
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps): React.ReactNode {
	const { children, className, inset, ref, ...rest } = props

	/* === return === */
	return (
		<DropdownMenuPrimitive.SubTrigger
			className={cn(
				'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
				'focus:bg-neutral data-[state=open]:bg-neutral',
				'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
				inset && 'pl-8',
				className,
			)}
			ref={ref}
			{...rest}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>

/**
 * DropdownMenuSubContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuSubContent(props: DropdownMenuSubContentProps): React.ReactNode {
	const { children, className, ref, ...rest } = props
	const { open } = useContext(DropdownMenuSubContext)

	/* === return === */
	return (
		<DropdownMenuPrimitive.Portal forceMount>
			<AnimatePresence>
				{open && (
					<DropdownMenuPrimitive.SubContent
						asChild
						className={cn(
							'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-top-left data-[side=top]:origin-bottom',
							'bg-popover border-line z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
							className,
						)}
						forceMount
						ref={ref}
						{...rest}
					>
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							initial={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.18, ease: 'easeInOut' }}
						>
							{children}
						</motion.div>
					</DropdownMenuPrimitive.SubContent>
				)}
			</AnimatePresence>
		</DropdownMenuPrimitive.Portal>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>

/**
 * DropdownMenuContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.sideOffset - サイドオフセット
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuContent(props: DropdownMenuContentProps): React.ReactNode {
	const { children, className, ref, sideOffset = 4, ...rest } = props
	const { open } = useContext(DropdownMenuContext)

	/* === return === */
	return (
		<DropdownMenuPrimitive.Portal forceMount>
			<AnimatePresence>
				{open && (
					<DropdownMenuPrimitive.Content
						className={cn(
							'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom',
							'bg-popover border-line z-50 min-w-32 overflow-hidden rounded-lg border p-1 shadow-md',
							className,
						)}
						forceMount
						ref={ref}
						sideOffset={sideOffset}
						{...rest}
						asChild
					>
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							initial={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							{children}
						</motion.div>
					</DropdownMenuPrimitive.Content>
				)}
			</AnimatePresence>
		</DropdownMenuPrimitive.Portal>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }

/**
 * DropdownMenuItem
 *
 * @param props.className - クラス名
 * @param props.inset - インデントの有無
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuItem(props: DropdownMenuItemProps): React.ReactNode {
	const { className, inset, ref, ...rest } = props

	/* === return === */
	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
				'focus:bg-neutral',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
				inset && 'pl-8',
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>

/**
 * DropdownMenuCheckboxItem
 *
 * @param props.checked - チェックされているかどうか
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps): React.ReactNode {
	const { checked, children, className, ref, ...rest } = props

	/* === return === */
	return (
		<DropdownMenuPrimitive.CheckboxItem
			checked={checked as boolean}
			className={cn(
				'relative flex cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none',
				'focus:bg-neutral',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			ref={ref}
			{...rest}
		>
			<span className="absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & { isIndicator?: boolean }

/**
 * DropdownMenuRadioItem
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.isIndicator - インジケーターかどうか
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps): React.ReactNode {
	const { children, className, isIndicator, ref, ...rest } = props

	/* === return === */
	return (
		<DropdownMenuPrimitive.RadioItem
			className={cn(
				'relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none',
				'focus:bg-neutral',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				isIndicator ? 'pl-8' : 'data-[state="checked"]:bg-primary/20',
				className,
			)}
			ref={ref}
			{...rest}
		>
			{isIndicator && (
				<span className="absolute left-2 flex size-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<CircleIcon className="size-2 fill-current" />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
			{children}
		</DropdownMenuPrimitive.RadioItem>
	)
}

/* -------------------------------- */

// Type
export type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }

/**
 * DropdownMenuLabel
 *
 * @param props.className - クラス名
 * @param props.inset - インデントの有無
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuLabel(props: DropdownMenuLabelProps): React.ReactNode {
	const { className, inset, ref, ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.Label className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>

/**
 * DropdownMenuSeparator
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuSeparator(props: DropdownMenuSeparatorProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <DropdownMenuPrimitive.Separator className={cn('bg-line -mx-1 my-1 h-px', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type DropdownMenuShortcutProps = React.ComponentProps<'span'>

/**
 * DropdownMenuShortcut
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function DropdownMenuShortcut(props: DropdownMenuShortcutProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} ref={ref} {...rest} />
}
