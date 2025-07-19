'use client'

import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'

import { cn } from '@/utilities'

import { Dialog, DialogContent } from '../'

export type CommandProps = React.ComponentProps<typeof CommandPrimitive>
/**
 * Command
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function Command(props: CommandProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<CommandPrimitive
			className={cn('bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md', className)}
			ref={ref}
			{...rest}
		></CommandPrimitive>
	)
}

export type CommandDialogProps = DialogProps
/**
 * CommandDialog
 *
 * @param props.children - 子要素
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandDialog(props: CommandDialogProps): React.ReactNode {
	const { children, ...rest } = props

	/* === return === */
	return (
		<Dialog {...rest}>
			<DialogContent className="overflow-hidden p-0 shadow-lg">
				<Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

export type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>
/**
 * CommandInput
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandInput(props: CommandInputProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<div className="border-line flex items-center border-b px-3" cmdk-input-wrapper="">
			<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				className={cn(
					'placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...rest}
			/>
		</div>
	)
}

export type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>
/**
 * CommandList
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandList(props: CommandListProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <CommandPrimitive.List className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto', className)} ref={ref} {...rest} />
}

export type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>
/**
 * CommandEmpty
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandEmpty(props: CommandEmptyProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <CommandPrimitive.Empty className="py-6 text-center text-sm" ref={ref} {...rest} />
}

export type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>
/**
 * CommandGroup
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandGroup(props: CommandGroupProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<CommandPrimitive.Group
			className={cn(
				'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}

export type CommandSeparatorProps = React.ComponentProps<typeof CommandPrimitive.Separator>
/**
 * CommandSeparator
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandSeparator(props: CommandSeparatorProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <CommandPrimitive.Separator className={cn('bg-border -mx-1 h-px', className)} ref={ref} {...rest} />
}

export type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>
/**
 * CommandItem
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandItem(props: CommandItemProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<CommandPrimitive.Item
			className={cn(
				"data-[selected='true']:bg-neutral data-[selected=true]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}

export type CommandShortcutProps = React.ComponentProps<'span'>
/**
 * CommandShortcut
 *
 * @param props.className - クラス名
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function CommandShortcut(props: CommandShortcutProps): React.ReactNode {
	const { className, ...rest } = props

	/* === return === */
	return <span className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...rest} />
}
