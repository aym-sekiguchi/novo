import { HexAlphaColorPicker, HexColorInput } from 'react-colorful'

import { Popover, PopoverTrigger, PopoverContent } from '@/components'
import { cn } from '@/utilities'

//Type
type ColorPickerProps = { className?: string; disabled?: boolean; onChange: (color: string) => void; value: string }

/**
 * ColorPicker
 *
 *
 */
export function ColorPicker(props: ColorPickerProps): React.ReactNode {
	const { className, disabled, onChange, value } = props
	return (
		<div className={cn('relative', className)}>
			{/* picker */}
			<div className="absolute inset-y-0 left-0 flex size-10 items-center justify-center">
				<Popover>
					<PopoverTrigger disabled={disabled}>
						<div className="border-line size-6 cursor-pointer rounded-full border" style={{ backgroundColor: value }} />
					</PopoverTrigger>
					<PopoverContent align="start" className="bg-unset w-fit rounded-xl border-0 p-4 shadow-none">
						<HexAlphaColorPicker className="!cursor-pointer" color={value} onChange={onChange} />
					</PopoverContent>
				</Popover>
			</div>

			{/* TODO onChange動作確認 */}
			{/* input */}
			<div className="w-50">
				<HexColorInput
					alpha={false}
					className="border-line bg-field ring-offset-background flex h-10 w-full rounded-lg border px-3 py-2 pl-10 text-base md:text-sm"
					color={value}
					disabled={disabled}
					onChange={onChange}
					prefixed
				/>
			</div>
			{/* <Input
				{...rest}
				aria-disabled={disabled}
				autoComplete="off"
				className="pl-10"
				disabled={disabled}
				onChange={(event) => {
					const target = event.target as HTMLInputElement
					const nextValue = target.value
					console.log('nextValue', nextValue)
					onChange(nextValue)
				}}
				value={value}
			/> */}
		</div>
	)
}
