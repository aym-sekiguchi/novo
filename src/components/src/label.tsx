import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/utilities'

// Type
export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>

/**
 * Label
 *
 * @param props.className - クラス名
 * @param props.ref - リファレンス
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function Label(props: LabelProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return (
		<LabelPrimitive.Root
			className={cn('leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
			ref={ref}
			{...rest}
		/>
	)
}
