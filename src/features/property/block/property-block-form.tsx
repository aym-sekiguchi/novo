'use no memo'
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FileDown, FileSpreadsheet, ListPlus, PencilRuler, Undo2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Input,
	Button,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Textarea,
	FormDescription,
	Switch,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Sortable,
	Handler,
	Separator,
	Label,
} from '@/components'
import { useFormAction, useToggle } from '@/hooks'
import { cn } from '@/utilities'

import { savePropertyBlockAction } from './property-block-action'
import { propertyBlockSchema } from './property-block-schema'

import type { PropertyBlockSchemaType } from './property-block-schema'
import type { PropertyBlockData } from '@/types'

// Type
type PropertyBlockFormProps = {
	id: string
	initialValue: PropertyBlockData
}

/**
 * 物件概要新規作成・編集フォーム
 */

export function PropertyBlockForm(props: PropertyBlockFormProps): React.ReactNode {
	/* === props === */
	const { id, initialValue } = props

	const { contents, data, id: blockId, isPublic, order, type } = initialValue

	/* === hooks === */
	const [table, setTable] = useState<{ id: string; label: string; value?: string }[]>(
		data ? data.table.map((v, i) => ({ ...v, id: String(i) })) : [{ id: '0', label: '', value: '' }],
	)

	const router = useRouter()

	// 削除ボタン
	const [onDelete, onDeleteToggle] = useToggle(false)

	// CSVインポートダイアログ
	const [csvOpen, csvToggle] = useToggle(false)

	// CSVインポートテキストエリア
	const refCSV = useRef<HTMLTextAreaElement>(null)

	// CSVインポートプレースホルダー
	const csvPlaceholder = useRef<HTMLSpanElement>(null)

	const { formAction } = useFormAction<{ blockId: string; id: string; values: PropertyBlockSchemaType }>({
		onAction: savePropertyBlockAction,
		onSuccess: () => {
			if (!blockId) router.push(`./`)
			router.refresh()
		},
	})

	/* === events === */
	// CSV読み込み
	const handleClickImportCSV = (): void => {
		csvToggle()
		const csvArray = parseTextareaInput(refCSV.current?.value || '')
		setTable(csvArray.map((v, i) => ({ ...v, id: String(i) })))
		form.setValue('data.table', csvArray)
	}

	// テーブル行削除
	const handleDeleteRow = (value: { id: string; label: string; value?: string }): void => {
		setTable((prev) => prev.filter((v) => v.id !== value.id).map((v, i) => ({ ...v, id: String(i) })))
	}

	// フォームフック
	const form = useForm<PropertyBlockSchemaType>({
		defaultValues: {
			contents,
			data: data || { table: [{ label: '', value: '' }] },
			isPublic: isPublic || false,
			order,
			type: type || 'table',
		},
		resolver: zodResolver(propertyBlockSchema),
	})

	const { watch } = form

	const watchType = watch('type')

	const { isSubmitting } = form.formState

	// フォーム送信時の処理
	async function onSubmit(values: PropertyBlockSchemaType): Promise<void> {
		await formAction({ blockId, id, values })
	}

	// ページ離脱時確認
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
			event.preventDefault()
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return (): void => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	useEffect(() => {
		form.setValue('data.table', table)
	}, [table]) // eslint-disable-line react-hooks/exhaustive-deps

	/* === return === */
	return (
		<>
			<Form {...form}>
				<form className="flex w-full flex-col gap-4" id="property-block-form" onSubmit={form.handleSubmit(onSubmit)}>
					{/* 公開 */}
					<FormField
						control={form.control}
						name="isPublic"
						render={({ field }) => (
							<FormItem className="flex w-full items-center gap-3">
								<FormLabel>公開</FormLabel>
								<FormControl>
									<Switch checked={field.value} disabled={isSubmitting} onCheckedChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Separator />

					{/* type */}
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>種類</FormLabel>
								<FormControl>
									<Select onValueChange={(v) => v && field.onChange(v)} value={field.value}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="選択してください" />
										</SelectTrigger>
										<SelectContent>
											{[
												{ en: 'caption', ja: '注釈' },
												{ en: 'notice', ja: '予告' },
												{ en: 'separator', ja: '区切り線' },
												{ en: 'table', ja: '表' },
												{ en: 'custom', ja: 'カスタム' },
											].map((value) => (
												<SelectItem key={value.en} value={value.en}>
													{value.ja}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 内容 */}
					{['caption', 'notice', 'custom'].includes(watchType) && (
						<>
							<Separator />
							<FormField
								control={form.control}
								name="contents"
								render={({ field }) => (
									<FormItem className="w-full max-w-2xl">
										<FormLabel>内容</FormLabel>
										<FormControl>
											<Textarea {...field} disabled={isSubmitting} placeholder="" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}

					{/* 表 */}
					{watchType === 'table' && (
						<>
							<Separator />
							<FormField
								control={form.control}
								name="data.subject"
								render={({ field }) => (
									<FormItem className="w-full max-w-2xl">
										<FormLabel>表</FormLabel>
										<FormDescription>表の名前</FormDescription>
										<FormControl>
											<Input {...field} disabled={isSubmitting} placeholder="" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="data.description"
								render={({ field }) => (
									<FormItem className="w-full max-w-2xl">
										<FormDescription>表の説明</FormDescription>
										<FormControl>
											<Textarea {...field} disabled={isSubmitting} placeholder="" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="data.table"
								render={({ field }) => {
									return (
										<FormItem className="w-full max-w-5xl">
											<FormDescription>表の内容</FormDescription>
											<FormControl>
												<div className="flex flex-col gap-1">
													<div className="flex justify-between">
														{/* TODO 特定の場合文字化けが発生してしまう件について注釈は必要か */}
														{/* case1 macでオンラインExcelを使用してCSVエクスポートしたファイルをvscodeやnumber、オンラインExcelで開くと文字化けしてしまう
																			おそらく保存するときに文字化けしてしまうためその後に文字コードを変更しても戻らない */}
														{/* case2 windowsでデスクトップExcelを使用してCSV形式で保存したファイルをmacで開くと文字化けしてしまう
																			この場合開いた後に文字コードを変更したら正常に反映される */}
														<Button className="flex h-auto w-fit items-center gap-2 py-1.5" onClick={csvToggle} type="button" variant="secondary">
															<FileSpreadsheet size={20} strokeWidth={1.5} />
															<p className="text-sm">CSVを読み込む</p>
														</Button>
														<div className="flex items-center justify-end gap-2">
															<Label>削除</Label>
															<Switch checked={onDelete} onCheckedChange={onDeleteToggle} />
														</div>
													</div>
													<div className="divide-line flex flex-col max-md:space-y-2">
														<Sortable data={table} onSorted={field.onChange}>
															{table.map((value, index) => (
																<div className="relative" id={value.id} key={value.id}>
																	<div className={cn('bg-background relative z-10 flex gap-1 pt-3 pb-2 transition-[margin]', onDelete && 'mr-12')}>
																		<div className="flex flex-1 items-start gap-x-2 max-md:flex-col">
																			<div className="relative w-full shrink-0 md:w-1/2 md:max-w-xs">
																				<div className="text-neutral-foreground absolute top-3 left-3 flex items-center text-sm md:top-2.25">
																					項目:
																				</div>
																				<Input
																					className="pl-12"
																					disabled={isSubmitting}
																					onChange={(e) => {
																						setTable((prev) =>
																							prev.map((v) => (v.id === value.id ? { id: v.id, label: e.target.value, value: v.value } : v)),
																						)
																						field.onChange(table.map((v) => ({ label: v.label, value: v.value })))
																					}}
																					placeholder="項目名"
																					value={value?.label}
																				/>
																			</div>
																			<div className="relative w-full">
																				<div className="text-neutral-foreground absolute top-3 left-3 flex items-center text-sm md:top-2.25">値:</div>
																				<Textarea
																					className="mb-1 field-sizing-content max-h-[5.625em] w-full pl-12 placeholder:max-md:leading-6"
																					disabled={isSubmitting}
																					onChange={(e) => {
																						setTable((prev) =>
																							prev.map((v) => (v.id === value.id ? { id: v.id, label: v.label, value: e.target.value } : v)),
																						)
																						field.onChange(table.map((v) => ({ label: v.label, value: v.value })))
																					}}
																					placeholder="内容"
																					rows={1}
																					value={value?.value}
																				/>
																			</div>
																		</div>
																		<div className="flex">
																			{/* 並び替え */}
																			<div className="flex items-center">
																				<Handler className="size-8 cursor-grab" id={String(index)} />
																			</div>
																		</div>
																	</div>
																	<Button
																		className="absolute inset-x-0 right-0 z-0 mx-3 h-auto w-12 rounded-none p-0 md:m-auto md:h-8 md:rounded-lg"
																		onClick={() => handleDeleteRow(value)}
																		style={{ writingMode: 'vertical-rl' }}
																		type="button"
																		variant="destructive"
																	>
																		<X className="text-white" strokeWidth={1.5} />
																	</Button>
																</div>
															))}
														</Sortable>
													</div>
													<Button
														className="flex h-auto w-fit items-center gap-2 py-1.5"
														onClick={() => setTable((prev) => [...prev, { id: String(prev.length), label: '', value: '' }])}
														type="button"
														variant="secondary"
													>
														<ListPlus size={20} strokeWidth={1.5} />
														<p className="text-sm">項目を追加</p>
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name="data.caption"
								render={({ field }) => (
									<FormItem className="w-full max-w-2xl">
										<FormDescription>表の注釈</FormDescription>
										<FormControl>
											<Textarea {...field} disabled={isSubmitting} placeholder="注釈" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
				</form>
			</Form>

			{/* ボタン */}
			<div className="bg-background sticky inset-x-0 bottom-0 z-20 pt-3">
				<Separator />
				<div className="flex w-full justify-center gap-8 pt-3">
					<Button asChild className="flex w-full max-w-64 items-center gap-2" disabled={isSubmitting} type="button" variant="outline">
						<a href="../">
							<Undo2 size="20" strokeWidth={1.5} />
							<span>戻る</span>
						</a>
					</Button>
					<Button className="flex w-full max-w-64 items-center gap-2" disabled={isSubmitting} form="property-block-form" type="submit">
						<PencilRuler size="20" strokeWidth={1.5} />
						<span>保存</span>
					</Button>
				</div>
			</div>

			{/* CSV ダイアログ */}
			<Dialog onOpenChange={csvToggle} open={csvOpen}>
				<DialogContent className="h-[90vh] max-w-3xl grid-rows-[auto_1fr_auto]">
					{/* ダイアログヘッダー */}
					<DialogHeader className="">
						<DialogTitle>CSV読み込み</DialogTitle>
						<DialogDescription>
							CSVデータをコピーしたものを貼り付けてください。
							<br />
							上書き保存されるため、すでに入力されていたデータは削除されます。
						</DialogDescription>
					</DialogHeader>

					{/* ダイアログコンテンツ */}
					<div className="relative overflow-hidden">
						<Textarea
							className="relative h-full w-full placeholder:whitespace-pre-wrap"
							onChange={(e) => {
								const placeholder = csvPlaceholder.current
								if (e.target.value.length > 0) {
									placeholder?.classList.add('opacity-0')
								} else {
									placeholder?.classList.remove('opacity-0')
								}
							}}
							ref={refCSV}
						/>
						<span
							className="text-neutral-foreground pointer-events-none absolute inset-x-4 inset-y-2 flex overflow-auto md:text-sm"
							ref={csvPlaceholder}
						>
							物件名,&quot;サンプルマンション
							<br />
							A棟&quot;
							<br />
							所在地,東京都新宿区〇〇1-2-3
							<br />
							交通,JR山手線「新宿」駅 徒歩5分
							<br />
							価格,&quot;5,800万円&quot;
							<br />
							管理費,&quot;12,800万円&quot;
							<br />
							修繕積立金,&quot;8,000円/月&quot;
							<br />
							間取り,2LDK
							<br />
							専有面積,60.5㎡
							<br />
							バルコニー面積,8.2㎡
							<br />
							築年数,築10年（2014年築）
							<br />
							建物構造,鉄筋コンクリート造（RC）
							<br />
							所在階/階数,5階/10階建
							<br />
							方位,南向き
							<br />
							総戸数,50戸
							<br />
							駐車場,&quot;空きあり（月額20,000円）&quot;
							<br />
							管理形態,全部委託（日勤管理）
							<br />
							設備,&quot;エレベーター, オートロック, 宅配ボックス&quot;
							<br />
							取引態様,仲介
							<br />
							現況,空室
							<br />
							引渡し,即時
							<br />
							備考,ペット飼育可（規約あり）
						</span>
					</div>

					{/* ダイアログフッター */}
					<DialogFooter className="w-full">
						<Button className="flex items-center gap-2" onClick={handleClickImportCSV} type="button">
							<FileDown strokeWidth={1.5} />
							<span>読み込む</span>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

function parseTextareaInput(input: string): { label: string; value: string }[] {
	let sanitizedInput = input.trim()

	// **1. `""` で囲まれたセル内の改行 (`\n`) をプレースホルダー (`␤`) に置き換える**
	sanitizedInput = sanitizedInput.replace(/"([^"]*)"/gs, (match, innerText) => {
		return `"${innerText.replace(/\r?\n/g, '␤')}"` // 改行を `␤` に変換
	})

	// **2. 改行 (`\n`) を利用して行ごとに分割**
	return sanitizedInput
		.split(/\r?\n/)
		.map((line) => {
			const match = line.match(/^"?(.*?)"?[,\t] ?"?(.*?)"?$/)
			if (!match) return null

			return {
				label: match[1].replace(/""/g, '"'), // `""` を `"` に戻す
				value: match[2].replace(/""/g, '"').replace(/␤/g, '\n'), // `␤` を元の改行に戻す
			}
		})
		.filter(Boolean) as { label: string; value: string }[]
}
