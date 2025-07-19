'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/utilities'

// Type
export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

/**
 * Checkbox コンポーネント
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function Checkbox(props: CheckboxProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<CheckboxPrimitive.Root
			className={cn(
				'ring-offset-surface bg-field border-line size-5 shrink-0 cursor-pointer overflow-hidden rounded-xs border transition-colors',
				'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
				'focus-visible:ring-primary/75 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...rest}
		>
			<CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
				<motion.span animate={{ scale: 1 }} exit={{ scale: 0 }} initial={{ scale: 0 }}>
					<CheckIcon className="size-4" />
				</motion.span>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}
