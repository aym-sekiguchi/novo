import { cn } from '@/utilities'

import type { PropertyBlockTableData, PropertyStyleData } from '@/types'
import type { HTMLAttributes } from 'react'

// type
type TableProps = {
	data: PropertyBlockTableData['table']
	tableStyle: PropertyStyleData['table']
} & HTMLAttributes<HTMLDListElement>

/**
 * テーブル
 *
 * @param props.items - テーブルの内容
 * @param props.outline - アウトライン
 * @param props.separator - 区切り線
 * @param props.variant - バリエーション
 * @param props.className - クラス名
 *
 */

export function Table(props: TableProps): React.ReactNode {
	/* === props === */
	const {
		className,
		data,
		tableStyle: { outline, separator, variant },
		...rest
	} = props

	/* === return === */
	return (
		<dl className={cn('@container flex flex-col divide-current border-current', outline && 'border', separator && 'divide-y', className)} {...rest}>
			{data.map((item, index) => (
				<div
					className={cn(
						'grid border-current @md:grid-cols-[1fr_3fr]',
						separator && '@max-md:divide-y @md:divide-x',
						variant === 'even' && 'even:bg-current/15',
						variant === 'odd' && 'odd:bg-current/15',
					)}
					key={`table-variant-${variant}-${index}`}
				>
					<dt className={cn('border-current p-2', variant === 'label' && 'bg-current/15')}>{item.label}</dt>
					<dd className={cn('border-current p-2', variant === 'value' && 'bg-current/15')}>{item.value}</dd>
				</div>
			))}
		</dl>
	)
}
