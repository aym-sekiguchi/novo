import { cva } from 'class-variance-authority'

import { cn } from '@/utilities'

import type { VariantProps } from 'class-variance-authority'

export const novoBadge = {
	default: 'bg-primary text-background',
	destructive: 'bg-destructive text-destructive-foreground',
	outline: 'bg-surface text-foreground border-line border',
	secondary: 'bg-neutral text-foreground border-line border',
	success: 'bg-success text-success-foreground',
	warning: 'bg-warning text-warning-foreground',
} as const

// variant
export const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
	defaultVariants: { variant: 'default' },
	variants: {
		variant: novoBadge,
	},
})

// Type
export type BadgeProps = React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>

/**
 * Badge コンポーネント
 *
 * @param props.variant - バリエーション
 * @param props.className - クラス名
 * @param props.children - テキスト
 * @param props.ref - Ref
 * @param props.rest - 'div'その他のプロパティ
 *
 * @returns {React.ReactNode}
 *
 */

export function Badge(props: BadgeProps): React.ReactNode {
	const { className, ref, variant, ...rest } = props

	/* === return === */
	return <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...rest} />
}
