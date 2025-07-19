'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/utilities'

// Type
export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>

/**
 * スライダー
 *
 * @param props.className - クラス名
 * @param props.ref - ref
 * @param props.rest - その他のプロパティ
 *
 */

export function Slider(props: SliderProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<SliderPrimitive.Root className={cn('relative flex w-full touch-none items-center select-none', className)} ref={ref} {...rest}>
			<SliderPrimitive.Track className="bg-field relative h-2 w-full grow overflow-hidden rounded-full">
				<SliderPrimitive.Range className="bg-primary absolute h-full" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
		</SliderPrimitive.Root>
	)
}
