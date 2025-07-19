import { cn } from '@/utilities'

/**
 * Board
 *
 * @param props.className - クラス名
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - React コンポーネント
 */
export function Board(props: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
	const { className, ...rest } = props

	/* === return === */
	return <div className={cn('bg-background border-line rounded-xl border', className)} {...rest} />
}
