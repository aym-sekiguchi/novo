import { HexColorPicker, HexColorInput } from 'react-colorful'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Separator, Slider } from '@/components'

import type { PropertyStyleSchemaType } from './property-style-schema'
import type { UseFormReturn } from 'react-hook-form'

export function FormCaption(props: { disabled: boolean; form: UseFormReturn<PropertyStyleSchemaType> }): React.ReactNode {
	/* === props === */
	const { disabled, form } = props

	/* === return === */
	return (
		<>
			{/* 文字色 */}
			<FormField
				control={form.control}
				name="caption.color"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>文字色</FormLabel>
						<FormControl>
							<div className="w-fit p-3.5">
								<HexColorPicker className="!cursor-pointer" color={field.value} onChange={field.onChange} />
								<div className="relative w-50">
									<div className="border-line absolute inset-y-0 left-2 m-auto size-6 rounded-full border" style={{ backgroundColor: field.value }} />
									<HexColorInput
										alpha={false}
										className="border-line bg-field ring-offset-background mt-1 flex w-full rounded-lg border px-3 py-2 pl-10 text-base md:text-sm"
										color={field.value}
										disabled={disabled}
										onChange={field.onChange}
										prefixed
									/>
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<Separator />

			{/* 文字サイズ */}
			<FormField
				control={form.control}
				name="caption.fontSize"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>文字サイズ</FormLabel>
						<FormControl>
							<div>
								<div className="flex items-center gap-2">
									<Input
										{...field}
										className="w-20"
										disabled={disabled}
										onChange={(event) => field.onChange(Number(event.target.value))}
										type="number"
									/>
									<span>px</span>
									<Slider
										className="w-full max-w-2xl"
										defaultValue={[field.value]}
										max={32}
										min={10}
										onValueChange={(value) => field.onChange(value[0])}
										step={1}
									/>
								</div>
								<p style={{ fontSize: `${field.value}px` }}>これは文字サイズのサンプルです。</p>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
