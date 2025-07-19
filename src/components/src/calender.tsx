'use client'

/**
 * https://ui.shadcn.com/docs/components/calendar
 *
 * react-day-picker が v9 にアップデートされたため、カスタムスタイルを再実装（下記のサイトを参照）
 * https://github.com/grzegorzpokorski/calendar-shadcnnui/blob/main/src/components/ui/calendar.tsx
 */
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react'
import { Suspense } from 'react'
import { DayPicker } from 'react-day-picker'
import { ja } from 'react-day-picker/locale'

import {
	Button,
	buttonVariants,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components'
import { cn } from '@/utilities'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Calendar component
 *
 * @param props.className - ルートのクラス名
 * @param props.classNames - 各子要素のクラス名
 * @param props.showOutsideDays - カレンダーの外側の日付を表示するかどうか
 * @param props.rest - その他のプロパティ
 *
 * @returns {React.ReactNode} Calendar component
 *
 */
export function Calendar(props: CalendarProps): React.ReactNode {
	const { className, classNames, showOutsideDays = true, ...rest } = props
	const japanMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)

	/* === return === */
	return (
		<Suspense>
			<DayPicker
				captionLayout="dropdown"
				className={cn('p-3', className)}
				classNames={{
					button_next: cn(buttonVariants({ size: 'icon', variant: 'outline' }), 'z-10 size-8'),
					button_previous: cn(buttonVariants({ size: 'icon', variant: 'outline' }), 'z-10 size-8'),
					caption_label: 'text-sm font-medium',
					day: cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'relative size-9 rounded-md'),
					day_button: 'size-9 cursor-pointer',
					dropdowns: 'flex flex-row-reverse justify-end gap-1',
					hidden: 'invisible',
					month: 'space-y-2',
					month_grid: 'w-full border-collapse',
					months: 'relative',
					nav: 'absolute top-0 right-0 flex gap-1',
					outside: 'text-neutral-foreground opacity-50',
					range_end: 'rounded-l-none',
					range_middle: 'aria-selected:bg-primary/10 aria-selected:text-foreground rounded-none',
					range_start: 'rounded-r-none',
					selected: '!bg-primary !text-primary-foreground transition',
					week: 'flex w-full space-x-0.5',
					weekday: 'text-neutral-foreground rounded-md w-9 font-normal text-sm py-2',
					weekdays: 'flex w-full space-x-0.5',
					weeks: 'w-full border-collapse space-y-0.5',
					...classNames,
				}}
				components={{
					Chevron: ({ ...props }) =>
						props.orientation === 'left' ? <ChevronLeftIcon {...props} className="size-4" /> : <ChevronRightIcon {...props} className="size-4" />,
					Dropdown({ ...props }) {
						const { disabled, onChange, options = [], value } = props
						const ym = props['aria-label']?.match('Year') ? 'year' : 'month'

						/* === functions === */
						const handleValueChange = (selectedValue: string): void => {
							// `onChange` が期待するイベントオブジェクトを手動で作成
							const syntheticEvent = {
								bubbles: true,
								cancelable: true,
								currentTarget: { value: selectedValue } as EventTarget & HTMLSelectElement,
								defaultPrevented: false,
								eventPhase: 2,
								isDefaultPrevented: (): boolean => false,
								isPropagationStopped: (): boolean => false,
								isTrusted: true,
								nativeEvent: new Event('change'),
								persist: (): void => {},
								preventDefault: (): void => {},
								stopPropagation: (): void => {},
								target: { value: selectedValue } as EventTarget & HTMLSelectElement,
								timeStamp: Date.now(),
								type: 'change',
							}
							if (onChange) onChange(syntheticEvent) // 作成したイベントを渡す
						}

						/* === return === */
						return (
							<DropdownMenu>
								<DropdownMenuTrigger asChild disabled={disabled}>
									<Button aria-label={props['aria-label']} size="sm" variant="outline">
										{ym === 'year' ? `${value}年` : japanMonths[value as number]}
										<ChevronDownIcon className="text-neutral-foreground -mr-1 ml-2 size-4" strokeWidth={1.5} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuRadioGroup className="grid grid-cols-3 gap-2 p-2" onValueChange={handleValueChange} value={String(value)}>
										{options.map((option, index) => (
											<DropdownMenuRadioItem isIndicator={false} key={index} value={`${option.value}`}>
												{ym === 'year' ? `${option.value}年` : japanMonths[option.value]}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						)
					},
				}}
				fixedWeeks
				locale={ja}
				showOutsideDays={showOutsideDays}
				{...rest}
			/>
		</Suspense>
	)
}
