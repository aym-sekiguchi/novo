import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/utilities'

//Type
type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

/**
 * Separator
 *
 * @param props.className - クラス名
 * @param props.decorative - 装飾線かどうか
 * @param props.orientation - 方向
 * @param props.ref - リファレンス
 * @param props.rest - その他のプロップス
 *
 * @returns {React.ReactNode} Separator
 *
 */
export function Separator(props: SeparatorProps): React.ReactNode {
	const { className, decorative = true, orientation = 'horizontal', ref, ...rest } = props
	return (
		<SeparatorPrimitive.Root
			className={cn('bg-line shrink-0', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
			decorative={decorative}
			orientation={orientation}
			ref={ref}
			{...rest}
		/>
	)
}
