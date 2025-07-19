'use client'
'use no memo'

import { HexColorPicker, HexColorInput } from 'react-colorful'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Separator,
	Slider,
	SwitchWithDescription,
} from '@/components'
import { cn } from '@/utilities'

import { Table } from '../preview/table'

import type { PropertyStyleSchemaType } from './property-style-schema'
import type { PropertyStyleData } from '@/types'
import type { UseFormReturn } from 'react-hook-form'

export function FormTable(props: { disabled: boolean; form: UseFormReturn<PropertyStyleSchemaType> }): React.ReactNode {
	/* === props === */
	const { disabled, form } = props

	/* === return === */
	return (
		<>
			{/* 文字色 */}
			<FormField
				control={form.control}
				name="table.color"
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
				name="table.fontSize"
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

			<Label>装飾</Label>

			{/* 囲い線 */}
			<FormField
				control={form.control}
				name="table.outline"
				render={({ field }) => (
					<FormItem className="w-full max-w-2xl">
						<FormControl>
							<SwitchWithDescription
								checked={field.value}
								description="表全体の囲いを表示します。"
								disabled={disabled}
								label="囲い線"
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* 区切り線 */}
			<FormField
				control={form.control}
				name="table.separator"
				render={({ field }) => (
					<FormItem className="w-full max-w-2xl">
						<FormControl>
							<SwitchWithDescription
								checked={field.value}
								description="セルの間に区切り線を表示します。"
								disabled={disabled}
								label="区切り線"
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* セルの塗りつぶし */}
			<FormField
				control={form.control}
				name="table.variant"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>セルの塗りつぶし</FormLabel>
						<FormDescription>
							塗りつぶすセルを選択してください。
							<br />
							<span className="text-xs">※例は囲い線と区切り線がONの場合です。</span>
						</FormDescription>
						<FormControl>
							<RadioGroup
								className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]"
								defaultValue={field.value}
								onValueChange={field.onChange}
							>
								{(
									[
										{ label: 'デフォルト', value: 'default' },
										{ label: '偶数行', value: 'even' },
										{ label: '奇数行', value: 'odd' },
										{ label: '項目列', value: 'label' },
										{ label: '値列', value: 'value' },
									] as { label: string; value: PropertyStyleData['table']['variant'] }[]
								).map((item) => (
									<div className="flex items-center space-x-2" key={`table-variant-${item.value}`}>
										<RadioGroupItem className="hidden" id={item.value} value={item.value} />
										<Label className="group flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg p-2" htmlFor={item.value}>
											<div
												className={cn(
													'w-full rounded-lg border-3 p-3 transition duration-300',
													field.value === item.value ? 'border-foreground' : 'border-line/50 group-hover:border-line',
												)}
											>
												<Table
													className="@container-normal [&>div]:md:grid-cols-[6em_1fr]"
													data={Array.from({ length: 4 }, () => ({ label: 'label', value: 'value' }))}
													tableStyle={{
														color: '#000000',
														fontSize: 16,
														outline: true,
														separator: true,
														variant: item.value,
													}}
												/>
											</div>
											<p className="mb-1 py-0.5">{item.label}</p>
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
