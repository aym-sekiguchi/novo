import { Slot } from '@radix-ui/react-slot'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '@/utilities'

// Type
export type BreadcrumbProps = React.ComponentProps<'nav'> & { separator?: React.ReactNode }

/**
 * Breadcrumb
 *
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Breadcrumb(props: BreadcrumbProps): React.ReactNode {
	const { ref, ...rest } = props

	/* === return === */
	return <nav aria-label="breadcrumb" ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type BreadcrumbListProps = React.ComponentProps<'ol'>

/**
 * BreadcrumbList コンポーネント
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function BreadcrumbList(props: BreadcrumbListProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<ol className={cn('text-neutral-foreground flex flex-wrap items-center gap-1.5 text-xs break-words sm:gap-2.5', className)} ref={ref} {...rest} />
	)
}

/* -------------------------------- */

// Type
export type BreadcrumbItemProps = React.ComponentProps<'li'>

/**
 * BreadcrumbItem
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function BreadcrumbItem(props: BreadcrumbItemProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <li className={cn('inline-flex items-center gap-1.5', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type BreadcrumbLinkProps = React.ComponentProps<'a'> & { asChild?: boolean }

/**
 * BreadcrumbLink
 *
 * @param props.asChild - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function BreadcrumbLink(props: BreadcrumbLinkProps): React.ReactNode {
	const { asChild, className, ref, ...rest } = props
	const Comp = asChild ? Slot : 'a'

	/* === return === */
	return <Comp className={cn('hover:text-foreground transition-colors', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type BreadcrumbPageProps = React.ComponentProps<'span'>

/**
 * BreadcrumbPage
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function BreadcrumbPage(props: BreadcrumbPageProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <span aria-current="page" aria-disabled="true" className={cn('text-foreground font-normal', className)} ref={ref} role="link" {...rest} />
}

/* -------------------------------- */

// Type
export type BreadcrumbSeparatorProps = React.ComponentProps<'li'>

/**
 * BreadcrumbSeparator
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 *
 */
export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps): React.ReactNode {
	const { children, className, ref, ...rest } = props

	/* === return === */
	return (
		<li aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} ref={ref} role="presentation" {...rest}>
			{children ?? <ChevronRightIcon strokeWidth={1.5} />}
		</li>
	)
}

/* -------------------------------- */

// Type
export type BreadcrumbEllipsisProps = React.ComponentProps<'span'>

/**
 * BreadcrumbEllipsis
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<span aria-hidden="true" className={cn('flex size-9 items-center justify-center', className)} ref={ref} role="presentation" {...rest}>
			<MoreHorizontalIcon className="size-4" strokeWidth={1.5} />
			<span className="sr-only">More</span>
		</span>
	)
}
