import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/utilities'

// Type
export type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>

/**
 * ScrollArea
 *
 * @param props.children - 子要素
 * @param props.className - クラス名
 * @param props.ref - Ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} ScrollArea
 *
 */
export function ScrollArea(props: ScrollAreaProps): React.ReactNode {
	const { children, className, ref, ...rest } = props
	return (
		<ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)} ref={ref} {...rest}>
			<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] *:h-full">{children}</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	)
}

//Type
export type ScrollBarProps = React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>

/**
 * ScrollBar
 *
 * @param props.className - クラス名
 * @param props.orientation - 方向
 * @param props.ref - Ref
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} ScrollBar
 *
 */
export function ScrollBar(props: ScrollBarProps): React.ReactNode {
	const { className, orientation = 'vertical', ref, ...rest } = props
	return (
		<ScrollAreaPrimitive.Scrollbar
			className={cn(
				'flex touch-none transition-colors select-none',
				orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
				orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
				className,
			)}
			orientation={orientation}
			ref={ref}
			{...rest}
		>
			<ScrollAreaPrimitive.Thumb className="bg-line relative flex-1 rounded-full" />
		</ScrollAreaPrimitive.Scrollbar>
	)
}
