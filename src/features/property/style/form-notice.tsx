'use no memo'

import { HexColorPicker, HexColorInput } from 'react-colorful'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, RadioGroup, RadioGroupItem, Separator, Slider } from '@/components'
import { cn } from '@/utilities'

import { Notice } from '../preview/notice'

import type { PropertyStyleSchemaType } from './property-style-schema'
import type { PropertyStyleData } from '@/types'
import type { UseFormReturn } from 'react-hook-form'

export function FormNotice(props: { disabled: boolean; form: UseFormReturn<PropertyStyleSchemaType> }): React.ReactNode {
	/* === props === */
	const { disabled, form } = props

	/* === return === */
	return (
		<>
			{/* 文字色 */}
			<FormField
				control={form.control}
				name="notice.color"
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
				name="notice.fontSize"
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

			<Separator />

			{/* type */}
			<FormField
				control={form.control}
				name="notice.variant"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>装飾</FormLabel>
						<FormControl>
							<RadioGroup
								className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]"
								defaultValue={field.value}
								onValueChange={field.onChange}
							>
								{(
									[
										{ label: 'デフォルト', value: 'default' },
										{ label: '塗りつぶし', value: 'fill' },
										{ label: '横並び', value: 'flex' },
										{ label: '囲い', value: 'outline' },
										{ label: '区切り線', value: 'separator' },
									] as { label: string; value: PropertyStyleData['notice']['variant'] }[]
								).map((item) => (
									<div className="flex items-center space-x-2" key={`notice-variant-${item.value}`}>
										<RadioGroupItem id={item.value} value={item.value} />
										<Label
											className={cn('cursor-pointer rounded-lg border-2 p-2', field.value === item.value ? 'border-foreground' : 'border-line/50')}
											htmlFor={item.value}
										>
											<p className="mb-1 py-0.5">{item.label}</p>
											<Separator />
											<div className="pt-2">
												<Notice className="text-current" variant={item.value}>
													予告広告のダミーテキストです。予告広告の説明が入ります。ダミーテキストです。ダミーテキストです。ダミーテキストです。
												</Notice>
											</div>
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
