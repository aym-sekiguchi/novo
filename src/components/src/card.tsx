import { cn } from '@/utilities'

// Type
export type CardProps = React.ComponentProps<'div'>

/**
 * Card
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Card(props: CardProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<div
			className={cn(
				'bg-surface border-line rounded-xl border',
				'shadow-[0_0_4px_rgb(0_0_0/.025),0_4px_16px_rgb(0_0_0/.025)]',
				// 'dark:shadow-[0_0_4px_rgb(255_255_255/.025),0_4px_16px_rgb(255_255_255/.025)]',
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}

/* -------------------------------- */

// Type
export type CardHeaderProps = React.ComponentProps<'div'>

/**
 * CardHeader
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function CardHeader(props: CardHeaderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('my-4 flex flex-col space-y-1.5 px-4 md:my-6 md:px-6', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type CardTitleProps = React.ComponentProps<'div'>

/**
 * CardTitle
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function CardTitle(props: CardTitleProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('text-lg font-bold tracking-tight md:text-xl', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type CardDescriptionProps = React.ComponentProps<'div'>

/**
 * CardDescription
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function CardDescription(props: CardDescriptionProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('text-neutral-foreground text-xs md:text-sm', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type CardContentProps = React.ComponentProps<'div'>

/**
 * CardContent
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function CardContent(props: CardContentProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('my-4 px-4 md:my-6 md:px-6', className)} ref={ref} {...rest} />
}

/* -------------------------------- */

// Type
export type CardFooterProps = React.ComponentProps<'div'> & { isSeparator?: boolean }

/**
 * CardFooter
 *
 * @param props.className - クラス名
 * @param props.isSeparator - セパレーター
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function CardFooter(props: CardFooterProps): React.ReactNode {
	const { className, isSeparator, ref, ...rest } = props

	/* === return === */
	return (
		<div
			className={cn('my-4 flex items-center px-4 md:my-6 md:px-6', isSeparator ? 'border-line border-t' : '!pt-0', className)}
			ref={ref}
			{...rest}
		/>
	)
}
