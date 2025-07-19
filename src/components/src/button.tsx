import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/utilities'

import type { VariantProps } from 'class-variance-authority'

// variant
export const novoButton = {
	size: {
		default: 'h-10 rounded-lg px-4 py-2 text-base',
		icon: 'size-10 rounded-lg',
		lg: 'h-12 rounded-lg px-8 text-lg',
		sm: 'h-8 rounded-md px-3 text-sm',
	},
	variant: {
		default: 'bg-primary  text-primary-foreground hover:bg-primary/75 focus-visible:ring-primary/75 focus-visible:border-foreground',
		destructive:
			'bg-destructive border-line border text-destructive-foreground hover:brightness-80 focus-visible:ring-destructive/75 focus-visible:border-foreground',
		ghost:
			'bg-background text-foreground hover:bg-neutral hover:border-line border-transparent border focus-visible:ring-line focus-visible:border-foreground',
		link: 'text-link underline-offset-4 hover:underline focus-visible:ring-link/50 focus-visible:border-foreground',
		outline: 'bg-surface border-line border hover:brightness-90 focus-visible:ring-primary focus-visible:border-foreground',
		secondary: 'bg-surface border-line border text-foreground hover:brightness-90 focus-visible:ring-line focus-visible:border-foreground',
		success: 'bg-success border-line border text-success-foreground hover:brightness-80 focus-visible:ring-success focus-visible:border-foreground',
		warning: 'bg-warning border-line border text-warning-foreground hover:brightness-80 focus-visible:ring-warning focus-visible:border-foreground',
	},
} as const

export const buttonVariants = cva(
	cn(
		'ring-offset-surface inline-flex cursor-pointer items-center justify-center border-transparent whitespace-nowrap',
		'transition-[filter,background-color,color,border] duration-300',
		'focus-visible:border focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
		'disabled:pointer-events-none disabled:opacity-50',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	),
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: novoButton,
	},
)

// Type
export type ButtonProps = React.ComponentProps<'button'> & {
	asChild?: boolean
} & VariantProps<typeof buttonVariants>

/**
 * Button コンポーネント
 *
 * @param props.variant - バリエーション
 * @param props.size - サイズ
 * @param props.asChild - 子要素として使用する場合
 * @param props.className - クラス名
 * @param props.children - テキスト
 * @param props.ref - Ref
 * @param props.rest - 'button'その他のプロパティ
 *
 * @returns {React.ReactNode} -React コンポーネント
 *
 */
export function Button(props: ButtonProps): React.ReactNode {
	const { asChild, className, ref, size, variant, ...rest } = props
	const Comp = asChild ? Slot : 'button'

	/* === return === */
	return <Comp className={cn(buttonVariants({ size, variant }), className)} ref={ref} {...rest} />
}
