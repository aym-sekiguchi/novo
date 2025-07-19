'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/utilities'

// Type
export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>

/**
 * Select
 *
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function Select(props: SelectProps): React.ReactNode {
	const { ...rest } = props

	/* === return === */
	return <SelectPrimitive.Root {...rest} />
}

/* -------------------------------- */

// Type
export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>

/**
 * SelectGroup
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectGroup(props: SelectGroupProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <SelectPrimitive.Group ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>

/**
 * SelectValue
 *
 * @param props.placeholder - プレースホルダー
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectValue(props: SelectValueProps): React.ReactNode {
	const { placeholder, ref, ...rest } = props

	/* === return === */
	return <SelectPrimitive.Value placeholder={<span className="text-neutral-foreground">{placeholder}</span>} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>

/**
 * SelectTrigger
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectTrigger(props: SelectTriggerProps): React.ReactNode {
	const { children, className, ref, ...rest } = props

	/* === return === */
	return (
		<SelectPrimitive.Trigger
			className={cn(
				'bg-field border-line flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm',
				'focus-visible:ring-primary/75 focus-visible:border-foreground focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'placeholder:text-neutral-foreground',
				'[&>span]:line-clamp-1',
				className,
			)}
			ref={ref}
			{...rest}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-6 opacity-50" strokeWidth={1.5} />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

/* -------------------------------- */

// Type
export type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>

/**
 * SelectScrollUpButton
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectScrollUpButton(props: SelectScrollUpButtonProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn('bg-popover sticky top-0 flex w-full cursor-default items-center justify-center py-1', className)}
			ref={ref}
			{...rest}
		>
			<ChevronUpIcon className="size-4" strokeWidth={1.5} />
		</SelectPrimitive.ScrollUpButton>
	)
}

/* -------------------------------- */

// Type
export type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>

/**
 * SelectScrollDownButton
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectScrollDownButton(props: SelectScrollDownButtonProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn('bg-popover absolute bottom-0 flex w-full cursor-default items-center justify-center py-1', className)}
			ref={ref}
			{...rest}
		>
			<ChevronDownIcon className="size-4" strokeWidth={1.5} />
		</SelectPrimitive.ScrollDownButton>
	)
}

/* -------------------------------- */

// Type
export type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>

/**
 * SelectContent
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.position - ポジション
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectContent(props: SelectContentProps): React.ReactNode {
	const { children, className, position = 'popper', ref, ...rest } = props

	/* === return === */
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				asChild
				className={cn(
					'bg-popover border-line relative z-50 max-h-[40svh] min-w-32 overflow-hidden rounded-lg border shadow-md',
					'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom',
					position === 'popper' &&
						cn(
							'data-[side=bottom]:translate-y-1',
							'data-[side=left]:-translate-x-1',
							'data-[side=right]:translate-x-1',
							'data-[side=top]:-translate-y-1',
						),
					className,
				)}
				position={position}
				ref={ref}
				{...rest}
			>
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					initial={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.Viewport
						className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}
					>
						{children}
					</SelectPrimitive.Viewport>
					<SelectScrollDownButton />
				</motion.div>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

/* -------------------------------- */

// Type
export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>

/**
 * SelectLabel
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectLabel(props: SelectLabelProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <SelectPrimitive.Label className={cn('pt-4 pr-2 pb-1 pl-8 text-sm font-semibold', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>

/**
 * SelectItem
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function SelectItem(props: SelectItemProps): React.ReactNode {
	const { children, className, ref, ...rest } = props

	/* === return === */
	return (
		<SelectPrimitive.Item
			className={cn(
				'relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none',
				'focus:bg-neutral',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',

				className,
			)}
			ref={ref}
			{...rest}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" strokeWidth={1.5} />
				</SelectPrimitive.ItemIndicator>
			</span>

			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

/* -------------------------------- */

// Type
export type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>

/**
 * SelectSeparator
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 */
export function SelectSeparator(props: SelectSeparatorProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <SelectPrimitive.Separator className={cn('bg-neutral -mx-1 my-1 h-px', className)} ref={ref} {...rest} />
}
