import { CalendarIcon } from 'lucide-react'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components'

import type { CalendarProps } from '@/components'

// Type
export type DatePickerProps = { disabled?: boolean; onChange: (value: number) => void; value: number } & Omit<CalendarProps, 'onChange' | 'selected'>

/**
 * DatePickerProps
 *
 * @param props.disabled - ボタンの無効化(default:false)
 * @param props.onChange - 選択した日付を返す関数
 * @param props.value - 選択した日付
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} - Reactコンポーネント
 *
 */
export function DatePicker(props: DatePickerProps): React.ReactNode {
	const { disabled, onChange, value, ...rest } = props
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button aria-disabled={disabled} className="w-full justify-between md:text-sm" disabled={disabled} variant="outline">
					{value ? (
						new Date(value).toLocaleDateString('ja-JP', { day: 'numeric', month: 'short', weekday: 'short', year: 'numeric' })
					) : (
						<span className="text-neutral-foreground">日付を選択してください</span>
					)}
					<CalendarIcon className="text-neutral-foreground -mr-1 ml-2 size-4" strokeWidth={1.5} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit p-0">
				<Calendar
					{...rest}
					mode="single"
					onSelect={(value): void => {
						const date = value as Date | undefined // 型アサーション
						if (date) onChange(date.getTime())
					}}
					selected={new Date(value)}
				/>
			</PopoverContent>
		</Popover>
	)
}
