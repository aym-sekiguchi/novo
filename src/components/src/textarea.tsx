import { cn } from '@/utilities'

//Type
export type TextareaProps = React.ComponentProps<'textarea'>

/**
 * Textarea
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} Textarea
 */
export function Textarea(props: TextareaProps): React.ReactNode {
	const { className, ref, ...rest } = props
	return (
		<textarea
			className={cn(
				'border-line bg-field ring-offset-background flex w-full rounded-lg border px-3 py-2 text-base md:text-sm',
				'focus-visible:ring-primary/75 focus-visible:border-foreground focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'placeholder:text-neutral-foreground placeholder:text-sm',
				className,
			)}
			ref={ref}
			{...rest}
		/>
	)
}
