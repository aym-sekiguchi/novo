import { cn } from '@/utilities'

// Type
type SkeletonProps = {
	className?: string
} & React.ComponentProps<'div'>

/**
 * Skeleton コンポーネント
 *
 * @param props.className - クラス名
 * @param props.rest - 'div'その他のプロパティ
 *
 * @returns {React.ReactNode}
 */

export function Skeleton(props: SkeletonProps): React.ReactNode {
	const { className, ref, ...rest } = props

	/* === return === */
	return <div className={cn('bg-neutral animate-pulse rounded-md', className)} ref={ref} {...rest} />
}
