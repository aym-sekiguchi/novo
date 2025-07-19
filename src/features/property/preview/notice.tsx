import { Separator } from '@/components'
import { cn } from '@/utilities'

import type { PropertyStyleData } from '@/types'
import type { HTMLAttributes } from 'react'

type NoticeProps = {
	children: React.ReactNode
} & HTMLAttributes<HTMLDivElement> &
	Omit<PropertyStyleData['notice'], 'color' | 'fontSize'>

/**
 * 予告
 *
 * @param props.children - 内容
 * @param props.color - 文字色
 * @param props.fontSize - 文字サイズ
 * @param props.variant - バリエーション
 */

export function Notice(props: NoticeProps): React.ReactNode {
	/* === props === */
	const { children, className, variant, ...rest } = props

	/* === return === */
	return (
		<div
			className={cn(
				'border-line flex items-start gap-x-3 gap-y-2 p-4 max-md:flex-col',
				variant === 'fill' && 'bg-current/15',
				variant !== 'flex' && 'flex-col',
				variant === 'outline' && 'border',
				className,
			)}
			{...rest}
		>
			<p className={cn('w-fit shrink-0 text-[1.2em] text-current', variant === 'flex' && 'border px-2 py-3')}>予告広告</p>
			{variant === 'separator' && <Separator className="bg-current" />}
			<p className="leading-relaxed whitespace-pre-wrap">{children}</p>
		</div>
	)
}
