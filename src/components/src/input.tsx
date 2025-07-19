import { cn } from '@/utilities'

import type * as React from 'react'

//Type
export type InputProps = React.ComponentProps<'input'>

/**
 * Input
 *
 * @param props.className - クラス名
 * @param props.type - 入力タイプ
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} Input
 */
export function Input(props: InputProps): React.ReactNode {
	const { className, ref, type = 'text', ...rest } = props
	return (
		<input
			className={cn(
				'border-line bg-field ring-offset-background mb-1 flex w-full rounded-lg border px-3 py-2 text-base md:text-sm',
				'focus-visible:ring-primary/75 focus-visible:border-foreground focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'file:text-foreground file:bg-field file:border-line file:mr-2 file:rounded-lg file:border file:px-3 file:py-2 file:text-sm',
				'placeholder:text-neutral-foreground placeholder:text-sm',
				type === 'file' && 'rounded-none border-0 bg-transparent p-0',
				className,
			)}
			ref={ref}
			type={type}
			{...rest}
		/>
	)
}
