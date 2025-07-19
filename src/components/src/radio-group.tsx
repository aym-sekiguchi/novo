'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/utilities'

// Type
export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>

/**
 * RadioGroup コンポーネント
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function RadioGroup(props: RadioGroupProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...rest} ref={ref} />
}

/* -------------------------------- */

// Type
export type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

/**
 * RadioGroupItem
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 *
 */
export function RadioGroupItem(props: RadioGroupItemProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				'ring-offset-surface bg-field border-line size-5 shrink-0 overflow-hidden rounded-full border transition-colors',
				'data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
				'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...rest}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<motion.span animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }}>
					<CircleIcon className="fill-primary size-3 stroke-0" />
				</motion.span>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
}
