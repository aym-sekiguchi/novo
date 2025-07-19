import { cn } from '@/utilities'

// Type
export type TableProps = React.ComponentProps<'table'>

/**
 * Table
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Table(props: TableProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<div className="relative w-full overflow-auto">
			<table className={cn('w-full caption-bottom text-sm', className)} ref={ref} {...rest} />
		</div>
	)
}

/* -------------------------------- */

// Type
export type TableHeaderProps = React.ComponentProps<'thead'>

/**
 * TableHeader
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableHeader(props: TableHeaderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <thead className={cn('border-line [&_tr]:border-b', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type TableBodyProps = React.ComponentProps<'tbody'>

/**
 * TableBody
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableBody(props: TableBodyProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <tbody className={cn('border-line [&_tr:last-child]:border-0', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type TableFooterProps = React.ComponentProps<'tbody'>

/**
 * TableFooter
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableFooter(props: TableFooterProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <tfoot className={cn('bg-neutral/50 border-line border-t font-medium [&>tr]:last:border-b-0', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type TableRowProps = React.ComponentProps<'tr'>

/**
 * TableRow
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableRow(props: TableRowProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<tr
			className={cn('border-line hover:bg-neutral/50 data-[state=selected]:bg-neutral border-b transition-colors', className)}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type TableHeadProps = React.ComponentProps<'th'>

/**
 * TableHead
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableHead(props: TableHeadProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<th
			className={cn('text-neutral-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0', className)}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type TableCellProps = React.ComponentProps<'td'>

/**
 * TableCell
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableCell(props: TableCellProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type TableCaptionProps = React.ComponentProps<'caption'>

/**
 * TableCaption
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function TableCaption(props: TableCaptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <caption className={cn('text-neutral-foreground mt-4 text-sm', className)} ref={ref} {...rest} />
}
